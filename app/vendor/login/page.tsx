export default function VendorLoginPage() {
  return (
    <div className="mx-auto max-w-md space-y-6">
      <div className="rounded border border-slate-200 bg-white p-4">
        <h1 className="text-lg font-semibold text-slate-900">Vendor portal</h1>
        <p className="mt-1 text-sm text-slate-700">Log in to manage your store page, stock, pricing and deals.</p>
        <form className="mt-4 space-y-3">
          <div>
            <label className="mb-1 block text-sm font-medium text-slate-800">Email</label>
            <input type="email" placeholder="you@business.com" />
          </div>
          <div>
            <label className="mb-1 block text-sm font-medium text-slate-800">Password</label>
            <input type="password" placeholder="••••••••" />
          </div>
          <button className="w-full rounded bg-slate-900 px-3 py-2 text-sm text-white hover:bg-slate-800">
            Log in
          </button>
        </form>
      </div>
    </div>
  );
}
