// pages/account.tsx — user dashboard
// Plan status, up to 2 activated PCs with Deactivate buttons, and
// Buy/Renew via the existing Stripe Payment Link (email prefilled).
import Head from "next/head";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import {
  Account,
  TIER_LABELS,
  buyUrl,
  deactivateDevice,
  isLoggedIn,
  logout,
  me,
} from "@/lib/api";

export default function AccountPage() {
  const router = useRouter();
  const [account, setAccount] = useState<Account | null>(null);
  const [loading, setLoading] = useState(true);
  const [busyFp, setBusyFp] = useState("");
  const [msg, setMsg] = useState("");
  const [msgBad, setMsgBad] = useState(false);

  useEffect(() => {
    if (!router.isReady) return;
    if (!isLoggedIn()) {
      router.replace("/login");
      return;
    }
    refresh();
  }, [router.isReady]); // eslint-disable-line react-hooks/exhaustive-deps

  async function refresh() {
    try {
      const { status, data } = await me();
      if (status === 200 && data.ok) {
        setAccount(data);
      } else {
        // token expired or revoked — back to login
        logout();
        router.replace("/login");
        return;
      }
    } catch {
      setMsg("Cannot reach the Nalo servers. Try again shortly.");
      setMsgBad(true);
    } finally {
      setLoading(false);
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
        setMsg("Device deactivated — the slot is free.");
        setMsgBad(false);
      } else {
        setMsg(data.error || "Could not deactivate that device.");
        setMsgBad(true);
      }
    } catch {
      setMsg("Cannot reach the Nalo servers. Try again shortly.");
      setMsgBad(true);
    } finally {
      setBusyFp("");
    }
  }

  function handleLogout() {
    logout();
    router.replace("/login");
  }

  return (
    <>
      <Head>
        <title>My Account — Nalo Packs</title>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta property="og:title" content="Nalo Packs" />
      </Head>

      <section className="min-h-[85vh] flex items-start justify-center px-4 py-16">
        <div className="w-full max-w-[520px]">
          {loading || !account ? (
            <p className="text-center text-neutral-500 mt-24">
              Loading your account...
            </p>
          ) : (
            <div className="rounded-2xl bg-[#111111] border border-white/10 p-8 shadow-[0_0_40px_rgba(55,243,73,0.05)]">
              {/* Header */}
              <div className="flex items-center justify-between mb-8">
                <div>
                  <h1 className="text-xl font-bold">
                    {account.username || account.email}
                  </h1>
                  <p className="text-xs text-neutral-500 mt-0.5">
                    {account.email}
                  </p>
                </div>
                <button
                  onClick={handleLogout}
                  className="rounded-lg border border-white/10 bg-[#1a1a1a] px-4 py-2 text-xs font-semibold text-neutral-400 hover:text-white transition-colors"
                >
                  Log out
                </button>
              </div>

              {/* Plan */}
              <div
                className={`rounded-xl border p-5 mb-6 ${
                  account.active
                    ? "border-[#37f349]/40 bg-[#37f349]/5"
                    : "border-red-500/40 bg-red-500/5"
                }`}
              >
                <p className="text-[11px] font-semibold uppercase tracking-wider text-neutral-500 mb-1">
                  Plan
                </p>
                <p
                  className={`text-lg font-bold ${
                    account.active ? "text-[#37f349]" : "text-red-500"
                  }`}
                >
                  {TIER_LABELS[account.tier] || account.tier}
                </p>
                <p className="text-sm text-neutral-400 mt-1">
                  {account.active
                    ? account.expiresAt
                      ? "Active until " +
                        new Date(account.expiresAt).toLocaleDateString()
                      : "Active — lifetime access"
                    : account.tier === "none"
                    ? "Purchase license to unlock NaloTools in After Effects"
                    : "Expired - renew to keep using NaloTools."}
                </p>

                {!account.active && (
                  <a
                    href={buyUrl(account.email)}
                    className="mt-4 inline-block rounded-xl bg-[#37f349] px-6 py-2.5 text-sm font-bold text-black hover:opacity-90 transition-opacity"
                  >
                    {account.tier === "none" ? "Buy Now" : "Renew Plan"}
                  </a>
                )}
              </div>

              {/* Devices */}
              <p className="text-[11px] font-semibold uppercase tracking-wider text-neutral-500 mb-3">
                Devices ({account.devices.length}/{account.limit})
              </p>

              {account.devices.length === 0 ? (
                <p className="text-sm text-neutral-600 mb-2">
                  No PCs activated yet - sign in from the NaloTool panel inside
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
                          Last seen{" "}
                          {new Date(d.lastSeen).toLocaleDateString()}
                        </p>
                      </div>
                      <button
                        onClick={() => handleDeactivate(d.fingerprint)}
                        disabled={!!busyFp}
                        className="shrink-0 rounded-lg border border-red-500/30 bg-red-500/10 px-3 py-1.5 text-[11px] font-bold text-red-500 hover:bg-red-500/20 transition-colors disabled:opacity-50"
                      >
                        {busyFp === d.fingerprint
                          ? "Removing..."
                          : "Deactivate"}
                      </button>
                    </div>
                  ))}
                </div>
              )}

              {msg && (
                <p
                  className={`mt-4 text-sm text-center ${
                    msgBad ? "text-red-500" : "text-[#37f349]"
                  }`}
                >
                  {msg}
                </p>
              )}
            </div>
          )}
        </div>
      </section>
    </>
  );
}
