const KEY = "pd_cart_count_v1";

export function getCartCount(): number {
  if (typeof window === "undefined") return 0;
  const raw = window.localStorage.getItem(KEY);
  const n = raw ? Number(raw) : 0;
  return Number.isFinite(n) && n >= 0 ? n : 0;
}

export function setCartCount(count: number) {
  if (typeof window === "undefined") return;
  window.localStorage.setItem(KEY, String(Math.max(0, Math.floor(count))));
}
