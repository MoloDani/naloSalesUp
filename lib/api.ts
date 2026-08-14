// lib/api.ts — Nalo license API client for nalopacks.com
// Talks to the Phase 1 backend (192.168.3.109:3000 behind api.nalopacks.com).
// Session JWT lives in localStorage under "nalo_token".

export const API_BASE =
  process.env.NEXT_PUBLIC_API_BASE || "http://api.nalopacks.com";

export type Device = {
  fingerprint: string;
  machineName: string;
  activatedAt: string;
  lastSeen: string;
};

export const TIER_LABELS: Record<string, string> = {
  none: "No licence yet",
  starter: "Starter - 1 PC",
  pro: "Pro - 2 PCs",
  bundle: "Bundle - 2 PCs",
};

const TOKEN_KEY = "nalo_token";

export function getToken(): string {
  if (typeof window === "undefined") return "";
  try {
    return localStorage.getItem(TOKEN_KEY) || "";
  } catch {
    return "";
  }
}

export function setToken(token: string) {
  try {
    if (token) localStorage.setItem(TOKEN_KEY, token);
    else localStorage.removeItem(TOKEN_KEY);
  } catch {}
}

export function isLoggedIn(): boolean {
  return !!getToken();
}

async function request(
  route: string,
  opts: { method?: string; body?: object; auth?: boolean } = {}
): Promise<{ status: number; data: any }> {
  const headers: Record<string, string> = {};
  if (opts.body) headers["Content-Type"] = "application/json";
  if (opts.auth) headers["Authorization"] = "Bearer " + getToken();
  const res = await fetch(API_BASE + route, {
    method: opts.method || (opts.body ? "POST" : "GET"),
    headers,
    body: opts.body ? JSON.stringify(opts.body) : undefined,
  });
  let data: any = {};
  try {
    data = await res.json();
  } catch {}
  return { status: res.status, data };
}

export async function register(
  username: string,
  email: string,
  password: string
) {
  return request("/auth/register", { body: { username, email, password } });
}

export async function login(email: string, password: string) {
  const r = await request("/auth/web-login", { body: { email, password } });
  if (r.status === 200 && r.data.ok && r.data.token) setToken(r.data.token);
  return r;
}

export function logout() {
  setToken("");
}

export async function me(): Promise<{ status: number; data: Account }> {
  return request("/account/me", { auth: true });
}

export async function deactivateDevice(fingerprint: string) {
  return request("/account/deactivate-device", {
    auth: true,
    body: { fingerprint },
  });
}

export async function verifyRequest(email: string) {
  return request("/auth/verify/request", { body: { email } });
}
export async function verifyConfirm(token: string) {
  return request("/auth/verify/confirm", { body: { token } });
}
export async function resetRequest(email: string) {
  return request("/auth/reset/request", { body: { email } });
}
export async function resetConfirm(token: string, password: string) {
  return request("/auth/reset/confirm", { body: { token, password } });
}

export type Account = {
  ok: boolean;
  email: string;
  username: string | null;
  emailVerified: boolean;
  tier: string;
  active: boolean;
  expiresAt: string | null;
  limit: number;
  devices: Device[];
  state: "none" | "active" | "canceling" | "past_due" | "lapsed" | "lifetime" | "disabled";
  subscriptionStatus: string | null;
  cancelAtPeriodEnd: boolean;
  canManageBilling: boolean;
  manualBilling: boolean;
};

export async function startCheckout() {
  return request("/billing/checkout", { method: "POST", auth: true });
}

export async function confirmCheckout(sessionId: string) {
  return request("/billing/session?session_id=" + encodeURIComponent(sessionId), { auth: true });
}

export async function downloadInfo() {
  return request("/download/info", { auth: true });
}
export async function downloadLink() {
  return request("/download/link", { method: "POST", auth: true });
}