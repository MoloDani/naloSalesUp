import React, { useEffect, useLayoutEffect, useRef, useState } from "react";

type Source = { src: string; type: string };

type Props = {
  leftSources: Source[];
  rightSources: Source[];
  posterLeft?: string;
  posterRight?: string;
  initialPercent?: number;        // 0..100
  widthClass?: string;            // e.g. w-full
  maxWidthClass?: string;         // e.g. max-w-[1000px]
  pairLabels?: (string | React.ReactNode)[];
  maxHeightClass?: string;
};

const clamp = (v: number, min = 0, max = 100) => Math.max(min, Math.min(max, v));

const VideoCompareSection: React.FC<Props> = ({
  leftSources,
  rightSources,
  posterLeft,
  posterRight,
  initialPercent = 50,
  widthClass = "w-full",
  maxWidthClass = "max-w-[1000px]",
  pairLabels,
  maxHeightClass = "max-h-[80vh]",
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const leftRef = useRef<HTMLVideoElement>(null);
  const rightRef = useRef<HTMLVideoElement>(null);

  const [pairIndex, setPairIndex] = useState(0);
  const [percent, setPercent] = useState(clamp(initialPercent));
  const percentRef = useRef(percent);
  const [mediaBox, setMediaBox] = useState<{ left: number; top: number; width: number; height: number } | null>(null);

  const PAIRS = Math.min(leftSources.length, rightSources.length);
  const leftCurrent = leftSources[pairIndex];
  const rightCurrent = rightSources[pairIndex];

  const labelContent = pairLabels?.[pairIndex] ?? `${pairIndex + 1} / ${PAIRS}`;
  const labelEl =
    typeof labelContent === "string"
      ? <div className="text-sm text-white text-center" dangerouslySetInnerHTML={{ __html: labelContent }} />
      : <div className="text-sm text-white text-center">{labelContent}</div>;

  // play both + simple drift correction
  useEffect(() => {
    const lv = leftRef.current, rv = rightRef.current;
    if (!lv || !rv) return;
    let timer: number | null = null;

    const ready = (v: HTMLVideoElement) =>
      new Promise<void>((res) => (v.readyState >= 3 ? res() : v.addEventListener("canplay", () => res(), { once: true })));

    (async () => {
      lv.load(); rv.load();
      await Promise.all([ready(lv), ready(rv)]);
      lv.currentTime = 0; rv.currentTime = 0;
      await Promise.allSettled([lv.play(), rv.play()]);
      timer = window.setInterval(() => {
        if (lv.paused || rv.paused) return;
        const drift = rv.currentTime - lv.currentTime;
        if (Math.abs(drift) > 0.05) rv.currentTime = lv.currentTime;
      }, 200);
    })();

    return () => { if (timer) clearInterval(timer); };
  }, [pairIndex, leftCurrent.src, rightCurrent.src]);

  // 🔁 COVER-aware compute (removes black bars by cropping to fill)
  const computeMediaBox = () => {
    const root = containerRef.current;
    if (!root) return;

    const rect = root.getBoundingClientRect();
    const containerAR = rect.width / rect.height;

    const vw = leftRef.current?.videoWidth || rightRef.current?.videoWidth || 16;
    const vh = leftRef.current?.videoHeight || rightRef.current?.videoHeight || 9;
    const videoAR = vw / vh;

    // For object-cover:
    // - if videoAR > containerAR → scale by height (crop left/right)
    // - if videoAR < containerAR → scale by width  (crop top/bottom)
    let width = rect.width, height = rect.height, left = 0, top = 0;

    if (videoAR > containerAR) {
      height = rect.height;
      width = height * videoAR;
      left = (rect.width - width) / 2; // negative or 0
      top = 0;
    } else {
      width = rect.width;
      height = width / videoAR;
      top = (rect.height - height) / 2; // negative or 0
      left = 0;
    }

    setMediaBox({ left, top, width, height });
  };

  useLayoutEffect(() => { computeMediaBox(); }, []);
  useEffect(() => {
    const onMeta = () => computeMediaBox();
    leftRef.current?.addEventListener("loadedmetadata", onMeta);
    rightRef.current?.addEventListener("loadedmetadata", onMeta);
    return () => {
      leftRef.current?.removeEventListener("loadedmetadata", onMeta);
      rightRef.current?.removeEventListener("loadedmetadata", onMeta);
    };
  }, [pairIndex]);

  useEffect(() => {
    const onResize = () => computeMediaBox();
    window.addEventListener("resize", onResize);
    const ro = new ResizeObserver(onResize);
    if (containerRef.current) ro.observe(containerRef.current);
    return () => { window.removeEventListener("resize", onResize); ro.disconnect(); };
  }, []);

  const tweenRef = useRef<number | null>(null);
  const animateTo = (to: number, dur = 220) => {
    if (tweenRef.current) cancelAnimationFrame(tweenRef.current);
    const start = performance.now();
    const from = percentRef.current;
    const target = clamp(to);
    const ease = (t: number) => 1 - Math.pow(1 - t, 3);
    const step = (now: number) => {
      const t = Math.min(1, (now - start) / dur);
      const p = from + (target - from) * ease(t);
      percentRef.current = p; setPercent(p);
      if (t < 1) tweenRef.current = requestAnimationFrame(step);
    };
    tweenRef.current = requestAnimationFrame(step);
  };

  const pointerToPercent = (clientX: number) => {
    if (!containerRef.current || !mediaBox) return percentRef.current;
    const rect = containerRef.current.getBoundingClientRect();
    const left = rect.left + mediaBox.left;
    const xWithin = Math.max(0, Math.min(mediaBox.width, clientX - left));
    return (xWithin / mediaBox.width) * 100;
  };

  const onPointerMove = (e: React.PointerEvent) => {
    if (!mediaBox) return;
    const p = pointerToPercent(e.clientX);
    percentRef.current = p; setPercent(p);
  };
  const onPointerLeave = () => animateTo(50, 220);

  const rightClip = (): React.CSSProperties => {
    if (!mediaBox || !containerRef.current) return {};
    const rect = containerRef.current.getBoundingClientRect();
    const cutX = mediaBox.left + (mediaBox.width * percent) / 100;
    return {
      clipPath: `inset(${mediaBox.top}px ${rect.width - (mediaBox.left + mediaBox.width)}px ${rect.height - (mediaBox.top + mediaBox.height)}px ${cutX}px)`
    };
  };
  const dividerStyle = (): React.CSSProperties => {
    if (!mediaBox) return { top: 0, height: "100%", transform: "translateX(-1px)" };
    const cutX = mediaBox.left + (mediaBox.width * percent) / 100;
    return { top: `${mediaBox.top}px`, height: `${mediaBox.height}px`, transform: `translateX(${cutX - 1}px)` };
  };

  return (
    <section className="w-full flex flex-col items-center gap-3">
      {/* ✅ Responsive padding wrapper (great for mobile) */}
      <div className="w-full px-4 sm:px-6 lg:px-8">
        {/* Aspect container */}
        <div
          ref={containerRef}
          className={`relative mx-auto ${widthClass} ${maxWidthClass} ${maxHeightClass || ""} 
                      select-none aspect-[4/3] lg:aspect-video rounded-xl overflow-hidden`}
        >
          {/* LEFT (base) */}
          <video
            key={leftCurrent.src}
            ref={leftRef}
            className="absolute inset-0 w-full h-full object-cover"
            autoPlay muted playsInline preload="auto" loop
            poster={posterLeft}
          >
            <source src={leftCurrent.src} type={leftCurrent.type} />
          </video>

          {/* RIGHT (revealed) */}
          <div className="absolute inset-0 pointer-events-none" style={rightClip()} aria-hidden="true">
            <video
              key={rightCurrent.src}
              ref={rightRef}
              className="absolute inset-0 w-full h-full object-cover"
              autoPlay muted playsInline preload="auto" loop
              poster={posterRight}
            >
              <source src={rightCurrent.src} type={rightCurrent.type} />
            </video>
          </div>

          {/* Divider — BLACK */}
          <div className="absolute z-10 left-0" style={dividerStyle()} aria-hidden="true">
            <div className="absolute top-0 h-full w-[2px] bg-black" />
          </div>

          {/* Hover layer */}
          {mediaBox && (
            <div
              className="absolute z-20"
              style={{ left: mediaBox.left, top: mediaBox.top, width: mediaBox.width, height: mediaBox.height, cursor: "ew-resize" }}
              onPointerMove={onPointerMove}
              onPointerLeave={onPointerLeave}
              onPointerDown={onPointerMove}
            />
          )}

          {/* Labels */}
          <span className="absolute left-2 top-2 lg:px-3 px-2 lg:py-3 z-30 text-white text-lg md:text-4xl font-[firstFont] drop-shadow-[0_0_6px_rgba(0,0,0,0.9)]">
            Before
          </span>
          <span className="absolute right-2 top-2 lg:px-3 px-2 lg:py-3 z-30 text-white text-lgre md:text-4xl font-[firstFont] drop-shadow-[0_0_6px_rgba(0,0,0,0.9)]">
            After
          </span>
        </div>
      </div>

      {/* Controls + HTML text under slider */}
      <div className="flex flex-col items-center gap-3 mt-3">
        <div className="flex items-center gap-4">
          <button
            type="button"
            aria-label="Previous"
            onClick={() => setPairIndex((i) => (i - 1 + PAIRS) % PAIRS)}
            className="p-2 rounded-lg bg-black/70 hover:bg-black/80 text-white"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M12.78 4.22a.75.75 0 0 1 0 1.06L8.06 10l4.72 4.72a.75.75 0 1 1-1.06 1.06l-5.25-5.25a.75.75 0 0 1 0-1.06l5.25-5.25a.75.75 0 0 1 1.06 0z" clipRule="evenodd"/>
            </svg>
          </button>

          <span className="text-sm text-white">{`${pairIndex + 1} / ${PAIRS}`}</span>

          <button
            type="button"
            aria-label="Next"
            onClick={() => setPairIndex((i) => (i + 1) % PAIRS)}
            className="p-2 rounded-lg bg-black/70 hover:bg-black/80 text-white"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M7.22 15.78a.75.75 0 0 1 0-1.06L11.94 10 7.22 5.28a.75.75 0 1 1 1.06-1.06l5.25 5.25c.3.3.3.78 0 1.06l-5.25 5.25a.75.75 0 0 1-1.06 0z" clipRule="evenodd"/>
            </svg>
          </button>
        </div>

        <div className="text-center text-white mt-3">
          {typeof pairLabels?.[pairIndex] === "string"
            ? <div dangerouslySetInnerHTML={{ __html: pairLabels![pairIndex] as string }} />
            : (pairLabels?.[pairIndex] ?? null)}
        </div>
      </div>
    </section>
  );
};

export default VideoCompareSection;
