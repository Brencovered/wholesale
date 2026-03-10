import Link from "next/link";
import { findVendor } from "../../lib/vendors";

export default function VendorStore({ params }: { params: { vendorId: string } }) {
  const vendor = findVendor(params.vendorId);

  if (!vendor) {
    return (
      <div className="rounded border border-slate-200 bg-white p-4">
        <h1 className="text-lg font-semibold text-slate-900">Vendor not found</h1>
        <p className="mt-2 text-sm text-slate-700">Check the URL and try again.</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <header className="rounded border border-slate-200 bg-white overflow-hidden">
        {vendor.heroImageUrl ? (
          <div className="h-40 w-full bg-cover bg-center" style={{ backgroundImage: `url(${vendor.heroImageUrl})` }} />
        ) : null}
        <div className="p-4">
          <h1 className="text-2xl font-semibold text-slate-900">{vendor.name}</h1>
          <p className="text-sm text-slate-600">
            {vendor.suburb} ({vendor.postcode}) • {vendor.categories.join(", ")}
          </p>
          <p className="mt-2 text-sm text-slate-700 leading-relaxed">{vendor.blurb}</p>
          <div className="mt-3 flex gap-2 text-xs">
            {vendor.pickup ? <span className="rounded bg-slate-100 px-2 py-1 text-slate-700">Pickup</span> : null}
            {vendor.delivery ? <span className="rounded bg-slate-100 px-2 py-1 text-slate-700">Vendor delivery</span> : null}
          </div>
        </div>
      </header>

      <section>
        <div className="flex items-end justify-between mb-3">
          <h2 className="text-md font-semibold text-slate-900">Stock & pricing</h2>
          <Link href={`/checkout?vendorId=${vendor.id}`} className="text-sm text-slate-900 underline">
            Start checkout
          </Link>
        </div>

        <div className="grid gap-4 md:grid-cols-2">
          {vendor.products.map((p) => (
            <article key={p.id} className="rounded border border-slate-200 bg-white">
              {p.imageUrl ? (
                <div className="h-24 w-full bg-cover bg-center" style={{ backgroundImage: `url(${p.imageUrl})` }} />
              ) : null}
              <div className="p-4 space-y-2">
                <div className="flex items-start justify-between">
                  <div>
                    <h3 className="text-sm font-semibold text-slate-900">{p.name}</h3>
                    <p className="text-xs text-slate-600">{p.category.toUpperCase()}</p>
                  </div>
                  <div className="text-sm font-semibold text-slate-900">
                    ${p.price} <span className="text-xs font-normal text-slate-600">/ {p.unit}</span>
                  </div>
                </div>
                <p className="text-sm text-slate-700 leading-relaxed">Stock: {p.stock}</p>
                {p.deal ? <p className="text-xs text-slate-600">Deal: {p.deal}</p> : null}
                {p.nutrition ? <p className="text-xs text-slate-600">Nutrition: {p.nutrition}</p> : null}
                <button className="mt-2 w-full rounded bg-slate-900 px-3 py-2 text-sm text-white hover:bg-slate-800">
                  Add to cart
                </button>
              </div>
            </article>
          ))}
        </div>
      </section>
    </div>
  );
}
