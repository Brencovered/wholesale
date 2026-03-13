import Link from "next/link";
import { searchVendors } from "../lib/vendors";
import { listCategories, type Category } from "../lib/vendors-shared";
import SearchForm from "../components/SearchForm";

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

  const categoryLabel = categories.find((c) => c.key === (category ?? "all"))?.label ?? "All categories";

  return (
    <div className="page">
      <div className="pageHeader">
        <h1 className="pageTitle">Find Local Vendors</h1>
        <p className="pageSubtitle">
          Discover fresh produce, quality meats, and specialty goods from independent vendors near you.
        </p>
      </div>

      {/* Search Filters */}
      <div className="filterBar">
        <SearchForm />
      </div>

      {/* Results Header */}
      <div style={{ 
        display: "flex", 
        justifyContent: "space-between", 
        alignItems: "center",
        marginBottom: 24,
        flexWrap: "wrap",
        gap: 12
      }}>
        <div>
          <h2 style={{ fontSize: 20, fontWeight: 600, marginBottom: 4 }}>
            {vendors.length} {vendors.length === 1 ? "vendor" : "vendors"} found
          </h2>
          <p style={{ fontSize: 14, color: "#525252" }}>
            {postcode ? `Near ${postcode}` : "All locations"} · {categoryLabel}
          </p>
        </div>
        <div style={{ display: "flex", gap: 8 }}>
          {postcode && (
            <span className="pill">{postcode}</span>
          )}
          {category && category !== "all" && (
            <span className="pill green">{categoryLabel}</span>
          )}
        </div>
      </div>

      {/* Results Grid */}
      {vendors.length === 0 ? (
        <div className="emptyState">
          <h3>No vendors found</h3>
          <p>Try adjusting your search criteria or browse all categories.</p>
          <Link href="/search" className="primaryBtn" style={{ marginTop: 16 }}>
            View All Vendors
          </Link>
        </div>
      ) : (
        <div className="vendorGrid">
          {vendors.map((vendor) => (
            <Link
              key={vendor.id}
              href={`/vendor/${vendor.id}`}
              className="vendorCard"
              style={{ textDecoration: "none" }}
            >
              {vendor.image ? (
                <img src={vendor.image} alt={vendor.name} />
              ) : (
                <div style={{
                  height: 160,
                  background: "linear-gradient(135deg, #f5f5f5 0%, #e5e5e5 100%)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  color: "#a3a3a3",
                  fontSize: 14,
                  fontWeight: 500,
                }}>
                  No image
                </div>
              )}
              <div className="vendorCardBody">
                <h3 style={{ fontSize: 18, fontWeight: 600, marginBottom: 4 }}>
                  {vendor.name}
                </h3>
                <p style={{ color: "#525252", marginBottom: 8 }}>
                  {vendor.suburb}, {vendor.postcode}
                </p>
                <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
                  <span style={{
                    display: "inline-block",
                    padding: "4px 10px",
                    background: "#f5f5f5",
                    borderRadius: 100,
                    fontSize: 12,
                    fontWeight: 600,
                    color: "#525252",
                  }}>
                    {vendor.category}
                  </span>
                  {vendor.products && vendor.products.length > 0 && (
                    <span style={{
                      display: "inline-block",
                      padding: "4px 10px",
                      background: "#dcfce7",
                      borderRadius: 100,
                      fontSize: 12,
                      fontWeight: 600,
                      color: "#166534",
                    }}>
                      {vendor.products.length} products
                    </span>
                  )}
                </div>
                {vendor.description && (
                  <p style={{ 
                    marginTop: 12, 
                    fontSize: 14, 
                    color: "#525252", 
                    lineHeight: 1.5,
                    display: "-webkit-box",
                    WebkitLineClamp: 2,
                    WebkitBoxOrient: "vertical",
                    overflow: "hidden",
                  }}>
                    {vendor.description}
                  </p>
                )}
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
