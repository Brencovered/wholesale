"use client";

import { useState } from "react";
import Link from "next/link";

export default function VendorSignupPage() {
  const [step, setStep] = useState<"plan" | "details" | "payment">("plan");
  const [agreed, setAgreed] = useState(false);

  return (
    <div className="page">
      {/* Progress Steps */}
      <div style={{ 
        display: "flex", 
        justifyContent: "center", 
        gap: 8,
        marginBottom: 40,
      }}>
        {["Select Plan", "Business Details", "Payment"].map((label, index) => {
          const stepKey = ["plan", "details", "payment"][index] as typeof step;
          const isActive = step === stepKey;
          const isPast = 
            (step === "details" && index === 0) || 
            (step === "payment" && index < 2);
          
          return (
            <div 
              key={label}
              style={{ 
                display: "flex", 
                alignItems: "center", 
                gap: 8,
              }}
            >
              <div style={{
                width: 28,
                height: 28,
                borderRadius: "50%",
                background: isActive ? "#0a0a0a" : isPast ? "#22c55e" : "#e5e5e5",
                color: isActive || isPast ? "#fff" : "#a3a3a3",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: 13,
                fontWeight: 600,
              }}>
                {isPast ? (
                  <svg width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                    <path d="M5 13l4 4L19 7" />
                  </svg>
                ) : (
                  index + 1
                )}
              </div>
              <span style={{ 
                fontSize: 13, 
                fontWeight: isActive ? 600 : 400,
                color: isActive ? "#0a0a0a" : "#a3a3a3",
              }}>
                {label}
              </span>
              {index < 2 && (
                <div style={{ 
                  width: 40, 
                  height: 1, 
                  background: isPast ? "#22c55e" : "#e5e5e5",
                  marginLeft: 8,
                }} />
              )}
            </div>
          );
        })}
      </div>

      {/* Step 1: Plan Selection */}
      {step === "plan" && (
        <div style={{ maxWidth: 800, margin: "0 auto" }}>
          <div style={{ textAlign: "center", marginBottom: 40 }}>
            <h1 style={{ fontSize: 32, fontWeight: 700, marginBottom: 12 }}>
              Join Local Pantry
            </h1>
            <p style={{ fontSize: 16, color: "#525252", maxWidth: 500, margin: "0 auto" }}>
              Get discovered by local customers looking for fresh, quality food from independent vendors.
            </p>
          </div>

          {/* Pricing Card */}
          <div style={{ 
            background: "#fff", 
            border: "2px solid #0a0a0a", 
            borderRadius: 20,
            padding: 40,
            maxWidth: 440,
            margin: "0 auto",
          }}>
            <div style={{ 
              display: "inline-block",
              background: "#fef9c3",
              color: "#854d0e",
              fontSize: 12,
              fontWeight: 600,
              padding: "4px 12px",
              borderRadius: 100,
              marginBottom: 16,
            }}>
              VENDOR SUBSCRIPTION
            </div>
            
            <div style={{ marginBottom: 24 }}>
              <span style={{ fontSize: 48, fontWeight: 700 }}>$14.99</span>
              <span style={{ fontSize: 18, color: "#525252" }}>/month</span>
            </div>

            <p style={{ color: "#525252", marginBottom: 24, lineHeight: 1.6 }}>
              Everything you need to reach local customers and grow your business online.
            </p>

            <ul style={{ listStyle: "none", padding: 0, margin: "0 0 32px" }}>
              {[
                "Beautiful online storefront",
                "Product catalog with photos",
                "Specials & promotions",
                "Order management",
                "Pickup & delivery options",
                "Customer messaging",
                "Analytics dashboard",
                "No commission fees",
              ].map((feature) => (
                <li 
                  key={feature}
                  style={{ 
                    display: "flex", 
                    alignItems: "center", 
                    gap: 12,
                    padding: "10px 0",
                    borderBottom: "1px solid #f5f5f5",
                  }}
                >
                  <svg width="20" height="20" fill="none" stroke="#22c55e" strokeWidth="2.5" viewBox="0 0 24 24">
                    <path d="M5 13l4 4L19 7" />
                  </svg>
                  <span style={{ fontSize: 15 }}>{feature}</span>
                </li>
              ))}
            </ul>

            <button 
              type="button"
              className="primaryBtn"
              onClick={() => setStep("details")}
              style={{ width: "100%", padding: "16px 24px", fontSize: 16 }}
            >
              Get Started
            </button>

            <p style={{ fontSize: 13, color: "#a3a3a3", textAlign: "center", marginTop: 16 }}>
              Cancel anytime. 14-day free trial included.
            </p>
          </div>

          <p style={{ textAlign: "center", marginTop: 24 }}>
            <Link href="/vendor/login" style={{ color: "#525252", fontSize: 14 }}>
              Already have an account? Sign in
            </Link>
          </p>
        </div>
      )}

      {/* Step 2: Business Details */}
      {step === "details" && (
        <div style={{ maxWidth: 560, margin: "0 auto" }}>
          <div className="formCard">
            <h2 style={{ fontSize: 24, fontWeight: 700, marginBottom: 8 }}>
              Tell us about your business
            </h2>
            <p style={{ color: "#525252", marginBottom: 32 }}>
              We'll use this to set up your storefront.
            </p>

            <div className="formSection">
              <h3 className="formSectionTitle">Business Information</h3>
              <div className="formGrid cols2">
                <div className="formGroup" style={{ gridColumn: "span 2" }}>
                  <label className="formLabel">Business Name</label>
                  <input className="formInput" type="text" placeholder="e.g. Smith's Fresh Produce" />
                </div>
                <div className="formGroup">
                  <label className="formLabel">Category</label>
                  <select className="formSelect">
                    <option value="">Select category...</option>
                    <option value="fruit-veg">Fruit & Veg</option>
                    <option value="meat">Butcher / Meat</option>
                    <option value="seafood">Seafood</option>
                    <option value="bakery">Bakery</option>
                    <option value="dairy">Dairy</option>
                    <option value="deli">Deli</option>
                    <option value="specialty">Specialty Foods</option>
                    <option value="mixed">Mixed Groceries</option>
                  </select>
                </div>
                <div className="formGroup">
                  <label className="formLabel">ABN (Optional)</label>
                  <input className="formInput" type="text" placeholder="XX XXX XXX XXX" />
                </div>
                <div className="formGroup" style={{ gridColumn: "span 2" }}>
                  <label className="formLabel">Description</label>
                  <textarea 
                    className="formTextarea" 
                    placeholder="Tell customers what makes your business special..."
                    rows={3}
                  />
                </div>
              </div>
            </div>

            <div className="formSection">
              <h3 className="formSectionTitle">Location</h3>
              <div className="formGrid cols2">
                <div className="formGroup" style={{ gridColumn: "span 2" }}>
                  <label className="formLabel">Street Address</label>
                  <input className="formInput" type="text" placeholder="123 High Street" />
                </div>
                <div className="formGroup">
                  <label className="formLabel">Suburb</label>
                  <input className="formInput" type="text" placeholder="e.g. Richmond" />
                </div>
                <div className="formGroup">
                  <label className="formLabel">Postcode</label>
                  <input className="formInput" type="text" placeholder="e.g. 3121" />
                </div>
              </div>
            </div>

            <div className="formSection" style={{ borderBottom: "none", paddingBottom: 0 }}>
              <h3 className="formSectionTitle">Contact Details</h3>
              <div className="formGrid cols2">
                <div className="formGroup">
                  <label className="formLabel">Contact Name</label>
                  <input className="formInput" type="text" placeholder="Your name" />
                </div>
                <div className="formGroup">
                  <label className="formLabel">Phone</label>
                  <input className="formInput" type="tel" placeholder="04XX XXX XXX" />
                </div>
                <div className="formGroup" style={{ gridColumn: "span 2" }}>
                  <label className="formLabel">Email</label>
                  <input className="formInput" type="email" placeholder="you@yourbusiness.com" />
                </div>
              </div>
            </div>

            <div className="formActions" style={{ marginTop: 32 }}>
              <button 
                type="button" 
                className="secondaryBtn"
                onClick={() => setStep("plan")}
              >
                Back
              </button>
              <button 
                type="button" 
                className="primaryBtn"
                onClick={() => setStep("payment")}
                style={{ flex: 1 }}
              >
                Continue to Payment
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Step 3: Payment */}
      {step === "payment" && (
        <div style={{ maxWidth: 560, margin: "0 auto" }}>
          <div className="formCard">
            <h2 style={{ fontSize: 24, fontWeight: 700, marginBottom: 8 }}>
              Start your subscription
            </h2>
            <p style={{ color: "#525252", marginBottom: 32 }}>
              Your 14-day free trial starts today. You won't be charged until it ends.
            </p>

            {/* Order Summary */}
            <div style={{ 
              background: "#fafafa", 
              borderRadius: 12, 
              padding: 20,
              marginBottom: 32,
            }}>
              <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 8 }}>
                <span>Vendor Subscription</span>
                <span style={{ fontWeight: 600 }}>$14.99/mo</span>
              </div>
              <div style={{ display: "flex", justifyContent: "space-between", color: "#22c55e" }}>
                <span>14-day free trial</span>
                <span style={{ fontWeight: 600 }}>-$14.99</span>
              </div>
              <div style={{ 
                display: "flex", 
                justifyContent: "space-between", 
                marginTop: 16,
                paddingTop: 16,
                borderTop: "1px solid #e5e5e5",
                fontWeight: 600,
              }}>
                <span>Due today</span>
                <span>$0.00</span>
              </div>
            </div>

            <div className="formSection">
              <h3 className="formSectionTitle">Payment Method</h3>
              <div className="formGrid">
                <div className="formGroup">
                  <label className="formLabel">Card Number</label>
                  <input className="formInput" type="text" placeholder="1234 5678 9012 3456" />
                </div>
                <div className="formGrid cols2">
                  <div className="formGroup">
                    <label className="formLabel">Expiry</label>
                    <input className="formInput" type="text" placeholder="MM/YY" />
                  </div>
                  <div className="formGroup">
                    <label className="formLabel">CVC</label>
                    <input className="formInput" type="text" placeholder="123" />
                  </div>
                </div>
                <div className="formGroup">
                  <label className="formLabel">Name on Card</label>
                  <input className="formInput" type="text" placeholder="J. Smith" />
                </div>
              </div>
            </div>

            <div className="formSection" style={{ borderBottom: "none", paddingBottom: 0 }}>
              <h3 className="formSectionTitle">Create Account</h3>
              <div className="formGrid">
                <div className="formGroup">
                  <label className="formLabel">Password</label>
                  <input className="formInput" type="password" placeholder="Create a secure password" />
                  <p className="formHint">At least 8 characters</p>
                </div>
                <div className="formGroup">
                  <label className="formLabel">Confirm Password</label>
                  <input className="formInput" type="password" placeholder="Confirm your password" />
                </div>
              </div>
            </div>

            {/* Terms */}
            <label style={{ 
              display: "flex", 
              alignItems: "flex-start", 
              gap: 12,
              marginTop: 24,
              cursor: "pointer",
            }}>
              <input 
                type="checkbox" 
                checked={agreed}
                onChange={(e) => setAgreed(e.target.checked)}
                style={{ 
                  width: 20, 
                  height: 20, 
                  marginTop: 2,
                  accentColor: "#0a0a0a",
                }} 
              />
              <span style={{ fontSize: 14, color: "#525252", lineHeight: 1.5 }}>
                I agree to the{" "}
                <a href="#" style={{ color: "#0a0a0a", textDecoration: "underline" }}>Terms of Service</a>
                {" "}and{" "}
                <a href="#" style={{ color: "#0a0a0a", textDecoration: "underline" }}>Privacy Policy</a>.
                I understand that my subscription will automatically renew at $14.99/month after the free trial.
              </span>
            </label>

            <div className="formActions" style={{ marginTop: 32 }}>
              <button 
                type="button" 
                className="secondaryBtn"
                onClick={() => setStep("details")}
              >
                Back
              </button>
              <Link 
                href="/vendor/dashboard"
                className="primaryBtn"
                style={{ 
                  flex: 1, 
                  textAlign: "center",
                  opacity: agreed ? 1 : 0.5,
                  pointerEvents: agreed ? "auto" : "none",
                }}
              >
                Start Free Trial
              </Link>
            </div>

            <p style={{ 
              fontSize: 13, 
              color: "#a3a3a3", 
              textAlign: "center", 
              marginTop: 24,
              lineHeight: 1.6,
            }}>
              Your card will be charged $14.99 on the 15th day. Cancel anytime before then to avoid charges.
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
