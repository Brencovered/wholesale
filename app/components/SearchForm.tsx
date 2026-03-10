'use client';

import { listCategories } from '../lib/vendors';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

export default function SearchForm({ initialPostcode = '', initialCategory = '' }: { initialPostcode?: string; initialCategory?: string; }) {
  const router = useRouter();
  const [postcode, setPostcode] = useState(initialPostcode);
  const [category, setCategory] = useState(initialCategory);

  const categories = listCategories();

  useEffect(() => {
    setPostcode(initialPostcode);
    setCategory(initialCategory);
  }, [initialPostcode, initialCategory]);

  function submit(e: React.FormEvent) {
    e.preventDefault();
    const params = new URLSearchParams();
    if (postcode) params.set('postcode', postcode);
    if (category) params.set('category', category);
    router.push(`/search?${params.toString()}`);
  }

  return (
    <form onSubmit={submit} className="grid gap-3 md:grid-cols-3">
      <div className="md:col-span-1">
        <label className="mb-1 block text-sm font-medium text-slate-800">Postcode</label>
        <input
          value={postcode}
          onChange={(e) => setPostcode(e.target.value)}
          placeholder="e.g. 3195"
          inputMode="numeric"
          maxLength={4}
        />
      </div>
      <div className="md:col-span-1">
        <label className="mb-1 block text-sm font-medium text-slate-800">Category</label>
        <select value={category} onChange={(e) => setCategory(e.target.value)}>
          <option value="">Any</option>
          {categories.map((c) => (
            <option key={c.key} value={c.key}>
              {c.label}
            </option>
          ))}
        </select>
      </div>
      <div className="md:col-span-1 flex items-end">
        <button type="submit" className="w-full bg-slate-900 text-white hover:bg-slate-800">
          Search
        </button>
      </div>
    </form>
  );
}
