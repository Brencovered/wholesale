"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { listCategories } from "../../../lib/vendors-shared";

export default function NewVendorPage() {
  const router = useRouter();
  const categories = listCategories().filter((c) => c.key !== "all");

  const [name, setName] = useState("");
  const [suburb, setSuburb] = useState("");
  const [postcode, setPostcode] = useState("");
  const [category, setCategory] = useState(categories[0]?.key ?? "fruit-veg");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState("");
  const [error, setError] = useState("");
  const [saving, setSaving] = useState(false);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setSaving(true);
    setError("");

    try {
      const res = await fetch("/api/admin/vendors", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name,
          suburb,
          postcode,
          category,
          description,
          image,
          products: [],
        }),
      });

      if (!res.ok) {
        const text = await res.text();
        throw new Error(text || "Failed to create vendor");
      }

      const created = await res.json();
      router.push(`/admin/vendors/${created.id}`);
    } catch (err) {
      console.error(err);
      setError("Could not create vendor");
    } finally {
      setSaving(false);
    }
  }

  return (
    <div className="page">
      <section className="section">
        <h2>Create vendor</h2>
        <p>Add a new vendor to the marketplace.</p>

        <div className="formCard" style={{ marginTop: 18 }}>
          <form onSubmit={handleSubmit} className="formGrid">
            <input
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Vendor name"
              required
            />

            <input
              value={suburb}
              onChange={(e) => setSuburb(e.target.value)}
              placeholder="Suburb"
              required
            />

            <input
              value={postcode}
              onChange={(e) => setPostcode(e.target.value)}
              placeholder="Postcode"
              required
            />

            <select value={category} onChange={(e) => setCategory(e.target.value)}>
              {categories.map((c) => (
                <option key={c.key} value={c.key}>
                  {c.label}
                </option>
              ))}
            </select>

            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Description"
              rows={4}
            />

            <input
              value={image}
              onChange={(e) => setImage(e.target.value)}
              placeholder="Image URL"
            />

            {error ? <p className="notice">{error}</p> : null}

            <div className="actions">
              <button type="submit" className="primaryBtn" disabled={saving}>
                {saving ? "Saving..." : "Create vendor"}
              </button>
            </div>
          </form>
        </div>
      </section>
    </div>
  );
}