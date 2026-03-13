import { searchVendors } from "../lib/vendors";
import { listCategories, type Category } from "../lib/vendors-shared";

type SearchPageProps = {
  searchParams?: {
    postcode?: string;
    category?: string;
  };
};

export default function SearchPage({ searchParams }: SearchPageProps) {
  const postcode = searchParams?.postcode?.trim() ?? "";
  const categoryRaw = (searchParams?.category ?? "").toLowerCase();

  const categories = listCategories();
  const allowedCategoryKeys = new Set(categories.map((c) => c.key));

  const category: Category | null = allowedCategoryKeys.has(categoryRaw as Category)
    ? (categoryRaw as Category)
    : null;

  const vendors = searchVendors({
    postcode,
    category: category === "all" ? undefined : category ?? undefined,
  });

  return (
    <main style={{ padding: 24 }}>
      <h1>Search vendors</h1>

      <div style={{ marginTop: 16, marginBottom: 24 }}>
        <p>
          <strong>Postcode:</strong> {postcode || "Any"}
        </p>
        <p>
          <strong>Category:</strong>{" "}
          {categories.find((c) => c.key === (category ?? "all"))?.label ?? "All categories"}
        </p>
      </div>

      {vendors.length === 0 ? (
        <p>No vendors match that postcode/category. Try "All categories".</p>
      ) : (
        <div
          style={{
            display: "grid",
            gap: 16,
            gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))",
          }}
        >
          {vendors.map((v) => (
            <a
              key={v.id}
              href={`/vendor/${v.id}`}
              style={{
                display: "block",
                border: "1px solid #ddd",
                borderRadius: 12,
                padding: 16,
                textDecoration: "none",
                color: "inherit",
              }}
            >
              <h2 style={{ marginBottom: 8 }}>{v.name}</h2>
              <p style={{ marginBottom: 6 }}>{v.suburb}, {v.postcode}</p>
              <p style={{ marginBottom: 6 }}>{v.category}</p>
              {v.description ? <p>{v.description}</p> : null}
            </a>
          ))}
        </div>
      )}
    </main>
  );
}
