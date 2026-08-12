// pages/verify.tsx — lands here from the confirmation email
// Posts the token on mount: mail scanners follow GET links and would burn
// single-use tokens before the customer ever clicked.
import Head from "next/head";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { verifyConfirm, verifyRequest } from "@/lib/api";
import { Mail, CheckCircle2, AlertTriangle, Loader2 } from "lucide-react";

type Phase = "checking" | "done" | "failed" | "resent";

export default function Verify() {
  const router = useRouter();
  const [phase, setPhase] = useState<Phase>("checking");
  const [email, setEmail] = useState("");
  const [resendEmail, setResendEmail] = useState("");
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");
  const [notice, setNotice] = useState("");

  useEffect(() => {
    if (!router.isReady) return;
    const t = String(router.query.token || "");
    if (!t) {
      setPhase("failed");
      setError("This link is missing its code. Request a new one below.");
      return;
    }
    (async () => {
      try {
        const { status, data } = await verifyConfirm(t);
        if (status === 200 && data.ok) {
          setEmail(data.email || "");
          setPhase("done");
        } else {
          setPhase("failed");
          setError(data.error || "This link is no longer valid.");
        }
      } catch {
        setPhase("failed");
        setError("Cannot reach the Nalo servers. Try again shortly.");
      }
    })();
  }, [router.isReady]); // eslint-disable-line react-hooks/exhaustive-deps

  async function handleResend(e: React.FormEvent) {
    e.preventDefault();
    if (busy) return;
    setError("");
    if (!resendEmail) return setError("Enter your email.");
    setBusy(true);
    try {
      const { data } = await verifyRequest(resendEmail.trim());
      setPhase("resent");
      setNotice(data.message || "If that address needs confirming, the link is on its way.");
    } catch {
      setError("Cannot reach the Nalo servers. Try again shortly.");
    } finally {
      setBusy(false);
    }
  }

  const inputClass =
    "w-full rounded-2xl bg-white/10 border border-white/20 px-5 py-4 pr-12 text-white placeholder-white/40 outline-none focus:border-[#37f349]/60 focus:bg-white/15 transition-all";
  const buttonClass =
    "mt-2 rounded-2xl bg-gradient-to-r from-[#2ed14c] to-[#37f349] py-4 text-base font-bold text-black transition-all hover:opacity-90 hover:shadow-lg hover:shadow-[#37f349]/25 disabled:opacity-60";

  return (
    <>
      <Head>
        <title>Confirm your email — Nalo Packs</title>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta name="robots" content="noindex" />
        <meta property="og:title" content="Nalo Packs" />
      </Head>

      <section className="min-h-[85vh] flex items-center justify-center px-4 py-16">
        {/* Glassmorphism card */}
        <div className="w-full max-w-[360px] rounded-3xl bg-white/10 backdrop-blur-xl border border-white/20 p-6 md:p-8 shadow-2xl">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-white mb-2">
              {phase === "done" ? "Email confirmed" : "Confirm your email"}
            </h1>
            <p className="text-white/60 text-sm">
              {phase === "checking" && "Checking your link..."}
              {phase === "done" && (
                <>
                  <span className="text-white font-semibold break-all">{email}</span> is
                  confirmed. You're all set.
                </>
              )}
              {phase === "failed" && "Enter your email and we'll send a fresh link."}
              {phase === "resent" && "Check your inbox — and your spam folder."}
            </p>
          </div>

          {notice && (
            <p className="mb-6 text-center text-sm text-[#37f349] bg-[#37f349]/10 rounded-xl py-3 px-4">
              {notice}
            </p>
          )}

          {phase === "checking" && (
            <div className="flex justify-center py-8">
              <Loader2 className="w-7 h-7 text-white/40 animate-spin" />
            </div>
          )}

          {phase === "done" && (
            <div className="flex flex-col items-center gap-5 py-2">
              <CheckCircle2 className="w-12 h-12 text-[#37f349]" />
              <button
                type="button"
                onClick={() => router.push("/account")}
                className={buttonClass + " w-full"}
              >
                Go to my account
              </button>
            </div>
          )}

          {phase === "failed" && (
            <form onSubmit={handleResend} className="flex flex-col gap-5">
              <div className="flex items-start gap-3 rounded-xl bg-amber-500/10 py-3 px-4">
                <AlertTriangle className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
                <p className="text-sm text-amber-200/90">{error}</p>
              </div>

              <div className="relative">
                <input
                  type="email"
                  value={resendEmail}
                  onChange={(e) => setResendEmail(e.target.value)}
                  placeholder="Email"
                  autoComplete="email"
                  className={inputClass}
                />
                <Mail className="absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 text-white/40" />
              </div>

              <button type="submit" disabled={busy} className={buttonClass}>
                {busy ? "Sending..." : "Send a new link"}
              </button>
            </form>
          )}

          {phase === "resent" && (
            <p className="text-center text-sm text-white/50">The link works for 7 days.</p>
          )}

          {phase !== "done" && (
            <p className="text-center text-sm text-white/50 mt-6">
              <button
                type="button"
                onClick={() => router.push("/login")}
                className="text-white font-semibold hover:text-[#37f349] transition-colors"
              >
                Back to login
              </button>
            </p>
          )}
        </div>
      </section>
    </>
  );
}