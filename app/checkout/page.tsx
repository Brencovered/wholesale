"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { useCart } from "../components/CartProvider";

type PaymentMethod = "online" | "instore";
type FulfillmentChoice = "pickup" | "delivery";

type VendorCheckoutOptions = {
  fulfillment: FulfillmentChoice;
  payment: PaymentMethod;
};

export default function CheckoutPage() {
  const { items, removeItem, clearCart } = useCart();
  
  // Group items by vendor
  const itemsByVendor = useMemo(() => {
    const grouped: Record<string, { vendorName: string; items: typeof items }> = {};
    
    for (const item of items) {
      if (!grouped[item.vendorId]) {
        grouped[item.vendorId] = {
          vendorName: item.vendorName,
          items: [],
        };
      }
      grouped[item.vendorId].items.push(item);
    }
    
    return grouped;
  }, [items]);

  const vendorIds = Object.keys(itemsByVendor);

  // Track checkout options per vendor
  const [vendorOptions, setVendorOptions] = useState<Record<string, VendorCheckoutOptions>>(() => {
    const initial: Record<string, VendorCheckoutOptions> = {};
    for (const vendorId of vendorIds) {
      initial[vendorId] = { fulfillment: "pickup", payment: "online" };
    }
    return initial;
  });

  const updateVendorOption = (
    vendorId: string, 
    field: keyof VendorCheckoutOptions, 
    value: FulfillmentChoice | PaymentMethod
  ) => {
    setVendorOptions(prev => ({
      ...prev,
      [vendorId]: {
        ...prev[vendorId],
        [field]: value,
        // If switching to delivery, force online payment
        ...(field === "fulfillment" && value === "delivery" ? { payment: "online" } : {}),
      },
    }));
  };

  const total = useMemo(() => {
    return items.reduce((sum, item) => sum + item.price * item.quantity, 0);
  }, [items]);

  const getVendorTotal = (vendorId: string) => {
    return itemsByVendor[vendorId].items.reduce(
      (sum, item) => sum + item.price * item.quantity, 
      0
    );
  };

  // Calculate what needs to be paid online vs in-store
  const paymentSummary = useMemo(() => {
    let online = 0;
    let instore = 0;
    
    for (const vendorId of vendorIds) {
      const vendorTotal = getVendorTotal(vendorId);
      const options = vendorOptions[vendorId];
      
      if (options?.payment === "instore") {
        instore += vendorTotal;
      } else {
        online += vendorTotal;
      }
    }
    
    return { online, instore };
  }, [vendorIds, vendorOptions, itemsByVendor]);

  return (
    <div className="page">
      <div className="pageHeader">
        <h1 className="pageTitle">Checkout</h1>
        <p className="pageSubtitle">
          Review your basket and choose how you'd like to receive each order.
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
            {/* Orders grouped by vendor */}
            {vendorIds.map((vendorId) => {
              const { vendorName, items: vendorItems } = itemsByVendor[vendorId];
              const options = vendorOptions[vendorId] || { fulfillment: "pickup", payment: "online" };
              const vendorTotal = getVendorTotal(vendorId);

              return (
                <div 
                  key={vendorId} 
                  style={{ 
                    marginBottom: 24, 
                    background: "#fff", 
                    border: "1px solid #e5e5e5", 
                    borderRadius: 16,
                    overflow: "hidden",
                  }}
                >
                  {/* Vendor Header */}
                  <div style={{ 
                    padding: "16px 20px", 
                    background: "#fafafa", 
                    borderBottom: "1px solid #e5e5e5",
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                  }}>
                    <div>
                      <h3 style={{ fontSize: 16, fontWeight: 600, margin: 0 }}>{vendorName}</h3>
                      <p style={{ fontSize: 13, color: "#a3a3a3", margin: "4px 0 0" }}>
                        {vendorItems.length} item{vendorItems.length !== 1 ? "s" : ""}
                      </p>
                    </div>
                    <span style={{ fontSize: 18, fontWeight: 700 }}>
                      ${vendorTotal.toFixed(2)}
                    </span>
                  </div>

                  {/* Items */}
                  <div style={{ padding: 20 }}>
                    {vendorItems.map((item) => (
                      <div 
                        key={item.productId}
                        style={{ 
                          display: "flex", 
                          justifyContent: "space-between", 
                          alignItems: "center",
                          padding: "12px 0",
                          borderBottom: "1px solid #f5f5f5",
                        }}
                      >
                        <div>
                          <p style={{ fontWeight: 500, margin: 0 }}>{item.name}</p>
                          <p style={{ fontSize: 13, color: "#a3a3a3", margin: "4px 0 0" }}>
                            {item.quantity} x ${item.price.toFixed(2)}
                          </p>
                        </div>
                        <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                          <span style={{ fontWeight: 600 }}>
                            ${(item.price * item.quantity).toFixed(2)}
                          </span>
                          <button
                            type="button"
                            onClick={() => removeItem(item.productId)}
                            style={{
                              background: "none",
                              border: "none",
                              color: "#dc2626",
                              fontSize: 12,
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

                  {/* Fulfillment & Payment Options */}
                  <div style={{ 
                    padding: 20, 
                    background: "#fafafa", 
                    borderTop: "1px solid #e5e5e5",
                  }}>
                    {/* Fulfillment Choice */}
                    <div style={{ marginBottom: 16 }}>
                      <p style={{ 
                        fontSize: 12, 
                        fontWeight: 600, 
                        color: "#525252", 
                        textTransform: "uppercase", 
                        letterSpacing: "0.03em",
                        marginBottom: 8,
                      }}>
                        Fulfillment
                      </p>
                      <div style={{ display: "flex", gap: 8 }}>
                        <button
                          type="button"
                          onClick={() => updateVendorOption(vendorId, "fulfillment", "pickup")}
                          style={{
                            flex: 1,
                            padding: "12px 16px",
                            border: options.fulfillment === "pickup" ? "2px solid #0a0a0a" : "1px solid #e5e5e5",
                            borderRadius: 10,
                            background: options.fulfillment === "pickup" ? "#0a0a0a" : "#fff",
                            color: options.fulfillment === "pickup" ? "#fff" : "#0a0a0a",
                            fontWeight: 500,
                            fontSize: 14,
                            cursor: "pointer",
                            transition: "all 0.2s",
                          }}
                        >
                          Pickup
                        </button>
                        <button
                          type="button"
                          onClick={() => updateVendorOption(vendorId, "fulfillment", "delivery")}
                          style={{
                            flex: 1,
                            padding: "12px 16px",
                            border: options.fulfillment === "delivery" ? "2px solid #0a0a0a" : "1px solid #e5e5e5",
                            borderRadius: 10,
                            background: options.fulfillment === "delivery" ? "#0a0a0a" : "#fff",
                            color: options.fulfillment === "delivery" ? "#fff" : "#0a0a0a",
                            fontWeight: 500,
                            fontSize: 14,
                            cursor: "pointer",
                            transition: "all 0.2s",
                          }}
                        >
                          Delivery
                        </button>
                      </div>
                    </div>

                    {/* Payment Choice - only show "Pay at Store" for pickup */}
                    <div>
                      <p style={{ 
                        fontSize: 12, 
                        fontWeight: 600, 
                        color: "#525252", 
                        textTransform: "uppercase", 
                        letterSpacing: "0.03em",
                        marginBottom: 8,
                      }}>
                        Payment
                      </p>
                      <div style={{ display: "flex", gap: 8 }}>
                        <button
                          type="button"
                          onClick={() => updateVendorOption(vendorId, "payment", "online")}
                          style={{
                            flex: 1,
                            padding: "12px 16px",
                            border: options.payment === "online" ? "2px solid #0a0a0a" : "1px solid #e5e5e5",
                            borderRadius: 10,
                            background: options.payment === "online" ? "#0a0a0a" : "#fff",
                            color: options.payment === "online" ? "#fff" : "#0a0a0a",
                            fontWeight: 500,
                            fontSize: 14,
                            cursor: "pointer",
                            transition: "all 0.2s",
                          }}
                        >
                          Pay Online
                        </button>
                        <button
                          type="button"
                          onClick={() => updateVendorOption(vendorId, "payment", "instore")}
                          disabled={options.fulfillment === "delivery"}
                          style={{
                            flex: 1,
                            padding: "12px 16px",
                            border: options.payment === "instore" ? "2px solid #0a0a0a" : "1px solid #e5e5e5",
                            borderRadius: 10,
                            background: options.payment === "instore" ? "#0a0a0a" : "#fff",
                            color: options.payment === "instore" ? "#fff" : options.fulfillment === "delivery" ? "#d4d4d4" : "#0a0a0a",
                            fontWeight: 500,
                            fontSize: 14,
                            cursor: options.fulfillment === "delivery" ? "not-allowed" : "pointer",
                            transition: "all 0.2s",
                            opacity: options.fulfillment === "delivery" ? 0.5 : 1,
                          }}
                        >
                          Pay at Store
                        </button>
                      </div>
                      {options.fulfillment === "delivery" && (
                        <p style={{ fontSize: 12, color: "#a3a3a3", marginTop: 8 }}>
                          Online payment required for delivery orders.
                        </p>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}

            {/* Actions */}
            <div style={{ display: "flex", gap: 12, marginTop: 24 }}>
              <button 
                type="button" 
                className="primaryBtn"
                style={{ flex: 1 }}
              >
                {paymentSummary.online > 0 
                  ? `Pay $${paymentSummary.online.toFixed(2)} Online`
                  : "Confirm Orders"
                }
              </button>
              <button 
                type="button" 
                className="secondaryBtn"
                onClick={clearCart}
              >
                Clear All
              </button>
            </div>
          </div>

          {/* Sidebar */}
          <div>
            <div className="sidebarCard" style={{ marginBottom: 16 }}>
              <h3 style={{ fontSize: 16, fontWeight: 600, marginBottom: 16 }}>Order Summary</h3>
              
              {vendorIds.map((vendorId) => {
                const { vendorName } = itemsByVendor[vendorId];
                const vendorTotal = getVendorTotal(vendorId);
                const options = vendorOptions[vendorId];
                
                return (
                  <div 
                    key={vendorId}
                    style={{ 
                      display: "flex", 
                      justifyContent: "space-between", 
                      marginBottom: 12,
                      paddingBottom: 12,
                      borderBottom: "1px solid #e5e5e5",
                    }}
                  >
                    <div>
                      <p style={{ fontWeight: 500, margin: 0, fontSize: 14 }}>{vendorName}</p>
                      <p style={{ fontSize: 12, color: "#a3a3a3", margin: "2px 0 0" }}>
                        {options?.fulfillment === "delivery" ? "Delivery" : "Pickup"} 
                        {" - "}
                        {options?.payment === "instore" ? "Pay at store" : "Pay online"}
                      </p>
                    </div>
                    <span style={{ fontWeight: 500 }}>${vendorTotal.toFixed(2)}</span>
                  </div>
                );
              })}

              <div style={{ marginTop: 16, paddingTop: 16, borderTop: "2px solid #0a0a0a" }}>
                {paymentSummary.online > 0 && (
                  <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 8 }}>
                    <span style={{ fontWeight: 500 }}>Pay online now</span>
                    <span style={{ fontWeight: 700 }}>${paymentSummary.online.toFixed(2)}</span>
                  </div>
                )}
                {paymentSummary.instore > 0 && (
                  <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 8 }}>
                    <span style={{ fontWeight: 500, color: "#525252" }}>Pay at store</span>
                    <span style={{ fontWeight: 600, color: "#525252" }}>${paymentSummary.instore.toFixed(2)}</span>
                  </div>
                )}
                <div style={{ 
                  display: "flex", 
                  justifyContent: "space-between", 
                  marginTop: 12,
                  paddingTop: 12,
                  borderTop: "1px solid #e5e5e5",
                }}>
                  <span style={{ fontWeight: 600 }}>Total</span>
                  <span style={{ fontWeight: 700, fontSize: 18 }}>${total.toFixed(2)}</span>
                </div>
              </div>
            </div>

            <div className="sidebarCard" style={{ background: "#fef9c3", borderColor: "#fde047" }}>
              <h4 style={{ fontSize: 14, fontWeight: 600, marginBottom: 8 }}>Pay at Store</h4>
              <p style={{ fontSize: 13, color: "#854d0e", lineHeight: 1.6, margin: 0 }}>
                Choose "Pay at Store" for pickup orders to pay when you collect your items. 
                The vendor will hold your order for up to 24 hours.
              </p>
            </div>
          </div>
        </div>
      )}

      <p style={{ marginTop: 24, fontSize: 13, color: "#a3a3a3", textAlign: "center" }}>
        Demo: Checkout functionality is for demonstration purposes.
      </p>
    </div>
  );
}
