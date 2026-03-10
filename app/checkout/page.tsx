import { findVendor } from "../lib/vendors";

export default function CheckoutPage({
  searchParams,
}: {
  searchParams?: { vendorId?: string };
}) {
  const vendorId = searchParams?.vendorId || "";
  const vendor = vendorId ? findVendor(vendorId) : undefined;

  return (
    <div className="space-y-6">
      <div className="rounded border border-slate-200 bg-white p-4">
        <h1 className="text-lg font-semibold text-slate-900">Checkout</h1>
        <p className="mt-2 text-sm text-slate-700">
          Fill in your details and choose pickup or delivery (if the vendor offers it).
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <form className="rounded border border-slate-200 bg-white p-4 space-y-3">
          <h2 className="text-sm font-semibold text-slate-900">Customer details</h2>
          <div>
            <label className="mb-1 block text-sm font-medium text-slate-800">Full name</label>
            <input placeholder="Your name" />
          </div>
          <div>
            <label className="mb-1 block text-sm font-medium text-slate-800">Email</label>
            <input type="email" placeholder="you@email.com" />
          </div>
          <div>
            <label className="mb-1 block text-sm font-medium text-slate-800">Phone</label>
            <input placeholder="Mobile" />
          </div>

          <h2 className="pt-2 text-sm font-semibold text-slate-900">Pickup or delivery</h2>
          <div className="rounded border border-slate-200 bg-slate-50 p-3 text-sm text-slate-700">
            {vendor ? (
              <>
                {vendor.pickup ? <div>Pickup available.</div> : <div>Pickup not available.</div>}
                {vendor.delivery ? <div>Vendor delivery available.</div> : <div>Vendor delivery not available.</div>}
              </>
            ) : (
              <>
                Choose a vendor first from the search page.
              </>
            )}
          </div>

          <div>
            <label className="mb-1 block text-sm font-medium text-slate-800">Preferred time window</label>
            <input placeholder="Today 4–6pm" />
          </div>

          <h2 className="pt-2 text-sm font-semibold text-slate-900">Delivery address (if delivery)</h2>
          <div>
            <label className="mb-1 block text-sm font-medium text-slate-800">Street address</label>
            <input placeholder="Unit / street" />
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="mb-1 block text-sm font-medium text-slate-800">Suburb</label>
              <input placeholder="Suburb" />
            </div>
            <div>
              <label className="mb-1 block text-sm font-medium text-slate-800">Postcode</label>
              <input placeholder="Postcode" inputMode="numeric" maxLength={4} />
            </div>
          </div>

          <button className="w-full rounded bg-slate-900 px-3 py-2 text-sm text-white hover:bg-slate-800">
            Submit order
          </button>
        </form>

        <section className="rounded border border-slate-200 bg-white p-4">
          <h2 className="text-sm font-semibold text-slate-900">Order summary</h2>
          <div className="mt-2 rounded border border-slate-200 bg-slate-50 p-3 text-sm text-slate-700">
            {vendor ? (
              <>
                <div className="font-semibold text-slate-900">{vendor.name}</div>
                <div className="mt-1 text-xs text-slate-600">Example items</div>
                <ul className="mt-2 list-disc pl-5 text-sm text-slate-700">
                  {vendor.products.slice(0, 2).map((p) => (
                    <li key={p.id}>
                      {p.name} – ${p.price}/{p.unit}
                    </li>
                  ))}
                </ul>
                <div className="mt-3 text-xs text-slate-600">
                  Note: Cart/inventory is mocked in this scaffold.
                </div>
              </>
            ) : (
              <div>Select a vendor first.</div>
            )}
          </div>
        </section>
      </div>
    </div>
  );
}
