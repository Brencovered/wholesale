import SearchForm from "./components/SearchForm";
import { listCategories } from "./lib/vendors";
import Link from "next/link";

const HERO =
  "https://images.unsplash.com/photo-1528825871115-3581a5387919?auto=format&fit=crop&w=1600&q=80";

export default function HomePage() {
  const categories = listCategories();

  return (
    <div className="mx-auto max-w-6xl px-4 md:px-6 space-y-10">
      <section className="grid gap-6 md:grid-cols-[1.05fr,0.95fr] items-stretch">
        <div className="relative overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm">
          <div className="absolute inset-0 bg-gradient-to-br from-emerald-50 via-white to-amber-50" />

          <div className="relative p-6 md:p-8">
            <h1 className="text-3xl md:text-4xl font-semibold tracking-tight text-slate-950">
              Discover fresh food near you
            </h1>
            <p className="mt-3 text-slate-700 leading-relaxed max-w-prose">
              Find local fruit & veg shops, butchers, seafood markets, delis, and specialty grocers.
              Support independents, get better prices, and stay out of the duopoly.
            </p>

            <div className="mt-5 rounded-2xl border border-emerald-100 bg-white/80 backdrop-blur p-4 shadow-sm">
              <p className="mb-2 text-sm font-medium text-slate-800">
                Search by postcode + category
              </p>
              <SearchForm />
            </div>

            <div className="mt-4 flex flex-wrap gap-2 text-sm">
              {categories.map((c) => (
                <Link
                  key={c.key}
                  className="inline-flex items-center gap-2 rounded-full border border-emerald-100 bg-emerald-50 px-3 py-2 text-emerald-900 shadow-sm hover:bg-emerald-100"
                  href={`/search?category=${c.key}`}
                >
                  <span aria-hidden="true">
                    {c.key === "fruit" || c.key === "veg"
                      ? "🥬"
                      : c.key === "meat"
                      ? "🥩"
                      : c.key === "seafood"
                      ? "🐟"
                      : "🧀"}
                  </span>
                  {c.label}
                </Link>
              ))}
            </div>
          </div>
        </div>

        <div className="relative rounded-3xl border border-slate-200 overflow-hidden shadow-sm">
          <img
            src={HERO}
            alt="Fresh produce at a local market"
            className="h-full w-full object-cover"
          />
          <div className="absolute inset-0 bg-emerald-950/10" />
        </div>
      </section>

      <section>
        <h2 className="text-lg font-semibold text-slate-900">How it works</h2>
        <div className="mt-3 grid gap-3 md:grid-cols-3">
          {[
            {
              title: "Search local",
              body: "Search by postcode + category to find vendors near you.",
            },
            {
              title: "Pick vendors",
              body: "Each vendor manages their stock, pricing, deals and images.",
            },
            {
              title: "Pickup or delivery",
              body: "Checkout for pickup or vendor delivery (if they offer it).",
            },
          ].map((s) => (
            <div
              key={s.title}
              className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm"
            >
              <h3 className="text-sm font-semibold text-slate-900">{s.title}</h3>
              <p className="mt-2 text-sm text-slate-700 leading-relaxed">{s.body}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
