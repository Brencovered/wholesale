"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import type { Vendor, Product } from "../../lib/vendors-shared";
import { useCart } from "../../components/CartProvider";

export default function VendorPage() {
  const params = useParams<{ vendorId: string }>();
  const vendorId = params.vendorId;
  const { addItem } = useCart();

  const [vendor, setVendor] = useState<Vendor | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");

  useEffect(() => {
    async function loadVendor() {
      try {
        setLoading(true);
        setError("");
        const res = await fetch(`/api/vendors/${vendorId}`);
        if (!res.ok) throw new Error("Vendor not found");
        const data = await res.json();
        setVendor({
          ...data,
          products: Array.isArray(data.products) ? data.products : [],
        });
      } catch (err) {
        console.error(err);
        setError("Could not load vendor.");
      } finally {
        setLoading(false);
      }
    }
    if (vendorId) loadVendor();
  }, [vendorId]);

  function handleAddToBasket(product: Product) {
    addItem({
      productId: product.id,
      name: product.name,
      price: Number(product.price) || 0,
      vendorId,
    });
    setMessage(`${product.name} added to basket`);
    setTimeout(() => setMessage(""), 2000);
  }

  if (loading) {
    return (
      <div className="page">
        <div className="emptyState">
          <p>Loading vendor...</p>
        </div>
      </div>
    );
  }

  if (error || !vendor) {
    return (
      <div className="page">
        <div className="emptyState">
          <h3>Vendor not found</h3>
          <p>{error || "This vendor doesn't exist or has been removed."}</p>
          <Link href="/search" className="primaryBtn" style={{ marginTop: 16 }}>
            Browse Vendors
          </Link>
        </div>
      </div>
    );
  }

  const deals = vendor.products.filter((p) => p.isDeal);
  const regularProducts = vendor.products.filter((p) => !p.isDeal);

  return (
    <div className="page">
      {/* Hero Section */}
      <div style={{
        position: "relative",
        borderRadius: 20,
        overflow: "hidden",
        marginBottom: 32,
        background: "linear-gradient(135deg, #fafafa 0%, #f0f0f0 100%)",
      }}>
        {vendor.image && (
          <img 
            src={vendor.image} 
            alt={vendor.name}
            style={{
              width: "100%",
              height: 280,
              objectFit: "cover",
            }}
          />
        )}
        <div style={{
          padding: 24,
          background: "#fff",
          borderTop: vendor.image ? "1px solid #e5e5e5" : "none",
        }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", flexWrap: "wrap", gap: 16 }}>
            <div>
              <h1 style={{ fontSize: 28, fontWeight: 700, marginBottom: 8 }}>{vendor.name}</h1>
              <p style={{ color: "#525252", marginBottom: 8 }}>
                {vendor.suburb}, {vendor.postcode}
              </p>
              <span style={{
                display: "inline-block",
                padding: "6px 14px",
                background: "#f5f5f5",
                borderRadius: 100,
                fontSize: 13,
                fontWeight: 600,
                color: "#525252",
              }}>
                {vendor.category}
              </span>
            </div>
            <div style={{ display: "flex", gap: 8 }}>
              {vendor.fulfillment?.pickup && (
                <span className="pill green">Pickup Available</span>
              )}
              {vendor.fulfillment?.delivery && (
                <span className="pill">
                  Delivery {vendor.fulfillment.deliveryRadiusKm ? `(${vendor.fulfillment.deliveryRadiusKm}km)` : ""}
                </span>
              )}
            </div>
          </div>
          {vendor.description && (
            <p style={{ marginTop: 16, color: "#525252", lineHeight: 1.6 }}>
              {vendor.description}
            </p>
          )}
        </div>
      </div>

      {/* Toast Message */}
      {message && (
        <div style={{
          position: "fixed",
          bottom: 24,
          left: "50%",
          transform: "translateX(-50%)",
          background: "#0a0a0a",
          color: "#fff",
          padding: "12px 24px",
          borderRadius: 100,
          fontSize: 14,
          fontWeight: 600,
          zIndex: 1000,
          boxShadow: "0 4px 20px rgba(0,0,0,0.2)",
        }}>
          {message}
        </div>
      )}

      {/* Deals Section */}
      {deals.length > 0 && (
        <div className="section" style={{ marginBottom: 24 }}>
          <h2 style={{ marginBottom: 4 }}>Today's Deals</h2>
          <p>Special offers and promotions</p>
          <div className="productGrid" style={{ marginTop: 20 }}>
            {deals.map((product) => (
              <ProductCard 
                key={product.id} 
                product={product} 
                onAdd={() => handleAddToBasket(product)}
                isDeal
              />
            ))}
          </div>
        </div>
      )}

      {/* All Products */}
      <div className="section">
        <h2 style={{ marginBottom: 4 }}>Products</h2>
        <p>{vendor.products.length} items available</p>

        {vendor.products.length === 0 ? (
          <div className="emptyState" style={{ marginTop: 20 }}>
            <h3>No products yet</h3>
            <p>This vendor hasn't added any products.</p>
          </div>
        ) : (
          <div className="productGrid" style={{ marginTop: 20 }}>
            {(deals.length > 0 ? regularProducts : vendor.products).map((product) => (
              <ProductCard 
                key={product.id} 
                product={product} 
                onAdd={() => handleAddToBasket(product)}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

function ProductCard({ 
  product, 
  onAdd, 
  isDeal = false 
}: { 
  product: Product; 
  onAdd: () => void;
  isDeal?: boolean;
}) {
  return (
    <article className="productCard" style={{
      display: "flex",
      flexDirection: "column",
      border: isDeal ? "2px solid #166534" : undefined,
    }}>
      {product.image ? (
        <img
          src={product.image}
          alt={product.name}
          onError={(e) => {
            e.currentTarget.style.display = "none";
          }}
        />
      ) : (
        <div style={{
          width: "100%",
          height: 180,
          background: "linear-gradient(135deg, #f5f5f5 0%, #e5e5e5 100%)",
          borderRadius: 12,
          marginBottom: 16,
        }} />
      )}

      <div style={{ flex: 1 }}>
        {isDeal && (
          <span className="pill orange" style={{ marginBottom: 8 }}>Deal</span>
        )}
        <h3 style={{ fontSize: 16, fontWeight: 600, marginBottom: 4 }}>
          {product.name}
        </h3>
        <p style={{ fontSize: 13, color: "#a3a3a3", marginBottom: 8 }}>
          {product.category}
        </p>
        {product.description && (
          <p style={{ fontSize: 14, color: "#525252", marginBottom: 12, lineHeight: 1.5 }}>
            {product.description}
          </p>
        )}
      </div>

      <div style={{ 
        display: "flex", 
        justifyContent: "space-between", 
        alignItems: "center",
        marginTop: "auto",
        paddingTop: 12,
        borderTop: "1px solid #f0f0f0"
      }}>
        <span style={{ fontSize: 20, fontWeight: 700 }}>
          ${Number(product.price).toFixed(2)}
        </span>
        <button
          type="button"
          className="primaryBtn"
          onClick={onAdd}
          style={{ height: 40, padding: "0 16px", fontSize: 14 }}
        >
          Add to Basket
        </button>
      </div>
    </article>
  );
}
