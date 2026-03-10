import Link from "next/link";

export default function VendorDashboardPage() {
  return (
    <div className="space-y-6">
      <div className="rounded border border-slate-200 bg-white p-4">
        <h1 className="text-lg font-semibold text-slate-900">Dashboard</h1>
        <p className="mt-1 text-sm text-slate-700">
          Keep your store updated. Add stock, update pricing, upload images, and publish deals.
        </p>
        <div className="mt-3 flex gap-2">
          <Link href="/vendor/dashboard/products/new" className="rounded bg-slate-900 px-3 py-2 text-sm text-white hover:bg-slate-800">
            Add product
          </Link>
          <Link href="/vendor/dashboard/orders" className="rounded border border-slate-200 px-3 py-2 text-sm hover:bg-slate-50">
            View orders
          </Link>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <div className="rounded border border-slate-200 bg-white p-4">
          <h2 className="text-md font-semibold text-slate-900">Quick actions</h2>
          <ul className="mt-2 list-disc space-y-2 pl-5 text-sm text-slate-700">
            <li>Update daily specials</li>
            <li>Upload product images</li>
            <li>Publish nutrition guides</li>
          </ul>
        </div>
        <div className="rounded border border-slate-200 bg-white p-4">
          <h2 className="text-md font-semibold text-slate-900">Performance</h2>
          <p className="mt-2 text-sm text-slate-700">Placeholder analytics: views, searches, checkout starts.</p>
        </div>
      </div>
    </div>
  );
}
