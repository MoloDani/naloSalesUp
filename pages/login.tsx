// pages/login.tsx — sign in / create account
// Glassmorphism design with dark theme
import Head from "next/head";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { isLoggedIn, login, register } from "@/lib/api";
import { User, Eye, EyeOff, Mail, Lock } from "lucide-react";

type Tab = "login" | "register";

export default function Login() {
  const router = useRouter();
  const [tab, setTab] = useState<Tab>("login");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const [password2, setPassword2] = useState("");
  const [showPass, setShowPass] = useState(false);
  const [showPass2, setShowPass2] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");
  const [notice, setNotice] = useState("");

  useEffect(() => {
    if (!router.isReady) return;
    if (isLoggedIn()) {
      router.replace(router.query.next === "checkout" ? "/account?next=checkout" : "/account");
      return;
    }
    if (router.query.tab === "register") setTab("register");
    if (router.query.reset === "1") setNotice("Password updated — sign in below.");
  }, [router.isReady]); // eslint-disable-line react-hooks/exhaustive-deps

  function switchTab(t: Tab) {
    setTab(t);
    setError("");
    setNotice("");
  }

  async function handleLogin(e: React.FormEvent) {
    e.preventDefault();
    if (busy) return;
    setError("");
    if (!email || !password) return setError("Enter your email and password.");
    setBusy(true);
    try {
      const { status, data } = await login(email.trim(), password);
      if (status === 200 && data.ok) {
        router.replace(router.query.next === "checkout" ? "/account?next=checkout" : "/account");
      } else {
        setError(data.error || "Login failed. Try again.");
      }
    } catch {
      setError("Cannot reach the Nalo servers. Try again shortly.");
    } finally {
      setBusy(false);
    }
  }

  async function handleRegister(e: React.FormEvent) {
    e.preventDefault();
    if (busy) return;
    setError("");
    if (!email || !password) return setError("Enter an email and password.");
    if (password.length < 8) return setError("Password needs 8+ characters.");
    if (password !== password2) return setError("Passwords do not match.");
    setBusy(true);
    try {
      const { status, data } = await register(
        username.trim(),
        email.trim(),
        password
      );
      if (status === 200 && data.ok) {
        // Straight in — no reason to make them retype the password they just chose.
        const r = await login(email.trim(), password);
        if (r.status === 200 && r.data.ok) {
          router.replace(router.query.next === "checkout" ? "/account?next=checkout" : "/account");
          return;
        }
        // Auto-login failed for some reason; fall back to the manual path.
        setNotice("Account created — sign in below.");
        setTab("login");
        setPassword("");
        setPassword2("");
      } else {
        setError(data.error || "Registration failed.");
      }
    } catch {
      setError("Cannot reach the Nalo servers. Try again shortly.");
    } finally {
      setBusy(false);
    }
  }

  return (
    <>
      <Head>
        <title>{tab === "login" ? "Login" : "Register"} - Nalo Packs</title>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta property="og:title" content="Nalo Packs" />
      </Head>

      <section className="min-h-[85vh] flex items-center justify-center px-4 py-16">
        {/* Glassmorphism card */}
        <div className="w-full max-w-[360px] rounded-3xl bg-white/10 backdrop-blur-xl border border-white/20 p-6 md:p-8 shadow-2xl">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-white mb-2">
              {tab === "login" ? "Login" : "Register"}
            </h1>
            <p className="text-white/60 text-sm">
              {tab === "login"
                ? "Welcome back, please login to your account"
                : "Create your account to get started"}
            </p>
          </div>

          {notice && (
            <p className="mb-6 text-center text-sm text-[#37f349] bg-[#37f349]/10 rounded-xl py-3 px-4">
              {notice}
            </p>
          )}

          {tab === "login" ? (
            <form onSubmit={handleLogin} className="flex flex-col gap-5">
              {/* Email input */}
              <div className="relative">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Email"
                  autoComplete="email"
                  className="w-full rounded-2xl bg-white/10 border border-white/20 px-5 py-4 pr-12 text-white placeholder-white/40 outline-none focus:border-[#37f349]/60 focus:bg-white/15 transition-all"
                />
                <Mail className="absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 text-white/40" />
              </div>

              {/* Password input */}
              <div className="relative">
                <input
                  type={showPass ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Password"
                  autoComplete="current-password"
                  className="w-full rounded-2xl bg-white/10 border border-white/20 px-5 py-4 pr-12 text-white placeholder-white/40 outline-none focus:border-[#37f349]/60 focus:bg-white/15 transition-all"
                />
                <button
                  type="button"
                  onClick={() => setShowPass(!showPass)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-white/40 hover:text-white/70 transition-colors"
                >
                  {showPass ? (
                    <EyeOff className="w-5 h-5" />
                  ) : (
                    <Eye className="w-5 h-5" />
                  )}
                </button>
              </div>

              {/* Remember me */}
              <label className="flex items-center gap-3 cursor-pointer select-none">
                <div className="relative">
                  <input
                    type="checkbox"
                    checked={rememberMe}
                    onChange={(e) => setRememberMe(e.target.checked)}
                    className="sr-only peer"
                  />
                  <div className="w-5 h-5 rounded-md border-2 border-white/30 bg-white/5 peer-checked:bg-[#37f349] peer-checked:border-[#37f349] transition-all flex items-center justify-center">
                    {rememberMe && (
                      <svg className="w-3 h-3 text-black" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                      </svg>
                    )}
                  </div>
                </div>
                <span className="text-white/60 text-sm">Remember me</span>
              </label>

              {error && (
                <p className="text-sm text-red-400 text-center bg-red-500/10 rounded-xl py-3 px-4">
                  {error}
                </p>
              )}

              {/* Login button */}
              <button
                type="submit"
                disabled={busy}
                className="mt-2 rounded-2xl bg-gradient-to-r from-[#2ed14c] to-[#37f349] py-4 text-base font-bold text-black transition-all hover:opacity-90 hover:shadow-lg hover:shadow-[#37f349]/25 disabled:opacity-60"
              >
                {busy ? "Signing in..." : "Login"}
              </button>

              {/* Switch to register */}
              <p className="text-center text-sm text-white/50 mt-2">
                Don't have an account?{" "}
                <button
                  type="button"
                  onClick={() => switchTab("register")}
                  className="text-white font-semibold hover:text-[#37f349] transition-colors"
                >
                  Signup
                </button>
              </p>

              <p className="text-center text-xs text-white/40">
                <button
                  type="button"
                  onClick={() => router.push("/reset")}
                  className="text-[#37f349] hover:underline"
                >
                  Forgot your password?
                </button>
              </p>
            </form>
          ) : (
            <form onSubmit={handleRegister} className="flex flex-col gap-5">
              {/* Username input */}
              <div className="relative">
                <input
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  placeholder="Username"
                  autoComplete="off"
                  className="w-full rounded-2xl bg-white/10 border border-white/20 px-5 py-4 pr-12 text-white placeholder-white/40 outline-none focus:border-[#37f349]/60 focus:bg-white/15 transition-all"
                />
                <User className="absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 text-white/40" />
              </div>

              {/* Email input */}
              <div className="relative">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Email"
                  autoComplete="email"
                  className="w-full rounded-2xl bg-white/10 border border-white/20 px-5 py-4 pr-12 text-white placeholder-white/40 outline-none focus:border-[#37f349]/60 focus:bg-white/15 transition-all"
                />
                <Mail className="absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 text-white/40" />
              </div>

              {/* Password input */}
              <div className="relative">
                <input
                  type={showPass ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Password (8+ characters)"
                  autoComplete="new-password"
                  className="w-full rounded-2xl bg-white/10 border border-white/20 px-5 py-4 pr-12 text-white placeholder-white/40 outline-none focus:border-[#37f349]/60 focus:bg-white/15 transition-all"
                />
                <button
                  type="button"
                  onClick={() => setShowPass(!showPass)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-white/40 hover:text-white/70 transition-colors"
                >
                  {showPass ? (
                    <EyeOff className="w-5 h-5" />
                  ) : (
                    <Eye className="w-5 h-5" />
                  )}
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
                  className="w-full rounded-2xl bg-white/10 border border-white/20 px-5 py-4 pr-12 text-white placeholder-white/40 outline-none focus:border-[#37f349]/60 focus:bg-white/15 transition-all"
                />
                <button
                  type="button"
                  onClick={() => setShowPass2(!showPass2)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-white/40 hover:text-white/70 transition-colors"
                >
                  {showPass2 ? (
                    <EyeOff className="w-5 h-5" />
                  ) : (
                    <Lock className="w-5 h-5" />
                  )}
                </button>
              </div>

              {error && (
                <p className="text-sm text-red-400 text-center bg-red-500/10 rounded-xl py-3 px-4">
                  {error}
                </p>
              )}

              {/* Register button */}
              <button
                type="submit"
                disabled={busy}
                className="mt-2 rounded-2xl bg-gradient-to-r from-[#2ed14c] to-[#37f349] py-4 text-base font-bold text-black transition-all hover:opacity-90 hover:shadow-lg hover:shadow-[#37f349]/25 disabled:opacity-60"
              >
                {busy ? "Creating account..." : "Create Account"}
              </button>

              {/* Switch to login */}
              <p className="text-center text-sm text-white/50 mt-2">
                Already have an account?{" "}
                <button
                  type="button"
                  onClick={() => switchTab("login")}
                  className="text-white font-semibold hover:text-[#37f349] transition-colors"
                >
                  Login
                </button>
              </p>
            </form>
          )}
        </div>
      </section>
    </>
  );
}
