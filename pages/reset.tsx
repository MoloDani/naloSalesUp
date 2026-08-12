// pages/reset.tsx — request a reset link, or set a new password with one
//   /reset.html            -> asks for the email
//   /reset.html?token=...  -> asks for the new password
import Head from "next/head";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { resetRequest, resetConfirm } from "@/lib/api";
import { Eye, EyeOff, Mail, Lock, CheckCircle2 } from "lucide-react";

type Phase = "request" | "sent" | "setPassword" | "done";

export default function Reset() {
  const router = useRouter();
  const [phase, setPhase] = useState<Phase>("request");
  const [token, setToken] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [password2, setPassword2] = useState("");
  const [showPass, setShowPass] = useState(false);
  const [showPass2, setShowPass2] = useState(false);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");
  const [notice, setNotice] = useState("");

  useEffect(() => {
    if (!router.isReady) return;
    const t = String(router.query.token || "");
    if (t) {
      setToken(t);
      setPhase("setPassword");
    }
  }, [router.isReady]); // eslint-disable-line react-hooks/exhaustive-deps

  async function handleRequest(e: React.FormEvent) {
    e.preventDefault();
    if (busy) return;
    setError("");
    if (!email) return setError("Enter your email.");
    setBusy(true);
    try {
      const { data } = await resetRequest(email.trim());
      setPhase("sent");
      setNotice(data.message || "If that email has an account, a reset link is on its way.");
    } catch {
      setError("Cannot reach the Nalo servers. Try again shortly.");
    } finally {
      setBusy(false);
    }
  }

  async function handleSetPassword(e: React.FormEvent) {
    e.preventDefault();
    if (busy) return;
    setError("");
    if (password.length < 8) return setError("Password needs 8+ characters.");
    if (password !== password2) return setError("Passwords do not match.");
    setBusy(true);
    try {
      const { status, data } = await resetConfirm(token, password);
      if (status === 200 && data.ok) {
        setPhase("done");
        setTimeout(() => router.replace("/login?reset=1"), 2200);
      } else {
        setError(data.error || "Could not update the password.");
        if (data.code === "BAD_TOKEN") setPhase("request");
      }
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
        <title>Reset password — Nalo Packs</title>
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
              {phase === "done" ? "Password updated" : "Reset password"}
            </h1>
            <p className="text-white/60 text-sm">
              {phase === "request" && "Enter your email and we'll send you a link."}
              {phase === "sent" && "Check your inbox — and your spam folder."}
              {phase === "setPassword" && "Choose a new password for your account."}
              {phase === "done" && "Sign in with your new password."}
            </p>
          </div>

          {notice && (
            <p className="mb-6 text-center text-sm text-[#37f349] bg-[#37f349]/10 rounded-xl py-3 px-4">
              {notice}
            </p>
          )}

          {phase === "done" && (
            <div className="flex flex-col items-center gap-4 py-4">
              <CheckCircle2 className="w-12 h-12 text-[#37f349]" />
              <p className="text-center text-sm text-white/50">
                Taking you to the login page...
              </p>
            </div>
          )}

          {phase === "request" && (
            <form onSubmit={handleRequest} className="flex flex-col gap-5">
              <div className="relative">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Email"
                  autoComplete="email"
                  className={inputClass}
                />
                <Mail className="absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 text-white/40" />
              </div>

              {error && (
                <p className="text-sm text-red-400 text-center bg-red-500/10 rounded-xl py-3 px-4">
                  {error}
                </p>
              )}

              <button type="submit" disabled={busy} className={buttonClass}>
                {busy ? "Sending..." : "Send reset link"}
              </button>
            </form>
          )}

          {phase === "sent" && (
            <>
              <p className="text-center text-sm text-white/50">
                The link works for 1 hour.
              </p>
              <button
                type="button"
                onClick={() => {
                  setPhase("request");
                  setNotice("");
                }}
                className="w-full mt-5 text-center text-sm text-white/60 hover:text-white transition-colors"
              >
                Use a different email
              </button>
            </>
          )}

          {phase === "setPassword" && (
            <form onSubmit={handleSetPassword} className="flex flex-col gap-5">
              <div className="relative">
                <input
                  type={showPass ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="New password (8+ characters)"
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

              <div className="relative">
                <input
                  type={showPass2 ? "text" : "password"}
                  value={password2}
                  onChange={(e) => setPassword2(e.target.value)}
                  placeholder="Confirm new password"
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

              {error && (
                <p className="text-sm text-red-400 text-center bg-red-500/10 rounded-xl py-3 px-4">
                  {error}
                </p>
              )}

              <button type="submit" disabled={busy} className={buttonClass}>
                {busy ? "Saving..." : "Set new password"}
              </button>
            </form>
          )}

          {phase !== "done" && (
            <p className="text-center text-sm text-white/50 mt-6">
              Remembered it?{" "}
              <button
                type="button"
                onClick={() => router.push("/login")}
                className="text-white font-semibold hover:text-[#37f349] transition-colors"
              >
                Login
              </button>
            </p>
          )}
        </div>
      </section>
    </>
  );
}