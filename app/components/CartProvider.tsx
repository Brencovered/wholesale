"use client";

import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";

type CartItem = {
  productId: string;
  name: string;
  price: number;
  quantity: number;
  vendorId: string;
  vendorName: string;
};

type CartContextValue = {
  items: CartItem[];
  itemCount: number;
  addItem: (item: Omit<CartItem, "quantity">) => void;
  removeItem: (productId: string) => void;
  clearCart: () => void;
};

const CartContext = createContext<CartContextValue | null>(null);

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);

  useEffect(() => {
    try {
      const raw = window.localStorage.getItem("local-pantry-cart");
      if (raw) {
        setItems(JSON.parse(raw));
      }
    } catch {
      setItems([]);
    }
  }, []);

  useEffect(() => {
    try {
      window.localStorage.setItem("local-pantry-cart", JSON.stringify(items));
    } catch {}
  }, [items]);

  function addItem(item: Omit<CartItem, "quantity">) {
    setItems((prev) => {
      const existing = prev.find((p) => p.productId === item.productId);

      if (existing) {
        return prev.map((p) =>
          p.productId === item.productId ? { ...p, quantity: p.quantity + 1 } : p
        );
      }

      return [...prev, { ...item, quantity: 1 }];
    });
  }

  function removeItem(productId: string) {
    setItems((prev) => prev.filter((item) => item.productId !== productId));
  }

  function clearCart() {
    setItems([]);
  }

  const value = useMemo(
    () => ({
      items,
      itemCount: items.reduce((sum, item) => sum + item.quantity, 0),
      addItem,
      removeItem,
      clearCart,
    }),
    [items]
  );

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) {
    throw new Error("useCart must be used inside CartProvider");
  }
  return ctx;
}
