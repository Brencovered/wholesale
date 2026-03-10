import SearchForm from "./components/SearchForm";
import { listCategories } from "./lib/vendors";
import Link from "next/link";

export default function HomePage() {
  const categories = listCategories();

  return (
    <div className="space-y-10">
      <section className="grid gap-6 md:grid-cols-2 items-start">
        <div className="space-y-4">
          <h1 className="text-3xl font-semibold tracking-tight text-slate-900">Discover fresh food near you</h1>
          <p className="text-slate-700 leading-relaxed">
            Find local fruit & veg shops, butchers, seafood markets, delis, and specialty grocers. Support independents,
            get better prices, and stay out of the duopoly.
          </p>
          <div className="rounded border border-slate-200 bg-white p-4">
            <p className="mb-2 text-sm font-medium text-slate-800">Search by postcode + category</p>
            <SearchForm />
          </div>
        </div>
        <div className="rounded border border-slate-200 bg-white p-4">
          <h2 className="text-lg font-semibold text-slate-900">Browse categories</h2>
          <ul className="mt-2 grid grid-cols-2 gap-2 text-sm">
            {categories.map((c) => (
              <li key={c.key}>
                <Link
                  className="block rounded border border-slate-200 px-3 py-2 hover:bg-slate-50"
                  href={`/search?category=${c.key}`}
                >
                  {c.label}
                </Link>
              </li>
            ))}
          </ul>
          <div className="mt-6">
            <h2 className="text-lg font-semibold text-slate-900">How it works</h2>
            <ol className="mt-2 list-decimal space-y-2 pl-5 text-sm text-slate-700">
              <li>
                Search for local vendors by postcode/category.
              </li>
              <li>
                Vendors keep their stock, pricing, deals and images up to date.
              </li>
              <li>
                You place an order for pickup or (if offered) vendor delivery.
              </li>
            </ol>
          </div>
        </div>
      </section>
    </div>
  );
}
