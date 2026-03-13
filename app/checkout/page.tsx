"use client";

import { useMemo } from "react";
import Link from "next/link";
import { useCart } from "../components/CartProvider";

export default function CheckoutPage() {
  const { items, removeItem, clearCart } = useCart();

  const total = useMemo(() => {
    return items.reduce((sum, item) => sum + item.price * item.quantity, 0);
  }, [items]);

  return (
    <div className="page">
      <div className="pageHeader">
        <h1 className="pageTitle">Your Basket</h1>
        <p className="pageSubtitle">
          Review your selected products before checkout.
        </p>
      </div>

      {items.length === 0 ? (
        <div className="emptyState">
          <svg 
            width="64" 
            height="64" 
            fill="none" 
            stroke="#a3a3a3" 
            strokeWidth="1.5" 
            viewBox="0 0 24 24"
            style={{ marginBottom: 16 }}
          >
            <path d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 00-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 00-16.536-1.84M7.5 14.25L5.106 5.272M6 20.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm12.75 0a.75.75 0 11-1.5 0 .75.75 0 011.5 0z" />
          </svg>
          <h3>Your basket is empty</h3>
          <p>Browse our vendors and add some products to get started.</p>
          <Link href="/search" className="primaryBtn" style={{ marginTop: 16 }}>
            Browse Vendors
          </Link>
        </div>
      ) : (
        <div className="twoColLayout">
          <div>
            {/* Basket Items */}
            <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
              {items.map((item) => (
                <div key={item.productId} className="basketItem">
                  <div className="basketItemInfo">
                    <h3>{item.name}</h3>
                    <p>Quantity: {item.quantity}</p>
                    <p>Unit price: ${item.price.toFixed(2)}</p>
                  </div>
                  <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-end", gap: 8 }}>
                    <span className="basketItemPrice">
                      ${(item.price * item.quantity).toFixed(2)}
                    </span>
                    <button
                      type="button"
                      onClick={() => removeItem(item.productId)}
                      style={{
                        background: "none",
                        border: "none",
                        color: "#dc2626",
                        fontSize: 13,
                        fontWeight: 500,
                        cursor: "pointer",
                        padding: "4px 8px",
                      }}
                    >
                      Remove
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {/* Total */}
            <div className="basketTotal">
              <h3>Total</h3>
              <span className="totalAmount">${total.toFixed(2)}</span>
            </div>

            {/* Actions */}
            <div style={{ display: "flex", gap: 12, marginTop: 24 }}>
              <button 
                type="button" 
                className="primaryBtn"
                style={{ flex: 1 }}
              >
                Proceed to Checkout
              </button>
              <button 
                type="button" 
                className="secondaryBtn"
                onClick={clearCart}
              >
                Clear Basket
              </button>
            </div>

            <p style={{ marginTop: 16, fontSize: 13, color: "#a3a3a3", textAlign: "center" }}>
              MVP: Checkout functionality is mocked for demo purposes.
            </p>
          </div>

          {/* Sidebar */}
          <div className="sidebarCard">
            <h3>Order Summary</h3>
            <div style={{ marginTop: 16 }}>
              <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 8 }}>
                <span style={{ color: "#525252" }}>Items ({items.length})</span>
                <span>${total.toFixed(2)}</span>
              </div>
              <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 8 }}>
                <span style={{ color: "#525252" }}>Delivery</span>
                <span>TBD</span>
              </div>
              <div style={{ 
                display: "flex", 
                justifyContent: "space-between", 
                paddingTop: 16,
                borderTop: "1px solid #e5e5e5",
                marginTop: 16,
                fontWeight: 600,
              }}>
                <span>Total</span>
                <span>${total.toFixed(2)}</span>
              </div>
            </div>

            <div style={{ marginTop: 24 }}>
              <h4 style={{ fontSize: 14, fontWeight: 600, marginBottom: 8 }}>Fulfillment Options</h4>
              <p style={{ fontSize: 13, color: "#525252", lineHeight: 1.6 }}>
                Pickup and delivery options will be shown based on vendor availability during checkout.
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
