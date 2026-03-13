"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import type { Vendor } from "../../lib/vendors-shared";
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

        if (!res.ok) {
          throw new Error("Vendor not found");
        }

        const data = await res.json();
        setVendor(data);
      } catch (err) {
        console.error(err);
        setError("Could not load vendor.");
      } finally {
        setLoading(false);
      }
    }

    if (vendorId) {
      loadVendor();
    }
  }, [vendorId]);

  function handleAddToBasket(product: Vendor["products"][number]) {
    addItem({
      productId: product.id,
      name: product.name,
      price: Number(product.price) || 0,
      vendorId,
    });

    setMessage(`${product.name} added to basket`);

    window.setTimeout(() => {
      setMessage("");
    }, 1800);
  }

  if (loading) {
    return (
      <div className="page">
        <section className="section">
          <h2>Vendor</h2>
          <p>Loading...</p>
        </section>
      </div>
    );
  }

  if (error || !vendor) {
    return (
      <div className="page">
        <section className="section">
          <h2>Vendor</h2>
          <p className="notice">{error || "Vendor not found."}</p>
        </section>
      </div>
    );
  }

  return (
    <div className="page">
      <section className="section">
        <h2>{vendor.name}</h2>
        <p>
          {vendor.suburb}, {vendor.postcode}
        </p>
        <p style={{ marginTop: 10 }}>{vendor.category}</p>
        {vendor.description ? <p style={{ marginTop: 10 }}>{vendor.description}</p> : null}
        {message ? <p style={{ marginTop: 14 }}>{message}</p> : null}
      </section>

      <section className="section">
        <h2>Products</h2>

        {vendor.products.length === 0 ? (
          <p>No products added yet.</p>
        ) : (
          <div className="productGrid" style={{ marginTop: 18 }}>
            {vendor.products.map((product) => (
              <article key={product.id} className="productCard">
                {product.image ? (
                  <img
                    src={product.image}
                    alt={product.name}
                    onError={(e) => {
                      e.currentTarget.style.display = "none";
                    }}
                  />
                ) : null}

                <h3 style={{ marginBottom: 8 }}>{product.name}</h3>
                <p style={{ marginBottom: 8 }}>{product.category}</p>
                {product.description ? (
                  <p style={{ marginBottom: 8 }}>{product.description}</p>
                ) : null}
                <p style={{ fontWeight: 800, fontSize: 18, marginBottom: 12 }}>
                  ${Number(product.price).toFixed(2)}
                </p>

                <button
                  type="button"
                  className="primaryBtn"
                  onClick={() => handleAddToBasket(product)}
                >
                  Add to basket
                </button>
              </article>
            ))}
          </div>
        )}
      </section>
    </div>
  );
}