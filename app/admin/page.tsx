import Link from "next/link";
import { getVendors } from "../lib/vendors";

export default function AdminPage() {
  const vendors = getVendors();
  const totalProducts = vendors.reduce((sum, v) => sum + (v.products?.length ?? 0), 0);

  return (
    <div className="page">
      <section className="section">
        <h2>Admin</h2>
        <p>Manage vendors and build their online stores.</p>

        <div className="actions" style={{ marginTop: 18 }}>
          <Link href="/admin/vendors/new" className="primaryBtn">
            Create vendor
          </Link>
        </div>
      </section>

      <section className="section">
        <div className="cards">
          <div className="card">
            <h3>Vendors</h3>
            <p>{vendors.length}</p>
          </div>

          <div className="card">
            <h3>Products</h3>
            <p>{totalProducts}</p>
          </div>
        </div>
      </section>

      <section className="section">
        <h2>Vendor list</h2>
        <p>Edit vendors and later add products and pricing.</p>

        <div className="vendorGrid" style={{ marginTop: 18 }}>
          {vendors.length === 0 ? (
            <div className="card">
              <h3>No vendors yet</h3>
              <p>Create your first vendor to get started.</p>
            </div>
          ) : (
            vendors.map((vendor) => (
              <div key={vendor.id} className="vendorCard">
                {vendor.image ? <img src={vendor.image} alt={vendor.name} /> : null}
                <h3>{vendor.name}</h3>
                <p>
                  {vendor.suburb}, {vendor.postcode}
                </p>
                <p>{vendor.category}</p>
                <div className="actions" style={{ marginTop: 12 }}>
                  <Link href={`/admin/vendors/${vendor.id}`} className="secondaryBtn">
                    Edit vendor
                  </Link>
                </div>
              </div>
            ))
          )}
        </div>
      </section>
    </div>
  );
}