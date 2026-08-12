// pages/account.tsx — user dashboard
// Three panels: who you are, what you pay for, and the product itself.
import Head from "next/head";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { ArrowLeft } from "lucide-react";
import {
  API_BASE,
  Account,
  TIER_LABELS,
  cancelSubscription,
  confirmCheckout,
  deactivateDevice,
  downloadLink,
  isLoggedIn,
  logout,
  me,
  openPortal,
  resumeSubscription,
  startCheckout,
  verifyRequest,
} from "@/lib/api";

const PANEL =
  "rounded-2xl bg-[#111111] border border-white/10 p-8 shadow-[0_0_40px_rgba(55,243,73,0.05)]";
const LABEL =
  "text-[11px] font-semibold uppercase tracking-wider text-neutral-500";
const BTN_PRIMARY =
  "rounded-xl bg-[#37f349] px-6 py-2.5 text-sm font-bold text-black hover:opacity-90 transition-opacity disabled:opacity-50";
const BTN_GHOST =
  "rounded-xl border border-white/15 bg-[#1a1a1a] px-6 py-2.5 text-sm font-bold text-neutral-300 hover:text-white transition-colors disabled:opacity-50";
const BTN_DANGER =
  "rounded-xl border border-red-500/30 bg-red-500/10 px-6 py-2.5 text-sm font-bold text-red-400 hover:bg-red-500/20 transition-colors disabled:opacity-50";

