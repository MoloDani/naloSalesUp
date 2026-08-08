// pages/claim.tsx — set a password on a purchase made before registering
// Matches the login page: glassmorphism card, dark theme
import Head from "next/head";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { claimCheck, claimSet, claimResend } from "@/lib/api";
import {
  User,
  Eye,
  EyeOff,
  Mail,
  Lock,
  CheckCircle2,
  AlertTriangle,
  Loader2,
} from "lucide-react";

type Phase = "checking" | "ready" | "invalid" | "done";

export default function Claim() {
  const router = useRouter();
  const [phase, setPhase] = useState<Phase>("checking");
  const [token, setToken] = useState("");
  const [claimEmail, setClaimEmail] = useState(""); // whose purchase this is
  const [password, setPassword] = useState("");
  const [password2, setPassword2] = useState("");
  const [username, setUsername] = useState("");
  const [showPass, setShowPass] = useState(false);
  const [showPass2, setShowPass2] = useState(false);
  const [resendEmail, setResendEmail] = useState("");
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");
  const [notice, setNotice] = useState("");

  useEffect(() => {
    if (!router.isReady) return;
    const t = String(router.query.token || "");
    setToken(t);
    if (!t) {
      setPhase("invalid");
      setError("This link is missing its code. Request a new one below.");
      return;
    }
    (async () => {
      try {
        const { status, data } = await claimCheck(t);
        if (status === 200 && data.ok) {
          setClaimEmail(data.email);
          setPhase("ready");
        } else {
          setPhase("invalid");
          setError(data.error || "This link is no longer valid.");
          if (data.code === "ALREADY_CLAIMED") setNotice("");
        }
      } catch {
        setPhase("invalid");
        setError("Cannot reach the Nalo servers. Try again shortly.");
      }
    })();
  }, [router.isReady]); // eslint-disable-line react-hooks/exhaustive-deps

  async function handleClaim(e: React.FormEvent) {
    e.preventDefault();
    if (busy) return;
    setError("");
    if (password.length < 8) return setError("Password needs 8+ characters.");
    if (password !== password2) return setError("Passwords do not match.");
    setBusy(true);
    try {
      const { status, data } = await claimSet(token, password, username.trim());
      if (status === 200 && data.ok) {
        setPhase("done");
        setTimeout(() => router.replace("/login?claimed=1"), 2200);
      } else {
        setError(data.error || "Could not set the password.");
      }
    } catch {
      setError("Cannot reach the Nalo servers. Try again shortly.");
    } finally {
      setBusy(false);
    }
  }

  async function handleResend(e: React.FormEvent) {
    e.preventDefault();
    if (busy) return;
    setError("");
    if (!resendEmail) return setError("Enter the email you used at checkout.");
    setBusy(true);
    try {
      const { data } = await claimResend(resendEmail.trim());
      setNotice(
        data.message || "If that email has an unclaimed purchase, the link is on its way."
      );
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
        <title>Set your password — Nalo Packs</title>
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
              {phase === "done" ? "You're all set" : "Set your password"}
            </h1>
            <p className="text-white/60 text-sm">
              {phase === "checking" && "Checking your link..."}
              {phase === "ready" && (
                <>
                  Your purchase is linked to{" "}
                  <span className="text-white font-semibold break-all">{claimEmail}</span>
                  . Choose a password to finish.
                </>
              )}
              {phase === "invalid" &&
                "Enter your purchase email and we'll send a fresh link."}
              {phase === "done" &&
                "Your password is saved. Use it on the site and in the After Effects panel."}
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
            <div className="flex flex-col items-center gap-4 py-4">
              <CheckCircle2 className="w-12 h-12 text-[#37f349]" />
              <p className="text-center text-sm text-white/50">
                Taking you to the login page...
              </p>
            </div>
          )}

          {phase === "ready" && (
            <form onSubmit={handleClaim} className="flex flex-col gap-5">
              {/* Password input */}
              <div className="relative">
                <input
                  type={showPass ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Password (8+ characters)"
                  autoComplete="new-password"
                  className={inputClass}
                />
                <button
                  type="button"
                  onClick={() => setShowPass(!showPass)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-white/40 hover:text-white/70 transition-colors"
                >
                  {showPass ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>

              {/* Confirm password input */}
              <div className="relative">
                <input
                  type={showPass2 ? "text" : "password"}
                  value={password2}
                  onChange={(e) => setPassword2(e.target.value)}
                  placeholder="Confirm password"
                  autoComplete="new-password"
                  className={inputClass}
                />
                <button
                  type="button"
                  onClick={() => setShowPass2(!showPass2)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-white/40 hover:text-white/70 transition-colors"
                >
                  {showPass2 ? <EyeOff className="w-5 h-5" /> : <Lock className="w-5 h-5" />}
                </button>
              </div>

              {/* Username input (optional) */}
              <div className="relative">
                <input
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  placeholder="Username (optional)"
                  autoComplete="off"
                  className={inputClass}
                />
                <User className="absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 text-white/40" />
              </div>

              {error && (
                <p className="text-sm text-red-400 text-center bg-red-500/10 rounded-xl py-3 px-4">
                  {error}
                </p>
              )}

              <button type="submit" disabled={busy} className={buttonClass}>
                {busy ? "Saving..." : "Set password"}
              </button>

              <p className="text-center text-xs text-white/40">
                This link works once and expires after 14 days.
              </p>
            </form>
          )}

          {phase === "invalid" && (
            <form onSubmit={handleResend} className="flex flex-col gap-5">
              <div className="flex items-start gap-3 rounded-xl bg-amber-500/10 py-3 px-4">
                <AlertTriangle className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
                <p className="text-sm text-amber-200/90">{error}</p>
              </div>

              {/* Email input */}
              <div className="relative">
                <input
                  type="email"
                  value={resendEmail}
                  onChange={(e) => setResendEmail(e.target.value)}
                  placeholder="Email used at checkout"
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

          {phase !== "done" && (
            <p className="text-center text-sm text-white/50 mt-6">
              Already have a password?{" "}
              <button
                type="button"
                onClick={() => router.push("/login")}
                className="text-white font-semibold hover:text-[#37f349] transition-colors"
              >
                Login
              </button>
            </p>
          )}

          {phase === "invalid" && (
            <p className="text-center text-xs text-white/40 mt-3">
              Still stuck?{" "}
              <a href="/support.html" className="text-[#37f349] hover:underline">
                Contact support
              </a>
            </p>
          )}
        </div>
      </section>
    </>
  );
}