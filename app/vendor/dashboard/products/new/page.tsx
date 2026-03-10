export default function NewProductPage() {
  return (
    <div className="mx-auto max-w-2xl rounded border border-slate-200 bg-white p-4">
      <h1 className="text-lg font-semibold text-slate-900">New product</h1>
      <p className="mt-1 text-sm text-slate-700">
        Upload stock, pricing, deals, images and nutritional info.
      </p>

      <form className="mt-4 grid gap-3 md:grid-cols-2">
        <div>
          <label className="mb-1 block text-sm font-medium text-slate-800">Product name</label>
          <input placeholder="e.g. Strawberries" />
        </div>
        <div>
          <label className="mb-1 block text-sm font-medium text-slate-800">Category</label>
          <select>
            <option value="">Select</option>
            <option value="fruit">Fruit</option>
            <option value="veg">Veg</option>
            <option value="meat">Meat</option>
            <option value="seafood">Seafood</option>
            <option value="deli">Deli</option>
            <option value="grocery">Grocery</option>
          </select>
        </div>

        <div>
          <label className="mb-1 block text-sm font-medium text-slate-800">Price</label>
          <input placeholder="e.g. 2.50" inputMode="decimal" />
        </div>
        <div>
          <label className="mb-1 block text-sm font-medium text-slate-800">Unit</label>
          <input placeholder="kg / each / punnet" />
        </div>

        <div>
          <label className="mb-1 block text-sm font-medium text-slate-800">Stock</label>
          <input placeholder="e.g. 24" inputMode="numeric" />
        </div>
        <div>
          <label className="mb-1 block text-sm font-medium text-slate-800">Deal (optional)</label>
          <input placeholder="e.g. Today only" />
        </div>

        <div className="md:col-span-2">
          <label className="mb-1 block text-sm font-medium text-slate-800">Image URL</label>
          <input placeholder="https://..." />
        </div>

        <div className="md:col-span-2">
          <label className="mb-1 block text-sm font-medium text-slate-800">Nutritional guide (optional)</label>
          <textarea rows={3} placeholder="Brief nutritional info" />
        </div>

        <div className="md:col-span-2 flex gap-2">
          <button className="flex-1 rounded bg-slate-900 px-3 py-2 text-sm text-white hover:bg-slate-800">
            Save product
          </button>
          <button className="rounded border border-slate-200 px-3 py-2 text-sm hover:bg-slate-50" type="reset">
            Reset
          </button>
        </div>
      </form>
    </div>
  );
}
