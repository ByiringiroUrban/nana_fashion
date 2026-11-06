import { createContext, useContext, useEffect, useMemo, useState, type ReactNode } from "react";
import { effectivePrice, getProduct, type Product } from "./products";

type Line = { id: string; qty: number };
type CartCtx = {
  lines: (Line & { product: Product })[];
  count: number;
  total: number;
  add: (id: string) => void;
  setQty: (id: string, qty: number) => void;
  remove: (id: string) => void;
  clear: () => void;
};

const Ctx = createContext<CartCtx | null>(null);
const KEY = "nana-cart";

export function cartTotals(lines: Line[]) {
  let count = 0, total = 0;
  for (const l of lines) {
    const p = getProduct(l.id);
    if (!p) continue;
    count += l.qty;
    total += effectivePrice(p) * l.qty;
  }
  return { count, total };
}

export function CartProvider({ children }: { children: ReactNode }) {
  const [lines, setLines] = useState<Line[]>([]);
  const [loaded, setLoaded] = useState(false);
  useEffect(() => {
    try { setLines(JSON.parse(localStorage.getItem(KEY) || "[]")); } catch { /* ignore */ }
    setLoaded(true);
  }, []);
  useEffect(() => { if (loaded) localStorage.setItem(KEY, JSON.stringify(lines)); }, [lines, loaded]);

  const value = useMemo<CartCtx>(() => {
    const { count, total } = cartTotals(lines);
    return {
      lines: lines.flatMap((l) => { const p = getProduct(l.id); return p ? [{ ...l, product: p }] : []; }),
      count, total,
      add: (id) => setLines((ls) => ls.some((l) => l.id === id) ? ls.map((l) => l.id === id ? { ...l, qty: l.qty + 1 } : l) : [...ls, { id, qty: 1 }]),
      setQty: (id, qty) => setLines((ls) => qty <= 0 ? ls.filter((l) => l.id !== id) : ls.map((l) => l.id === id ? { ...l, qty } : l)),
      remove: (id) => setLines((ls) => ls.filter((l) => l.id !== id)),
      clear: () => setLines([]),
    };
  }, [lines]);
  return <Ctx.Provider value={value}>{children}</Ctx.Provider>;
}

export function useCart() {
  const c = useContext(Ctx);
  if (!c) throw new Error("useCart outside CartProvider");
  return c;
}
