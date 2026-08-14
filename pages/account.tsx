// pages/account.tsx — user dashboard
// Three panels: who you are, what you own, and the product itself.
// NaloTools is a one-time purchase granting lifetime access, so there is
// nothing to renew, cancel, or manage — the licence panel only ever shows
// "not bought yet", "owned", or "closed".
import Head from "next/head";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import {
  Account,
  API_BASE,
  TIER_LABELS,
  confirmCheckout,
  deactivateDevice,
  downloadLink,
  isLoggedIn,
  logout,
  me,
  startCheckout,
  verifyRequest,
} from "@/lib/api";
import { ArrowLeft } from "lucide-react";

const PANEL =
  "rounded-2xl bg-[#111111] border border-white/10 p-8 shadow-[0_0_40px_rgba(55,243,73,0.05)]";
const LABEL =
  "text-[11px] font-semibold uppercase tracking-wider text-neutral-500";
const BTN_PRIMARY =
  "rounded-xl bg-[#37f349] px-6 py-2.5 text-sm font-bold text-black hover:opacity-90 transition-opacity disabled:opacity-50";

function fmtDate(d: string | null) {
  if (!d) return "";
  return new Date(d).toLocaleDateString(undefined, {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
}

/* Colour and wording per licence state. */
const STATES: Record<string, { pill: string; label: string; line: string }> = {
  none: {
    pill: "bg-white/10 text-neutral-300",
    label: "Not purchased",
    line: "Buy once and keep NaloTools forever — no subscription, no renewals.",
  },
  lifetime: {
    pill: "bg-[#37f349]/15 text-[#37f349]",
    label: "Owned",
    line: "Lifetime access. Every pack we add is included, at no extra cost.",
  },
  disabled: {
    pill: "bg-red-500/15 text-red-500",
    label: "Closed",
    line: "This account is closed. Contact support if that's unexpected.",
  },
};

export default function AccountPage() {
  const router = useRouter();
  const [account, setAccount] = useState<Account | null>(null);
  const [loading, setLoading] = useState(true);
  const [busyFp, setBusyFp] = useState("");
  const [busyBuy, setBusyBuy] = useState(false);
  const [busyDownload, setBusyDownload] = useState(false);
  const [busyVerify, setBusyVerify] = useState(false);
  const [msg, setMsg] = useState("");
  const [msgBad, setMsgBad] = useState(false);

  useEffect(() => {
    if (!router.isReady) return;
    if (!isLoggedIn()) {
      router.replace("/login");
      return;
    }
    boot();
  }, [router.isReady]); // eslint-disable-line react-hooks/exhaustive-deps

  function say(text: string, bad: boolean) {
    setMsg(text);
    setMsgBad(bad);
  }

  async function boot() {
    // Back from Stripe? Confirm the session server-side first, so the
    // licence reads Owned immediately instead of flickering "Not purchased"
    // while the webhook is still in flight.
    const sid = String(router.query.session_id || "");
    if (router.query.checkout === "success" && sid) {
      try {
        await confirmCheckout(sid);
        say("Payment received — NaloTools is yours.", false);
      } catch {
        /* the webhook will catch up */
      }
      router.replace("/account", undefined, { shallow: true });
    } else if (router.query.checkout === "cancelled") {
      say("Checkout cancelled — nothing was charged.", false);
      router.replace("/account", undefined, { shallow: true });
    } else if (router.query.next === "checkout") {
      // Arrived from a Buy button on the marketing site.
      router.replace("/account", undefined, { shallow: true });
      const { status, data } = await me();
      if (status === 200 && data.ok && data.state === "none") {
        const r = await startCheckout();
        if (r.status === 200 && r.data.ok && r.data.url) {
          window.location.href = r.data.url;
          return;
        }
        // Couldn't start — usually an unverified email. Fall through so the
        // page loads and the banner explains why.
        say(r.data.error || "Could not start checkout.", true);
      }
    }
    refresh();
  }

  async function refresh() {
    try {
      const { status, data } = await me();
      if (status === 200 && data.ok) setAccount(data);
      else {
        logout();
        router.replace("/login");
        return;
      }
    } catch {
      say("Cannot reach the Nalo servers. Try again shortly.", true);
    } finally {
      setLoading(false);
    }
  }

  async function handleBuy() {
    if (busyBuy) return;
    setBusyBuy(true);
    setMsg("");
    try {
      const { status, data } = await startCheckout();
      if (status === 200 && data.ok && data.url) {
        window.location.href = data.url;
        return;
      }
      say(data.error || `Could not start checkout (${status}).`, true);
    } catch {
      say("Cannot reach the Nalo servers. Try again shortly.", true);
    } finally {
      setBusyBuy(false);
    }
  }

  async function handleDownload() {
    if (busyDownload) return;
    setBusyDownload(true);
    setMsg("");
    try {
      const { status, data } = await downloadLink();
      if (status === 200 && data.ok && data.url) {
        // Signed link, valid a few minutes. Navigating directly lets the
        // browser handle progress and resume for a large file.
        window.location.href = API_BASE + data.url;
        return;
      }
      say(data.error || `Download unavailable (${status}).`, true);
    } catch {
      say("Cannot reach the Nalo servers. Try again shortly.", true);
    } finally {
      setBusyDownload(false);
    }
  }

  async function handleResendVerify() {
    if (busyVerify || !account) return;
    setBusyVerify(true);
    try {
      await verifyRequest(account.email);
      say("Confirmation link sent — check your inbox and spam folder.", false);
    } catch {
      say("Cannot reach the Nalo servers. Try again shortly.", true);
    } finally {
      setBusyVerify(false);
    }
  }

  async function handleDeactivate(fingerprint: string) {
    if (busyFp) return;
    setBusyFp(fingerprint);
    setMsg("");
    try {
      const { status, data } = await deactivateDevice(fingerprint);
      if (status === 200 && data.ok) {
        setAccount(data);
        say("Device deactivated — the slot is free.", false);
      } else {
        say(data.error || "Could not deactivate that device.", true);
      }
    } catch {
      say("Cannot reach the Nalo servers. Try again shortly.", true);
    } finally {
      setBusyFp("");
    }
  }

  function handleLogout() {
    logout();
    router.replace("/login");
  }

  if (loading || !account) {
    return (
      <section className="min-h-[85vh] flex items-start justify-center px-4 py-16">
        <p className="text-center text-neutral-500 mt-24">
          Loading your account...
        </p>
      </section>
    );
  }

  const s = STATES[account.state] || STATES.none;
  const owned = account.state === "lifetime";

  return (
    <>
      <Head>
        <title>My Account — Nalo Packs</title>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta property="og:title" content="Nalo Packs" />
      </Head>

      <section className="min-h-[85vh] flex items-start justify-center px-4 py-16">
        <div className="w-full max-w-[520px] flex flex-col gap-5">
          <button
            onClick={() => router.push("/")}
            className="self-start flex items-center gap-2 text-sm text-neutral-500 hover:text-white transition-colors -mb-1"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to site
          </button>

          {/* ---------- account ---------- */}
          <div className={PANEL}>
            <div className="flex items-center justify-between">
              <div className="min-w-0 mr-4">
                <h1 className="text-xl font-bold truncate">
                  {account.username || account.email}
                </h1>
                <p className="text-xs text-neutral-500 mt-0.5 truncate">
                  {account.email}
                </p>
              </div>
              <button
                onClick={handleLogout}
                className="shrink-0 rounded-lg border border-white/10 bg-[#1a1a1a] px-4 py-2 text-xs font-semibold text-neutral-400 hover:text-white transition-colors"
              >
                Log out
              </button>
            </div>

            {!account.emailVerified && (
              <div className="mt-6 rounded-xl border border-amber-500/40 bg-amber-500/5 p-4">
                <p className="text-sm font-semibold text-amber-400">
                  Confirm your email
                </p>
                <p className="text-sm text-neutral-400 mt-1">
                  We sent a link to {account.email}. Confirming it keeps your
                  account recoverable if you forget your password.
                </p>
                <button
                  onClick={handleResendVerify}
                  disabled={busyVerify}
                  className="mt-3 rounded-lg border border-amber-500/30 bg-amber-500/10 px-4 py-2 text-xs font-bold text-amber-400 hover:bg-amber-500/20 transition-colors disabled:opacity-50"
                >
                  {busyVerify ? "Sending..." : "Resend link"}
                </button>
              </div>
            )}
          </div>

          {/* ---------- licence ---------- */}
          <div className={PANEL}>
            <div className="flex items-center justify-between mb-4">
              <p className={LABEL}>Licence</p>
              <span
                className={`rounded-full px-3 py-1 text-[11px] font-bold ${s.pill}`}
              >
                {s.label}
              </span>
            </div>

            <p className="text-lg font-bold">
              {TIER_LABELS[account.tier] || account.tier}
            </p>
            <p className="text-sm text-neutral-400 mt-1">{s.line}</p>

            {account.state === "none" && (
              <button
                onClick={handleBuy}
                disabled={busyBuy}
                className={`${BTN_PRIMARY} mt-5`}
              >
                {busyBuy ? "Opening..." : "Buy Now"}
              </button>
            )}

            {owned && account.expiresAt && (
              <p className="text-xs text-neutral-500 mt-3">
                Purchased {fmtDate(account.expiresAt)}
              </p>
            )}
          </div>

          {/* ---------- the product ---------- */}
          <div className={PANEL}>
            <p className={`${LABEL} mb-4`}>NaloTools</p>

            <p className="text-sm text-neutral-400">
              Run the installer with After Effects closed, then open the panel
              from Window &gt; Extensions and sign in with this account.
            </p>

            <button
              onClick={handleDownload}
              disabled={!owned || busyDownload}
              className={`${BTN_PRIMARY} mt-4`}
            >
              {busyDownload ? "Preparing..." : "Download Installer"}
            </button>
            {!owned && (
              <p className="text-xs text-neutral-500 mt-2">
                Buy NaloTools to download the plugin.
              </p>
            )}

            <div className="border-t border-white/10 mt-7 pt-6">
              <p className={`${LABEL} mb-3`}>
                Devices ({account.devices.length}/{account.limit})
              </p>

              {account.devices.length === 0 ? (
                <p className="text-sm text-neutral-600">
                  No PCs activated yet — sign in from the NaloTools panel inside
                  After Effects to activate this account on your machine.
                </p>
              ) : (
                <div className="flex flex-col gap-3">
                  {account.devices.map((d) => (
                    <div
                      key={d.fingerprint}
                      className="flex items-center justify-between rounded-xl border border-white/10 bg-[#1a1a1a] px-4 py-3.5"
                    >
                      <div className="min-w-0 mr-3">
                        <p className="truncate text-sm font-semibold">
                          {d.machineName}
                        </p>
                        <p className="text-[11px] text-neutral-500">
                          Last seen {new Date(d.lastSeen).toLocaleDateString()}
                        </p>
                      </div>
                      <button
                        onClick={() => handleDeactivate(d.fingerprint)}
                        disabled={!!busyFp}
                        className="shrink-0 rounded-lg border border-red-500/30 bg-red-500/10 px-3 py-1.5 text-[11px] font-bold text-red-500 hover:bg-red-500/20 transition-colors disabled:opacity-50"
                      >
                        {busyFp === d.fingerprint ? "Removing..." : "Deactivate"}
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

          {msg && (
            <p
              className={`text-sm text-center ${
                msgBad ? "text-red-500" : "text-[#37f349]"
              }`}
            >
              {msg}
            </p>
          )}
        </div>
      </section>
    </>
  );
}