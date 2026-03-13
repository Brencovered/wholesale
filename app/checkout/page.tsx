"use client";

import { useMemo } from "react";
import { useCart } from "../components/CartProvider";

export default function CheckoutPage() {
  const { items, removeItem, clearCart } = useCart();

  const total = useMemo(() => {
    return items.reduce((sum, item) => sum + item.price * item.quantity, 0);
  }, [items]);

  return (
    <div className="page">
      <section className="section">
        <h2>Basket</h2>
        <p>Review your selected products.</p>
      </section>

      <section className="section">
        {items.length === 0 ? (
          <p>Your basket is empty.</p>
        ) : (
          <>
            <div style={{ display: "grid", gap: 14 }}>
              {items.map((item) => (
                <div key={item.productId} className="card">
                  <h3>{item.name}</h3>
                  <p>Quantity: {item.quantity}</p>
                  <p>Unit price: ${item.price.toFixed(2)}</p>
                  <p style={{ fontWeight: 800 }}>
                    Line total: ${(item.price * item.quantity).toFixed(2)}
                  </p>

                  <div className="actions" style={{ marginTop: 12 }}>
                    <button
                      type="button"
                      className="secondaryBtn"
                      onClick={() => removeItem(item.productId)}
                    >
                      Remove
                    </button>
                  </div>
                </div>
              ))}
            </div>

            <div className="section" style={{ marginTop: 20 }}>
              <h2>Total</h2>
              <p style={{ fontSize: 24, fontWeight: 800, color: "#1e5f2c" }}>
                ${total.toFixed(2)}
              </p>

              <div className="actions" style={{ marginTop: 14 }}>
                <button type="button" className="secondaryBtn" onClick={clearCart}>
                  Clear basket
                </button>
              </div>
            </div>
          </>
        )}
      </section>
    </div>
  );
}