"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { listCategories } from "../lib/vendors-shared";

export default function SearchForm() {
  const router = useRouter();
  const categories = listCategories();

  const [postcode, setPostcode] = useState("");
  const [category, setCategory] = useState("all");

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    const params = new URLSearchParams();

    if (postcode.trim()) {
      params.set("postcode", postcode.trim());
    }

    if (category) {
      params.set("category", category);
    }

    router.push(`/search?${params.toString()}`);
  }

  return (
    <form onSubmit={handleSubmit} className="searchForm">
      <label>
        Postcode
        <input
          inputMode="numeric"
          pattern="\d{4}"
          placeholder="e.g., 3168"
          autoComplete="postal-code"
          value={postcode}
          onChange={(e) => setPostcode(e.target.value)}
        />
      </label>

      <div className="searchRow">
        <div className="field">
          <label>
            Category
            <select value={category} onChange={(e) => setCategory(e.target.value)}>
              {categories.map((option) => (
                <option key={option.key} value={option.key}>
                  {option.label}
                </option>
              ))}
            </select>
          </label>
        </div>

        <button type="submit" className="searchBtn">
          Search
        </button>
      </div>
    </form>
  );
}