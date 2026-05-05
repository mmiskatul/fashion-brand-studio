import { create } from "zustand";
import { persist } from "zustand/middleware";

export type CartItem = {
  productId: string;
  name: string;
  image: string;
  price: number;
  color: string;
  size: string;
  quantity: number;
  slug: string;
};

type CartState = {
  items: CartItem[];
  coupon?: { code: string; type: "percent" | "fixed"; value: number };
  add: (item: CartItem) => void;
  remove: (productId: string, color: string, size: string) => void;
  updateQty: (productId: string, color: string, size: string, qty: number) => void;
  clear: () => void;
  applyCoupon: (c: CartState["coupon"]) => void;
  subtotal: () => number;
  discount: () => number;
  delivery: () => number;
  total: () => number;
};

export const useCart = create<CartState>()(
  persist(
    (set, get) => ({
      items: [],
      add: (item) => {
        const { items } = get();
        const existing = items.find((i) => i.productId === item.productId && i.color === item.color && i.size === item.size);
        if (existing) {
          set({ items: items.map((i) => i === existing ? { ...i, quantity: i.quantity + item.quantity } : i) });
        } else {
          set({ items: [...items, item] });
        }
      },
      remove: (productId, color, size) =>
        set({ items: get().items.filter((i) => !(i.productId === productId && i.color === color && i.size === size)) }),
      updateQty: (productId, color, size, quantity) =>
        set({ items: get().items.map((i) => i.productId === productId && i.color === color && i.size === size ? { ...i, quantity: Math.max(1, quantity) } : i) }),
      clear: () => set({ items: [], coupon: undefined }),
      applyCoupon: (coupon) => set({ coupon }),
      subtotal: () => get().items.reduce((s, i) => s + i.price * i.quantity, 0),
      discount: () => {
        const sub = get().subtotal();
        const c = get().coupon;
        if (!c) return 0;
        return c.type === "percent" ? Math.round(sub * (c.value / 100)) : Math.min(sub, c.value);
      },
      delivery: () => {
        const sub = get().subtotal() - get().discount();
        return sub === 0 || sub > 100 ? 0 : 8;
      },
      total: () => get().subtotal() - get().discount() + get().delivery(),
    }),
    { name: "atelier-cart" }
  )
);
