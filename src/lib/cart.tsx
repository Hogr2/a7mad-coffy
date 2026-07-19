import { createContext, useContext, useEffect, useState, type ReactNode } from "react";

export const DEFAULT_GRIND = "حبة كاملة";

export type CartItem = { id: string; qty: number; grind: string };

type CartCtx = {
  items: CartItem[];
  add: (id: string, qty?: number, grind?: string) => void;
  remove: (id: string, grind: string) => void;
  setQty: (id: string, grind: string, qty: number) => void;
  clear: () => void;
  count: number;
};

const Ctx = createContext<CartCtx | null>(null);
const KEY = "dawa-cart-v1";

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    try {
      const raw = localStorage.getItem(KEY);
      if (raw) {
        const parsed = JSON.parse(raw) as Partial<CartItem>[];
        setItems(parsed.map((i) => ({ grind: DEFAULT_GRIND, ...i }) as CartItem));
      }
    } catch {
      /* ignore corrupt cart */
    }
    setLoaded(true);
  }, []);

  useEffect(() => {
    if (!loaded) return;
    try {
      localStorage.setItem(KEY, JSON.stringify(items));
    } catch {
      /* storage unavailable */
    }
  }, [items, loaded]);

  const same = (i: CartItem, id: string, grind: string) => i.id === id && i.grind === grind;

  const add = (id: string, qty = 1, grind = DEFAULT_GRIND) =>
    setItems((prev) => {
      const found = prev.find((i) => same(i, id, grind));
      if (found) return prev.map((i) => (same(i, id, grind) ? { ...i, qty: i.qty + qty } : i));
      return [...prev, { id, qty, grind }];
    });
  const remove = (id: string, grind: string) => setItems((p) => p.filter((i) => !same(i, id, grind)));
  const setQty = (id: string, grind: string, qty: number) =>
    setItems((p) =>
      qty <= 0 ? p.filter((i) => !same(i, id, grind)) : p.map((i) => (same(i, id, grind) ? { ...i, qty } : i)),
    );
  const clear = () => setItems([]);
  const count = items.reduce((s, i) => s + i.qty, 0);

  return <Ctx.Provider value={{ items, add, remove, setQty, clear, count }}>{children}</Ctx.Provider>;
}

export function useCart() {
  const c = useContext(Ctx);
  if (!c) throw new Error("useCart outside provider");
  return c;
}
