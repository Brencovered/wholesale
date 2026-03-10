import Link from "next/link";
import { searchVendors, type Category } from "../lib/vendors";
import SearchForm from "../components/SearchForm";

export default function SearchPage({
  searchParams,
}: {
  searchParams?: { postcode?: string; category?: string };
}) {
  const postcode = searchParams?.postcode || "";
  const category = (searchParams?.category || "") as Category;
  const results = searchVendors({ postcode, category });

  return (
    <div className="space-y-6">
      <div className="rounded border border-slate-200 bg-white p-4">
        <h1 className="text-lg font-semibold text-slate-900">Search</h1>
        <p className="mt-1 text-sm text-slate-700">Search by postcode and category.</p>
        <div className="mt-3">
          <SearchForm initialPostcode={postcode} initialCategory={category} />
        </div>
      </div>

      <section>
        <div className="mb-3 flex items-end justify-between">
          <h2 className="text-md font-semibold text-slate-900">Results</h2>
          <p className="text-sm text-slate-600">{results.length} vendors</p>
        </div>

        <div className="grid gap-4 md:grid-cols-2">
          {results.map((v) => (
            <article key={v.id} className="overflow-hidden rounded border border-slate-200 bg-white">
              {v.heroImageUrl ? (
                <div className="h-28 w-full bg-cover bg-center" style={{ backgroundImage: `url(${v.heroImageUrl})` }} />
              ) : null}

              <div className="p-4 space-y-3">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-sm font-semibold text-slate-900">{v.name}</h3>
                    <p className="text-xs text-slate-600">
                      {v.suburb} ({v.postcode}) • {v.categories.join(", ")}
                    </p>
                  </div>
                  <div className="text-xs text-slate-600 text-right">
                    <div>{v.pickup ? "Pickup" : ""}</div>
                    <div>{v.delivery ? "Delivery" : ""}</div>
                  </div>
                </div>
                <p className="text-sm text-slate-700 leading-relaxed">{v.blurb}</p>
                <div className="flex gap-2">
                  <Link href={`/vendor/${v.id}`} className="flex-1 rounded border border-slate-200 px-3 py-2 text-sm hover:bg-slate-50">
                    View store
                  </Link>
                  <Link
                    href={`/checkout?vendorId=${v.id}`}
                    className="rounded bg-slate-900 px-3 py-2 text-sm text-white hover:bg-slate-800"
                  >
                    Checkout
                  </Link>
                </div>
              </div>
            </article>
          ))}
        </div>

        {results.length === 0 ? (
          <div className="mt-6 rounded border border-slate-200 bg-white p-4 text-sm text-slate-700">
            No vendors found. Try a different postcode or category.
          </div>
        ) : null}
      </section>
    </div>
  );
}