function fmtDate(d: string | null) {
  if (!d) return "";
  return new Date(d).toLocaleDateString(undefined, {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
}

/* Colour and wording for each plan state. */
const STATES: Record<
  string,
  { pill: string; label: string; line: (a: Account) => string }
> = {
  none: {
    pill: "bg-white/10 text-neutral-300",
    label: "No plan",
    line: () => "Subscribe to unlock NaloTools inside After Effects.",
  },
  active: {
    pill: "bg-[#37f349]/15 text-[#37f349]",
    label: "Active",
    line: (a) => "Renews automatically on " + fmtDate(a.expiresAt) + ".",
  },
  canceling: {
    pill: "bg-amber-500/15 text-amber-400",
    label: "Cancelling",
    line: (a) =>
      "Your plan stays active until " +
      fmtDate(a.expiresAt) +
      ", then it will not renew.",
  },
  past_due: {
    pill: "bg-red-500/15 text-red-400",
    label: "Payment failed",
    line: (a) =>
      "We could not charge your card. We'll keep retrying — update it to avoid losing access on " +
      fmtDate(a.expiresAt) +
      ".",
  },
  lapsed: {
    pill: "bg-red-500/15 text-red-500",
    label: "Expired",
    line: (a) => "Your plan ended on " + fmtDate(a.expiresAt) + ".",
  },
  lifetime: {
    pill: "bg-[#37f349]/15 text-[#37f349]",
    label: "Lifetime",
    line: () => "Lifetime access — nothing to renew.",
  },
  disabled: {
    pill: "bg-red-500/15 text-red-500",
    label: "Closed",
    line: () => "This account is closed. Contact support if that's unexpected.",
  },
};

export default function AccountPage() {
  const router = useRouter();
  const [account, setAccount] = useState<Account | null>(null);
  const [loading, setLoading] = useState(true);
  const [busyFp, setBusyFp] = useState("");
  const [busyBilling, setBusyBilling] = useState(false);
  const [busyVerify, setBusyVerify] = useState(false);
  const [confirmCancel, setConfirmCancel] = useState(false);
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

  async function boot() {
    // Back from Stripe? Confirm the session server-side first, so the plan
    // reads Active immediately instead of flickering "No plan" while the
    // webhook is still in flight.
    const sid = String(router.query.session_id || "");
    if (router.query.checkout === "success" && sid) {
      try {
        await confirmCheckout(sid);
        say("Payment received - your plan is active.", false);
      } catch {
        /* the webhook will catch up */
      }
      router.replace("/account", undefined, { shallow: true });
    } else if (router.query.checkout === "cancelled") {
      say("Checkout cancelled — nothing was charged.", false);
      router.replace("/account", undefined, { shallow: true });
    }

    if (router.query.next === "checkout") {
    router.replace("/account", undefined, { shallow: true });
    const { status, data } = await me();
    // Already paying? Don't bounce them to Stripe — show the panel instead.
    if (status === 200 && data.ok && (data.state === "none" || data.state === "lapsed")) {
      const r = await startCheckout();
      if (r.status === 200 && r.data.ok && r.data.url) {
        window.location.href = r.data.url;
        return;
      }
      say(r.data.error || "Could not start checkout.", true);
    }
  }

    refresh();
  }

  function say(text: string, bad: boolean) {
    setMsg(text);
    setMsgBad(bad);
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

  /* Wraps the billing calls that all behave the same way: run, report,
     refresh. Redirects (checkout, portal) leave the page instead. */
  async function billingAction(
    fn: () => Promise<{ status: number; data: any }>,
    redirect = false
  ) {
    if (busyBilling) return;
    setBusyBilling(true);
    setMsg("");
    try {
      const { status, data } = await fn();
      if (status === 200 && data.ok) {
        if (redirect && data.url) {
          window.open(data.url, "_blank", "noopener");
  await refresh();
          return;
        }
        say(data.message || "Done.", false);
        await refresh();
      } else {
        say(data.error || "Something went wrong.", true);
      }
    } catch {
      say("Cannot reach the Nalo servers. Try again shortly.", true);
    } finally {
      setBusyBilling(false);
      setConfirmCancel(false);
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
  const canDownload = account.state !== "none" && account.state !== "disabled";

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

          {/* ---------- subscription ---------- */}
          <div className={PANEL}>
            <div className="flex items-center justify-between mb-4">
              <p className={LABEL}>Subscription</p>
              <span
                className={`rounded-full px-3 py-1 text-[11px] font-bold ${s.pill}`}
              >
                {s.label}
              </span>
            </div>

            <p className="text-lg font-bold">
              {TIER_LABELS[account.tier] || account.tier}
            </p>
            <p className="text-sm text-neutral-400 mt-1">{s.line(account)}</p>

            <div className="flex flex-wrap gap-3 mt-5">
              {(account.state === "none" || account.state === "lapsed") && (
                <button
                  onClick={() => billingAction(startCheckout, true)}
                  disabled={busyBilling}
                  className={BTN_PRIMARY}
                >
                  {busyBilling
                    ? "Opening..."
                    : account.state === "none"
                    ? "Subscribe"
                    : "Subscribe again"}
                </button>
              )}

              {account.state === "canceling" && (
                <button
                  onClick={() => billingAction(resumeSubscription)}
                  disabled={busyBilling}
                  className={BTN_PRIMARY}
                >
                  {busyBilling ? "Working..." : "Keep my subscription"}
                </button>
              )}

              {(account.state === "active" || account.state === "past_due") &&
                (confirmCancel ? (
                  <>
                    <button
                      onClick={() => billingAction(cancelSubscription)}
                      disabled={busyBilling}
                      className={BTN_DANGER}
                    >
                      {busyBilling ? "Cancelling..." : "Yes, cancel"}
                    </button>
                    <button
                      onClick={() => setConfirmCancel(false)}
                      className={BTN_GHOST}
                    >
                      Keep it
                    </button>
                  </>
                ) : (
                  <button
                    onClick={() => setConfirmCancel(true)}
                    className={BTN_DANGER}
                  >
                    Cancel subscription
                  </button>
                ))}

              {account.canManageBilling && (
                <button
                  onClick={() => billingAction(openPortal, true)}
                  disabled={busyBilling}
                  className={BTN_GHOST}
                >
                  {busyBilling ? "Opening..." : "Payment & invoices"}
                </button>
              )}
            </div>

            {confirmCancel && (
              <p className="text-xs text-neutral-500 mt-3">
                You'll keep full access until {fmtDate(account.expiresAt)}.
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
              onClick={async () => {
                const { status, data } = await downloadLink();
                if (status === 200 && data.ok) window.location.href = API_BASE + data.url;
                else say(data.error || "Download unavailable.", true);
              }}
              disabled={!canDownload}
              className={BTN_PRIMARY + " mt-4"}
            >
              Download installer
            </button>
            {!canDownload && (
              <p className="text-xs text-neutral-500 mt-2">
                Subscribe to download the plugin.
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