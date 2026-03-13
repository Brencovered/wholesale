import Link from "next/link";
import { getVendors } from "../lib/vendors";
import { listCategories } from "../lib/vendors-shared";

export default function AdminPage() {
  const vendors = getVendors();
  const categories = listCategories().filter((c) => c.key !== "all");
  const totalProducts = vendors.reduce((sum, v) => sum + (v.products?.length ?? 0), 0);

  return (
    <div className="page">
      <div className="pageHeader">
        <h1 className="pageTitle">Admin Dashboard</h1>
        <p className="pageSubtitle">
          Manage vendors and build their online stores.
        </p>
      </div>

      <div className="statsGrid">
        <div className="statCard">
          <p className="statLabel">Total Vendors</p>
          <p className="statValue">{vendors.length}</p>
        </div>
        <div className="statCard">
          <p className="statLabel">Total Products</p>
          <p className="statValue">{totalProducts}</p>
        </div>
        <div className="statCard">
          <p className="statLabel">Categories</p>
          <p className="statValue">{categories.length}</p>
        </div>
      </div>

      <div className="section">
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 24 }}>
          <div>
            <h2 style={{ marginBottom: 4 }}>Vendor Directory</h2>
            <p>All registered vendors on the platform.</p>
          </div>
          <Link href="/admin/vendors/new" className="primaryBtn">
            Add New Vendor
          </Link>
        </div>

        {vendors.length === 0 ? (
          <div className="emptyState">
            <h3>No vendors yet</h3>
            <p>Create your first vendor to get started.</p>
            <Link href="/admin/vendors/new" className="primaryBtn">
              Create Vendor
            </Link>
          </div>
        ) : (
          <div className="vendorGrid">
            {vendors.map((vendor) => (
              <Link 
                key={vendor.id} 
                href={`/admin/vendors/${vendor.id}`}
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
                    fontWeight: 500
                  }}>
                    No image
                  </div>
                )}
                <div className="vendorCardBody">
                  <h3>{vendor.name}</h3>
                  <p style={{ marginBottom: 4 }}>
                    {vendor.suburb}, {vendor.postcode}
                  </p>
                  <p style={{ 
                    display: "inline-block",
                    padding: "4px 10px", 
                    background: "#f5f5f5", 
                    borderRadius: 100,
                    fontSize: 12,
                    fontWeight: 600,
                    marginTop: 8
                  }}>
                    {vendor.category}
                  </p>
                  <p style={{ marginTop: 8, fontSize: 13 }}>
                    {vendor.products?.length || 0} products
                  </p>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
