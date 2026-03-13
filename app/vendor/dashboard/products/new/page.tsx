"use client";

import { useState } from "react";
import Link from "next/link";

export default function NewProductPage() {
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [unit, setUnit] = useState("");
  const [category, setCategory] = useState("veg");
  const [isDeal, setIsDeal] = useState(false);
  const [description, setDescription] = useState("");
  const [nutrition, setNutrition] = useState("");

  return (
    <div className="page">
      <div className="pageHeader">
        <Link 
          href="/vendor/dashboard" 
          style={{ 
            fontSize: 14, 
            color: "#525252", 
            display: "inline-flex", 
            alignItems: "center", 
            gap: 6,
            marginBottom: 16 
          }}
        >
          <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
            <path d="M19 12H5M12 19l-7-7 7-7"/>
          </svg>
          Back to Dashboard
        </Link>
        <h1 className="pageTitle">Add New Product</h1>
        <p className="pageSubtitle">
          Add stock, pricing, deals, and product details to your store.
        </p>
      </div>

      <div className="twoColLayout">
        <div className="formCard">
          <form action="/vendor/dashboard">
            <div className="formSection">
              <h3 className="formSectionTitle">Product Details</h3>
              <div className="formGroup" style={{ marginBottom: 16 }}>
                <label className="formLabel">Product Name</label>
                <input 
                  className="formInput" 
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="e.g. Seasonal Veg Box" 
                />
              </div>

              <div className="formGrid cols2">
                <div className="formGroup">
                  <label className="formLabel">Price ($)</label>
                  <input 
                    className="formInput" 
                    type="number" 
                    min="0" 
                    step="0.01" 
                    value={price}
                    onChange={(e) => setPrice(e.target.value)}
                    placeholder="35.00" 
                  />
                </div>
                <div className="formGroup">
                  <label className="formLabel">Unit</label>
                  <input 
                    className="formInput" 
                    value={unit}
                    onChange={(e) => setUnit(e.target.value)}
                    placeholder="box / kg / punnet" 
                  />
                </div>
              </div>

              <div className="formGroup" style={{ marginTop: 16 }}>
                <label className="formLabel">Category</label>
                <select 
                  className="formSelect"
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                >
                  <option value="fruit">Fruit</option>
                  <option value="veg">Vegetables</option>
                  <option value="meat">Meat</option>
                  <option value="seafood">Seafood</option>
                  <option value="deli">Deli</option>
                  <option value="grocery">Grocery</option>
                </select>
              </div>

              <div className="formGroup" style={{ marginTop: 16 }}>
                <label className="formLabel">Description</label>
                <textarea 
                  className="formTextarea" 
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Describe your product..."
                  rows={3}
                />
              </div>
            </div>

            <div className="formSection">
              <h3 className="formSectionTitle">Promotion</h3>
              <div style={{ 
                display: "flex", 
                alignItems: "center", 
                justifyContent: "space-between",
                padding: 16,
                background: isDeal ? "#dcfce7" : "#f5f5f5",
                borderRadius: 12,
                transition: "all 0.2s",
              }}>
                <div>
                  <p style={{ fontWeight: 600, marginBottom: 4 }}>Mark as Deal</p>
                  <p style={{ fontSize: 13, color: "#525252" }}>
                    Highlight this product as a special offer
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => setIsDeal(!isDeal)}
                  style={{
                    width: 52,
                    height: 28,
                    borderRadius: 14,
                    background: isDeal ? "#166534" : "#e5e5e5",
                    border: "none",
                    cursor: "pointer",
                    position: "relative",
                    transition: "all 0.2s",
                  }}
                >
                  <span style={{
                    position: "absolute",
                    top: 2,
                    left: isDeal ? 26 : 2,
                    width: 24,
                    height: 24,
                    borderRadius: 12,
                    background: "#fff",
                    transition: "all 0.2s",
                    boxShadow: "0 1px 3px rgba(0,0,0,0.2)",
                  }} />
                </button>
              </div>
            </div>

            <div className="formSection">
              <h3 className="formSectionTitle">Product Image</h3>
              <div style={{
                border: "2px dashed #e5e5e5",
                borderRadius: 12,
                padding: 32,
                textAlign: "center",
                background: "#fafafa",
              }}>
                <svg 
                  width="48" 
                  height="48" 
                  fill="none" 
                  stroke="#a3a3a3" 
                  strokeWidth="1.5" 
                  viewBox="0 0 24 24"
                  style={{ margin: "0 auto 12px" }}
                >
                  <path d="M2.25 15.75l5.159-5.159a2.25 2.25 0 013.182 0l5.159 5.159m-1.5-1.5l1.409-1.409a2.25 2.25 0 013.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 001.5-1.5V6a1.5 1.5 0 00-1.5-1.5H3.75A1.5 1.5 0 002.25 6v12a1.5 1.5 0 001.5 1.5zm10.5-11.25h.008v.008h-.008V8.25zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z" />
                </svg>
                <p style={{ fontWeight: 600, marginBottom: 4 }}>Upload product image</p>
                <p style={{ fontSize: 13, color: "#a3a3a3" }}>
                  PNG, JPG up to 5MB
                </p>
                <input type="file" style={{ display: "none" }} id="imageUpload" />
                <label 
                  htmlFor="imageUpload" 
                  className="secondaryBtn"
                  style={{ marginTop: 16, cursor: "pointer" }}
                >
                  Choose File
                </label>
              </div>
              <p className="formHint" style={{ marginTop: 8 }}>
                MVP: File uploads are mocked for demo purposes.
              </p>
            </div>

            <div className="formSection">
              <h3 className="formSectionTitle">Nutrition Information</h3>
              <div className="formGroup">
                <label className="formLabel">Nutrition Guide (Optional)</label>
                <textarea 
                  className="formTextarea" 
                  value={nutrition}
                  onChange={(e) => setNutrition(e.target.value)}
                  placeholder="Good source of vitamins A, C, and K..."
                  rows={3}
                />
              </div>
            </div>

            <div className="formActions">
              <button type="submit" className="primaryBtn">
                Save Product
              </button>
              <Link href="/vendor/dashboard" className="secondaryBtn">
                Cancel
              </Link>
            </div>
          </form>
        </div>

        <div>
          <div className="sidebarCard">
            <h3>Tips for Better Listings</h3>
            <ul style={{ paddingLeft: 20, color: "#525252", fontSize: 14, lineHeight: 1.8, marginTop: 12 }}>
              <li>Use clear, descriptive product names</li>
              <li>Add high-quality images</li>
              <li>Include weight/size in the unit field</li>
              <li>Highlight special deals to attract customers</li>
            </ul>
          </div>

          <div className="sidebarCard" style={{ marginTop: 16 }}>
            <h3>Product Tags</h3>
            <p style={{ fontSize: 14, color: "#525252", marginTop: 8, lineHeight: 1.6 }}>
              Products can be tagged to help customers find what they're looking for.
            </p>
            <div className="pillRow">
              <span className="pill green">Fresh</span>
              <span className="pill yellow">Local</span>
              <span className="pill orange">Deal</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
