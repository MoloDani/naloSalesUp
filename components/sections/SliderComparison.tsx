import React, {
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
} from "react";

type Source = { src: string; type: string };

type Props = {
  leftSources?: Source[];
  rightSources?: Source[];
  posterLeft?: string;
  posterRight?: string;
  initialPercent?: number;
  widthClass?: string;
  maxWidthClass?: string;
  pairLabels?: (string | React.ReactNode)[];
  maxHeightClass?: string;
  youtubeFirstId?: string; // ⬅️ YouTube slide at index 0
};

const clamp = (v: number, min = 0, max = 100) =>
  Math.max(min, Math.min(max, v));

const VideoCompareSection: React.FC<Props> = ({
  leftSources = [],
  rightSources = [],
  posterLeft,
  posterRight,
  initialPercent = 50,
  widthClass = "w-full",
  maxWidthClass = "max-w-[1000px]",
  pairLabels,
  maxHeightClass = "max-h-[80vh]",
  youtubeFirstId,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const leftRef = useRef<HTMLVideoElement>(null);
  const rightRef = useRef<HTMLVideoElement>(null);

  const [pairIndex, setPairIndex] = useState(0);
  const [percent, setPercent] = useState(clamp(initialPercent));
  const percentRef = useRef(percent);
  const [mediaBox, setMediaBox] = useState<{
    left: number;
    top: number;
    width: number;
    height: number;
  } | null>(null);

  // NEW: fade state for videos
  const [isMediaVisible, setIsMediaVisible] = useState(true);
  const fadeTimeoutRef = useRef<number | null>(null);
  const FADE_DURATION = 300; // ms, should roughly match Tailwind duration-300

  // ---- SLIDE COUNT / MAPPING ----
  const hasYoutubeFirst = !!youtubeFirstId;
  const pairsCount = Math.min(leftSources.length, rightSources.length);
  const TOTAL_SLIDES = pairsCount + (hasYoutubeFirst ? 1 : 0);

  // ensure index stays in range if sources change
  useEffect(() => {
    setPairIndex((i) =>
      TOTAL_SLIDES === 0 ? 0 : ((i % TOTAL_SLIDES) + TOTAL_SLIDES) % TOTAL_SLIDES
    );
  }, [TOTAL_SLIDES]);

  const isYoutubeSlide = hasYoutubeFirst && pairIndex === 0;
  const compareIndex = hasYoutubeFirst ? pairIndex - 1 : pairIndex; // index into left/right arrays

  const leftCurrent = !isYoutubeSlide ? leftSources[compareIndex] : undefined;
  const rightCurrent = !isYoutubeSlide ? rightSources[compareIndex] : undefined;

  // ---- LABELS (NO LABEL ON YOUTUBE SLIDE) ----
  const compareLabelIndex = hasYoutubeFirst ? pairIndex - 1 : pairIndex;

  const rawLabel =
    !isYoutubeSlide && compareLabelIndex >= 0
      ? pairLabels?.[compareLabelIndex]
      : undefined;

  const labelContent =
    rawLabel ??
    (!isYoutubeSlide
      ? `Slide ${compareLabelIndex + 1} / ${pairsCount || 1}`
      : null);

  const labelEl =
    labelContent == null
      ? null
      : typeof labelContent === "string"
      ? (
          <div
            className="text-white text-center"
            dangerouslySetInnerHTML={{ __html: labelContent }}
          />
        )
      : (
          <div className="text-white text-center">{labelContent}</div>
        );

  // helper to change slide with fade out + in
  const changePair = (getNextIndex: (current: number) => number) => {
    if (fadeTimeoutRef.current) {
      window.clearTimeout(fadeTimeoutRef.current);
    }

    setIsMediaVisible(false); // fade out current

    fadeTimeoutRef.current = window.setTimeout(() => {
      setPairIndex((current) =>
        TOTAL_SLIDES === 0
          ? 0
          : ((getNextIndex(current) % TOTAL_SLIDES) + TOTAL_SLIDES) %
            TOTAL_SLIDES
      ); // change slide
      setIsMediaVisible(true); // fade in new
    }, FADE_DURATION);
  };

  const goPrev = () =>
    changePair((i) => (i - 1 + TOTAL_SLIDES) % TOTAL_SLIDES);
  const goNext = () =>
    changePair((i) => (i + 1) % TOTAL_SLIDES);

  useEffect(() => {
    return () => {
      if (fadeTimeoutRef.current) {
        window.clearTimeout(fadeTimeoutRef.current);
      }
    };
  }, []);

  // play both + drift correction (ONLY for compare slides)
  useEffect(() => {
    if (isYoutubeSlide) return; // nothing to sync on YT slide
    const lv = leftRef.current,
      rv = rightRef.current;
    if (!lv || !rv || !leftCurrent || !rightCurrent) return;

    let timer: number | null = null;

    const ready = (v: HTMLVideoElement) =>
      new Promise<void>((res) =>
        v.readyState >= 3
          ? res()
          : v.addEventListener("canplay", () => res(), {
              once: true,
            })
      );

    (async () => {
      lv.load();
      rv.load();
      await Promise.all([ready(lv), ready(rv)]);
      lv.currentTime = 0;
      rv.currentTime = 0;
      await Promise.allSettled([lv.play(), rv.play()]);
      timer = window.setInterval(() => {
        if (lv.paused || rv.paused) return;
        const drift = rv.currentTime - lv.currentTime;
        if (Math.abs(drift) > 0.05) rv.currentTime = lv.currentTime;
      }, 200);
    })();

    return () => {
      if (timer) clearInterval(timer);
    };
  }, [pairIndex, leftCurrent?.src, rightCurrent?.src, isYoutubeSlide]);

  // compute "object-cover" cropping box
  const computeMediaBox = () => {
    const root = containerRef.current;
    if (!root) return;

    const rect = root.getBoundingClientRect();
    const containerAR = rect.width / rect.height;

    const vw =
      leftRef.current?.videoWidth ||
      rightRef.current?.videoWidth ||
      16;
    const vh =
      leftRef.current?.videoHeight ||
      rightRef.current?.videoHeight ||
      9;
    const videoAR = vw / vh;

    let width = rect.width,
      height = rect.height,
      left = 0,
      top = 0;

    if (videoAR > containerAR) {
      height = rect.height;
      width = height * videoAR;
      left = (rect.width - width) / 2;
    } else {
      width = rect.width;
      height = width / videoAR;
      top = (rect.height - height) / 2;
    }

    setMediaBox({ left, top, width, height });
  };

  useLayoutEffect(() => {
    computeMediaBox();
  }, []);

  useEffect(() => {
    const onMeta = () => computeMediaBox();
    leftRef.current?.addEventListener("loadedmetadata", onMeta);
    rightRef.current?.addEventListener("loadedmetadata", onMeta);
    return () => {
      leftRef.current?.removeEventListener("loadedmetadata", onMeta);
      rightRef.current?.removeEventListener("loadedmetadata", onMeta);
    };
  }, [compareIndex]);

  useEffect(() => {
    const onResize = () => computeMediaBox();
    window.addEventListener("resize", onResize);
    const ro = new ResizeObserver(onResize);
    if (containerRef.current) ro.observe(containerRef.current);
    return () => {
      window.removeEventListener("resize", onResize);
      ro.disconnect();
    };
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
      percentRef.current = p;
      setPercent(p);
      if (t < 1) tweenRef.current = requestAnimationFrame(step);
    };
    tweenRef.current = requestAnimationFrame(step);
  };

  useEffect(() => {
    animateTo(50, 0);
  }, [pairIndex]);

  const pointerToPercent = (clientX: number) => {
    if (!containerRef.current || !mediaBox)
      return percentRef.current;
    const rect = containerRef.current.getBoundingClientRect();
    const left = rect.left + mediaBox.left;
    const xWithin = Math.max(
      0,
      Math.min(mediaBox.width, clientX - left)
    );
    return (xWithin / mediaBox.width) * 100;
  };

  const onPointerMove = (e: React.PointerEvent) => {
    if (!mediaBox || isYoutubeSlide) return;
    const p = pointerToPercent(e.clientX);
    percentRef.current = p;
    setPercent(p);
  };

  const onPointerLeave = () => {
    if (!isYoutubeSlide) animateTo(50, 220);
  };

  const rightClip = (): React.CSSProperties => {
    if (!mediaBox || !containerRef.current || isYoutubeSlide) return {};
    const rect = containerRef.current.getBoundingClientRect();
    const cutX =
      mediaBox.left + (mediaBox.width * percent) / 100;
    return {
      clipPath: `inset(${mediaBox.top}px ${
        rect.width - (mediaBox.left + mediaBox.width)
      }px ${
        rect.height - (mediaBox.top + mediaBox.height)
      }px ${cutX}px)`,
    };
  };

  const dividerStyle = (): React.CSSProperties => {
    if (!mediaBox || isYoutubeSlide)
      return {
        top: 0,
        height: "100%",
        transform: "translateX(-1px)",
      };
    const cutX =
      mediaBox.left + (mediaBox.width * percent) / 100;
    return {
      top: `${mediaBox.top}px`,
      height: `${mediaBox.height}px`,
      transform: `translateX(${cutX - 1}px)`,
    };
  };

  return (
    <section className="w-full flex flex-col items-center gap-6">
      {/* ARROWS + VIDEO ROW */}
      <div className="w-full px-4 sm:px-6 lg:px-8 flex items-center justify-center gap-4">
        {/* Left arrow (desktop only, side of video) */}
        {TOTAL_SLIDES > 1 && (
          <button
            type="button"
            aria-label="Previous"
            onClick={goPrev}
            className="hidden md:flex items-center justify-center p-3 text-white"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="w-8 h-8" fill="currentColor" viewBox="0 0 20 20">
              <path d="M12.78 4.22a.75.75 0 0 1 0 1.06L8.06 10l4.72 4.72a.75.75 0 1 1-1.06 1.06l-5.25-5.25a.75.75 0 0 1 0-1.06l5.25-5.25a.75.75 0 0 1 1.06 0z"/>
            </svg>
          </button>
        )}

        {/* VIDEO / YOUTUBE */}
        <div
          ref={containerRef}
          className={`relative mx-auto ${widthClass} ${maxWidthClass} ${
            maxHeightClass || ""
          } aspect-[4/3] lg:aspect-video rounded-xl overflow-hidden transition-opacity duration-300 ${
            isMediaVisible ? "opacity-100" : "opacity-0"
          }`}
        >
          {isYoutubeSlide && youtubeFirstId ? (
            // --- YOUTUBE ONLY SLIDE ---
            <iframe
              className="absolute inset-0 w-full h-full"
              src={`https://www.youtube.com/embed/${youtubeFirstId}?autoplay=1&mute=1&loop=1&controls=1&rel=0&modestbranding=1&playsinline=1&playlist=${youtubeFirstId}`}
              title="Overview video"
              allow="autoplay; encrypted-media; picture-in-picture"
              allowFullScreen
            />
          ) : (
            // --- ORIGINAL BEFORE / AFTER COMPARE ---
            <>
              {/* videos */}
              {leftCurrent && (
                <video
                  key={leftCurrent.src}
                  ref={leftRef}
                  className="absolute inset-0 w-full h-full object-cover"
                  autoPlay
                  muted
                  playsInline
                  preload="auto"
                  loop
                  poster={posterLeft}
                >
                  <source src={leftCurrent.src} type={leftCurrent.type} />
                </video>
              )}

              <div
                className="absolute inset-0 pointer-events-none"
                style={rightClip()}
              >
                {rightCurrent && (
                  <video
                    key={rightCurrent.src}
                    ref={rightRef}
                    className="absolute inset-0 w-full h-full object-cover"
                    autoPlay
                    muted
                    playsInline
                    preload="auto"
                    loop
                    poster={posterRight}
                  >
                    <source
                      src={rightCurrent.src}
                      type={rightCurrent.type}
                    />
                  </video>
                )}
              </div>

              {/* divider */}
              <div className="absolute z-10 left-0" style={dividerStyle()}>
                <div className="absolute top-0 h-full w-[2px] bg-black" />
              </div>

              {/* drag area */}
              {mediaBox && (
                <div
                  className="absolute z-20"
                  style={{
                    left: mediaBox.left,
                    top: mediaBox.top,
                    width: mediaBox.width,
                    height: mediaBox.height,
                    cursor: "ew-resize",
                  }}
                  onPointerMove={onPointerMove}
                  onPointerLeave={onPointerLeave}
                  onPointerDown={onPointerMove}
                />
              )}

              {/* Before/After labels */}
              <span className="absolute left-4 top-3 z-30 text-white text-lg md:text-4xl font-[firstFont] drop-shadow-lg">
                Before
              </span>
              <span className="absolute right-4 top-3 z-30 text-white text-lg md:text-4xl font-[firstFont] drop-shadow-lg">
                After
              </span>
            </>
          )}

          {/* DOTS OVER VIDEO — NO BG */}
          {TOTAL_SLIDES > 1 && (
            <div className="absolute inset-x-0 bottom-4 z-30 flex justify-center">
              <div className="flex items-center gap-2 px-3 py-1">
                {Array.from({ length: TOTAL_SLIDES }).map((_, i) => (
                  <button
                    key={i}
                    type="button"
                    onClick={() => changePair(() => i)}
                    className={`w-3 h-3 rounded-full transition-all ${
                      i === pairIndex
                        ? "bg-white scale-110"
                        : "bg-white/40 hover:bg-white/70"
                    }`}
                  />
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Right arrow (desktop only, side of video) */}
        {TOTAL_SLIDES > 1 && (
          <button
            type="button"
            aria-label="Next"
            onClick={goNext}
            className="hidden md:flex items-center justify-center p-3 text-white"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="w-8 h-8" fill="currentColor" viewBox="0 0 20 20">
              <path d="M7.22 15.78a.75.75 0 0 1 0-1.06L11.94 10 7.22 5.28a.75.75 0 1 1 1.06-1.06l5.25 5.25c.3.3.3.78 0 1.06l-5.25 5.25a.75.75 0 0 1-1.06 0z"/>
            </svg>
          </button>
        )}
      </div>

      {/* Mobile arrows BELOW video */}
      {TOTAL_SLIDES > 1 && (
        <div className="flex md:hidden items-center justify-center gap-6">
          <button
            type="button"
            aria-label="Previous"
            onClick={goPrev}
            className="flex items-center justify-center p-3 text-white"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="w-8 h-8" fill="currentColor" viewBox="0 0 20 20">
              <path d="M12.78 4.22a.75.75 0 0 1 0 1.06L8.06 10l4.72 4.72a.75.75 0 1 1-1.06 1.06l-5.25-5.25a.75.75 0 0 1 0-1.06l5.25-5.25a.75.75 0 0 1 1.06 0z"/>
            </svg>
          </button>
          <button
            type="button"
            aria-label="Next"
            onClick={goNext}
            className="flex items-center justify-center p-3 text-white"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="w-8 h-8" fill="currentColor" viewBox="0 0 20 20">
              <path d="M7.22 15.78a.75.75 0 0 1 0-1.06L11.94 10 7.22 5.28a.75.75 0 1 1 1.06-1.06l5.25 5.25c.3.3.3.78 0 1.06l-5.25 5.25a.75.75 0 0 1-1.06 0z"/>
            </svg>
          </button>
        </div>
      )}

      {/* slide text (HIDDEN ON YOUTUBE SLIDE) */}
      {labelEl && (
        <div
          className={`max-w-[800px] px-4 text-center transition-opacity duration-300 opacity-100`}
        >
          {labelEl}
        </div>
      )}
    </section>
  );
};

export default VideoCompareSection;
