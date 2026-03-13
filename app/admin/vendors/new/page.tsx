"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { listCategories } from "../../../lib/vendors-shared";

export default function NewVendorPage() {
  const router = useRouter();
  const categories = listCategories().filter((c) => c.key !== "all");

  const [name, setName] = useState("");
  const [suburb, setSuburb] = useState("");
  const [postcode, setPostcode] = useState("");
  const [address, setAddress] = useState("");
  const [category, setCategory] = useState(categories[0]?.key ?? "fruit-veg");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [saving, setSaving] = useState(false);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setSaving(true);
    setError("");

    try {
      const res = await fetch("/api/admin/vendors", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name,
          suburb,
          postcode,
          address,
          category,
          description,
          image,
          phone,
          email,
          fulfillment: { pickup: true, delivery: false },
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
      <div className="pageHeader">
        <Link 
          href="/admin" 
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
          Back to Admin
        </Link>
        <h1 className="pageTitle">Create New Vendor</h1>
        <p className="pageSubtitle">
          Add a new vendor to the Local Pantry marketplace.
        </p>
      </div>

      <div className="twoColLayout">
        <div className="formCard">
          <form onSubmit={handleSubmit}>
            <div className="formSection">
              <h3 className="formSectionTitle">Basic Information</h3>
              <div className="formGrid">
                <div className="formGroup">
                  <label className="formLabel">Vendor Name</label>
                  <input
                    className="formInput"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="e.g. Fresh Fields Greengrocers"
                    required
                  />
                </div>
                <div className="formGroup">
                  <label className="formLabel">Category</label>
                  <select 
                    className="formSelect" 
                    value={category} 
                    onChange={(e) => setCategory(e.target.value)}
                  >
                    {categories.map((c) => (
                      <option key={c.key} value={c.key}>
                        {c.label}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
              <div className="formGroup" style={{ marginTop: 16 }}>
                <label className="formLabel">Description</label>
                <textarea
                  className="formTextarea"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Tell customers about this vendor..."
                  rows={4}
                />
              </div>
            </div>

            <div className="formSection">
              <h3 className="formSectionTitle">Location</h3>
              <div className="formGroup" style={{ marginBottom: 16 }}>
                <label className="formLabel">Street Address</label>
                <input
                  className="formInput"
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  placeholder="123 High Street"
                />
              </div>
              <div className="formGrid cols2">
                <div className="formGroup">
                  <label className="formLabel">Suburb</label>
                  <input
                    className="formInput"
                    value={suburb}
                    onChange={(e) => setSuburb(e.target.value)}
                    placeholder="e.g. Fitzroy"
                    required
                  />
                </div>
                <div className="formGroup">
                  <label className="formLabel">Postcode</label>
                  <input
                    className="formInput"
                    value={postcode}
                    onChange={(e) => setPostcode(e.target.value)}
                    placeholder="e.g. 3065"
                    required
                  />
                </div>
              </div>
            </div>

            <div className="formSection">
              <h3 className="formSectionTitle">Contact Details</h3>
              <div className="formGrid cols2">
                <div className="formGroup">
                  <label className="formLabel">Phone</label>
                  <input
                    className="formInput"
                    type="tel"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="03 9xxx xxxx"
                  />
                </div>
                <div className="formGroup">
                  <label className="formLabel">Email</label>
                  <input
                    className="formInput"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="hello@vendor.com"
                  />
                </div>
              </div>
            </div>

            <div className="formSection">
              <h3 className="formSectionTitle">Media</h3>
              <div className="formGroup">
                <label className="formLabel">Cover Image URL</label>
                <input
                  className="formInput"
                  value={image}
                  onChange={(e) => setImage(e.target.value)}
                  placeholder="https://..."
                />
                <p className="formHint">
                  Enter a URL for the vendor's cover image. Image uploads coming soon.
                </p>
              </div>
            </div>

            {error && (
              <p className="notice" style={{ marginBottom: 16 }}>{error}</p>
            )}

            <div className="formActions">
              <button type="submit" className="primaryBtn" disabled={saving}>
                {saving ? "Creating..." : "Create Vendor"}
              </button>
              <Link href="/admin" className="secondaryBtn">
                Cancel
              </Link>
            </div>
          </form>
        </div>

        <div className="sidebarCard">
          <h3>Tips for Success</h3>
          <p style={{ marginBottom: 16 }}>
            Complete vendor profiles attract more customers. Make sure to add:
          </p>
          <ul style={{ paddingLeft: 20, color: "#525252", fontSize: 14, lineHeight: 1.8 }}>
            <li>A compelling description</li>
            <li>High-quality cover image</li>
            <li>Accurate contact details</li>
            <li>Full address for map display</li>
          </ul>
          <div className="pillRow">
            <span className="pill green">Fresh</span>
            <span className="pill yellow">Local</span>
            <span className="pill orange">Quality</span>
          </div>
        </div>
      </div>
    </div>
  );
}
