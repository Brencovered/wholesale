"use client";

import Link from "next/link";
import { useState } from "react";
import "./dashboard.css";

type Tab = "overview" | "products" | "settings";

export default function VendorDashboardPage() {
  const [activeTab, setActiveTab] = useState<Tab>("overview");

  // Demo vendor data - in production this would come from auth/database
  const [vendor, setVendor] = useState({
    name: "Park St Grocer",
    logo: "",
    address: "45 Park Street",
    suburb: "South Melbourne",
    postcode: "3205",
    phone: "03 9555 1234",
    email: "hello@parkstgrocer.com.au",
    description: "Fresh fruit, veg and local produce since 1985.",
    fulfillment: {
      pickup: true,
      delivery: true,
      deliveryRadiusKm: 5,
      deliveryFee: 8,
      minOrderDelivery: 40,
    },
  });

  const [products] = useState([
    { id: "1", name: "Seasonal Veg Box", price: 35, unit: "box", isDeal: false },
    { id: "2", name: "Strawberries", price: 2, unit: "punnet", isDeal: true },
    { id: "3", name: "Avocados", price: 1.5, unit: "each", isDeal: true },
  ]);

  return (
    <div className="dashboard">
      {/* Sidebar */}
      <aside className="sidebar">
        <div className="sidebarHeader">
          <div className="vendorAvatar">
            {vendor.logo ? (
              <img src={vendor.logo} alt={vendor.name} />
            ) : (
              <span>{vendor.name.charAt(0)}</span>
            )}
          </div>
          <div className="vendorInfo">
            <h2 className="vendorName">{vendor.name}</h2>
            <p className="vendorLocation">{vendor.suburb}</p>
          </div>
        </div>

        <nav className="sidebarNav">
          <button
            className={`sidebarLink ${activeTab === "overview" ? "active" : ""}`}
            onClick={() => setActiveTab("overview")}
          >
            <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2">
              <rect x="3" y="3" width="7" height="7" rx="1" />
              <rect x="3" y="13" width="7" height="4" rx="1" />
              <rect x="13" y="3" width="4" height="14" rx="1" />
            </svg>
            Overview
          </button>
          <button
            className={`sidebarLink ${activeTab === "products" ? "active" : ""}`}
            onClick={() => setActiveTab("products")}
          >
            <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z" />
              <line x1="3" y1="6" x2="21" y2="6" />
              <path d="M16 10a4 4 0 01-8 0" />
            </svg>
            Products
          </button>
          <button
            className={`sidebarLink ${activeTab === "settings" ? "active" : ""}`}
            onClick={() => setActiveTab("settings")}
          >
            <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2">
              <circle cx="12" cy="12" r="3" />
              <path d="M19.4 15a1.65 1.65 0 00.33 1.82l.06.06a2 2 0 010 2.83 2 2 0 01-2.83 0l-.06-.06a1.65 1.65 0 00-1.82-.33 1.65 1.65 0 00-1 1.51V21a2 2 0 01-2 2 2 2 0 01-2-2v-.09A1.65 1.65 0 009 19.4a1.65 1.65 0 00-1.82.33l-.06.06a2 2 0 01-2.83 0 2 2 0 010-2.83l.06-.06a1.65 1.65 0 00.33-1.82 1.65 1.65 0 00-1.51-1H3a2 2 0 01-2-2 2 2 0 012-2h.09A1.65 1.65 0 004.6 9a1.65 1.65 0 00-.33-1.82l-.06-.06a2 2 0 010-2.83 2 2 0 012.83 0l.06.06a1.65 1.65 0 001.82.33H9a1.65 1.65 0 001-1.51V3a2 2 0 012-2 2 2 0 012 2v.09a1.65 1.65 0 001 1.51 1.65 1.65 0 001.82-.33l.06-.06a2 2 0 012.83 0 2 2 0 010 2.83l-.06.06a1.65 1.65 0 00-.33 1.82V9a1.65 1.65 0 001.51 1H21a2 2 0 012 2 2 2 0 01-2 2h-.09a1.65 1.65 0 00-1.51 1z" />
            </svg>
            Settings
          </button>
        </nav>

        <div className="sidebarFooter">
          <Link href={`/vendor/parkstgrocer`} className="sidebarLink">
            <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M18 13v6a2 2 0 01-2 2H5a2 2 0 01-2-2V8a2 2 0 012-2h6" />
              <polyline points="15,3 21,3 21,9" />
              <line x1="10" y1="14" x2="21" y2="3" />
            </svg>
            View public store
          </Link>
          <Link href="/" className="sidebarLink">
            <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M9 21H5a2 2 0 01-2-2V5a2 2 0 012-2h4" />
              <polyline points="16,17 21,12 16,7" />
              <line x1="21" y1="12" x2="9" y2="12" />
            </svg>
            Sign out
          </Link>
        </div>
      </aside>

      {/* Main Content */}
      <main className="dashboardMain">
        {activeTab === "overview" && (
          <OverviewTab vendor={vendor} products={products} />
        )}
        {activeTab === "products" && (
          <ProductsTab products={products} />
        )}
        {activeTab === "settings" && (
          <SettingsTab vendor={vendor} setVendor={setVendor} />
        )}
      </main>
    </div>
  );
}

function OverviewTab({ vendor, products }: { vendor: any; products: any[] }) {
  return (
    <div className="tabContent">
      <header className="tabHeader">
        <div>
          <h1 className="tabTitle">Welcome back</h1>
          <p className="tabSubtitle">Here is what is happening with your store today.</p>
        </div>
        <Link href="/vendor/dashboard/products/new" className="primaryBtn">
          Add product
        </Link>
      </header>

      {/* Stats Grid */}
      <div className="statsGrid">
        <div className="statCard">
          <div className="statIcon blue">
            <svg width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z" />
              <line x1="3" y1="6" x2="21" y2="6" />
              <path d="M16 10a4 4 0 01-8 0" />
            </svg>
          </div>
          <div className="statInfo">
            <span className="statValue">{products.length}</span>
            <span className="statLabel">Products</span>
          </div>
        </div>

        <div className="statCard">
          <div className="statIcon green">
            <svg width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M12 2L2 7l10 5 10-5-10-5z" />
              <path d="M2 17l10 5 10-5M2 12l10 5 10-5" />
            </svg>
          </div>
          <div className="statInfo">
            <span className="statValue">0</span>
            <span className="statLabel">Pending orders</span>
          </div>
        </div>

        <div className="statCard">
          <div className="statIcon orange">
            <svg width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2">
              <line x1="12" y1="1" x2="12" y2="23" />
              <path d="M17 5H9.5a3.5 3.5 0 000 7h5a3.5 3.5 0 010 7H6" />
            </svg>
          </div>
          <div className="statInfo">
            <span className="statValue">$0</span>
            <span className="statLabel">This week</span>
          </div>
        </div>

        <div className="statCard">
          <div className="statIcon purple">
            <svg width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2" />
              <circle cx="9" cy="7" r="4" />
              <path d="M23 21v-2a4 4 0 00-3-3.87M16 3.13a4 4 0 010 7.75" />
            </svg>
          </div>
          <div className="statInfo">
            <span className="statValue">24</span>
            <span className="statLabel">Profile views</span>
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <section className="dashSection">
        <h2 className="sectionTitle">Quick actions</h2>
        <div className="quickActions">
          <Link href="/vendor/dashboard/products/new" className="actionCard">
            <div className="actionIcon">
              <svg width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2">
                <line x1="12" y1="5" x2="12" y2="19" />
                <line x1="5" y1="12" x2="19" y2="12" />
              </svg>
            </div>
            <span>Add product</span>
          </Link>
          <Link href="/vendor/dashboard/orders" className="actionCard">
            <div className="actionIcon">
              <svg width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2">
                <rect x="1" y="4" width="22" height="16" rx="2" ry="2" />
                <line x1="1" y1="10" x2="23" y2="10" />
              </svg>
            </div>
            <span>View orders</span>
          </Link>
          <button className="actionCard" onClick={() => {}}>
            <div className="actionIcon">
              <svg width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2">
                <polygon points="12,2 15.09,8.26 22,9.27 17,14.14 18.18,21.02 12,17.77 5.82,21.02 7,14.14 2,9.27 8.91,8.26" />
              </svg>
            </div>
            <span>Create deal</span>
          </button>
        </div>
      </section>

      {/* Active Deals */}
      <section className="dashSection">
        <div className="sectionHeader">
          <h2 className="sectionTitle">Active deals</h2>
          <span className="badge">{products.filter((p) => p.isDeal).length} active</span>
        </div>
        <div className="dealsList">
          {products
            .filter((p) => p.isDeal)
            .map((product) => (
              <div key={product.id} className="dealItem">
                <div className="dealInfo">
                  <span className="dealTag">Deal</span>
                  <strong>{product.name}</strong>
                </div>
                <span className="dealPrice">
                  ${product.price.toFixed(2)} / {product.unit}
                </span>
              </div>
            ))}
          {products.filter((p) => p.isDeal).length === 0 && (
            <p className="emptyState">No active deals. Create one to attract more customers.</p>
          )}
        </div>
      </section>
    </div>
  );
}

function ProductsTab({ products }: { products: any[] }) {
  return (
    <div className="tabContent">
      <header className="tabHeader">
        <div>
          <h1 className="tabTitle">Products</h1>
          <p className="tabSubtitle">Manage your inventory and pricing.</p>
        </div>
        <Link href="/vendor/dashboard/products/new" className="primaryBtn">
          Add product
        </Link>
      </header>

      <div className="productTable">
        <div className="tableHeader">
          <span>Product</span>
          <span>Price</span>
          <span>Status</span>
          <span>Actions</span>
        </div>
        {products.map((product) => (
          <div key={product.id} className="tableRow">
            <div className="productCell">
              <div className="productThumb"></div>
              <span>{product.name}</span>
            </div>
            <span>
              ${product.price.toFixed(2)} / {product.unit}
            </span>
            <span>
              {product.isDeal ? (
                <span className="statusBadge deal">Deal</span>
              ) : (
                <span className="statusBadge active">Active</span>
              )}
            </span>
            <div className="rowActions">
              <button className="iconBtn" title="Edit">
                <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M11 4H4a2 2 0 00-2 2v14a2 2 0 002 2h14a2 2 0 002-2v-7" />
                  <path d="M18.5 2.5a2.121 2.121 0 013 3L12 15l-4 1 1-4 9.5-9.5z" />
                </svg>
              </button>
              <button className="iconBtn" title="Delete">
                <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2">
                  <polyline points="3,6 5,6 21,6" />
                  <path d="M19 6v14a2 2 0 01-2 2H7a2 2 0 01-2-2V6m3 0V4a2 2 0 012-2h4a2 2 0 012 2v2" />
                </svg>
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function SettingsTab({
  vendor,
  setVendor,
}: {
  vendor: any;
  setVendor: React.Dispatch<React.SetStateAction<any>>;
}) {
  const handleLogoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setVendor((v: any) => ({ ...v, logo: reader.result as string }));
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="tabContent">
      <header className="tabHeader">
        <div>
          <h1 className="tabTitle">Settings</h1>
          <p className="tabSubtitle">Manage your store profile and preferences.</p>
        </div>
      </header>

      <div className="settingsGrid">
        {/* Store Profile */}
        <section className="settingsCard">
          <h2 className="settingsCardTitle">Store profile</h2>
          <p className="settingsCardDesc">
            This information will be displayed publicly on your store page.
          </p>

          <div className="formGroup">
            <label className="formLabel">Store logo</label>
            <div className="logoUpload">
              <div className="logoPreview">
                {vendor.logo ? (
                  <img src={vendor.logo} alt="Store logo" />
                ) : (
                  <span>{vendor.name.charAt(0)}</span>
                )}
              </div>
              <div className="logoActions">
                <label className="secondaryBtn uploadBtn">
                  Upload logo
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleLogoUpload}
                    style={{ display: "none" }}
                  />
                </label>
                <p className="helpText">PNG, JPG up to 2MB. Recommended 400x400px.</p>
              </div>
            </div>
          </div>

          <div className="formGroup">
            <label className="formLabel">Store name</label>
            <input
              type="text"
              className="formInput"
              value={vendor.name}
              onChange={(e) => setVendor((v: any) => ({ ...v, name: e.target.value }))}
            />
          </div>

          <div className="formGroup">
            <label className="formLabel">Description</label>
            <textarea
              className="formInput formTextarea"
              value={vendor.description}
              onChange={(e) => setVendor((v: any) => ({ ...v, description: e.target.value }))}
              rows={3}
            />
          </div>

          <div className="formRow">
            <div className="formGroup">
              <label className="formLabel">Phone</label>
              <input
                type="tel"
                className="formInput"
                value={vendor.phone}
                onChange={(e) => setVendor((v: any) => ({ ...v, phone: e.target.value }))}
              />
            </div>
            <div className="formGroup">
              <label className="formLabel">Email</label>
              <input
                type="email"
                className="formInput"
                value={vendor.email}
                onChange={(e) => setVendor((v: any) => ({ ...v, email: e.target.value }))}
              />
            </div>
          </div>
        </section>

        {/* Location */}
        <section className="settingsCard">
          <h2 className="settingsCardTitle">Location</h2>
          <p className="settingsCardDesc">Where customers can find you.</p>

          <div className="formGroup">
            <label className="formLabel">Street address</label>
            <input
              type="text"
              className="formInput"
              value={vendor.address}
              onChange={(e) => setVendor((v: any) => ({ ...v, address: e.target.value }))}
            />
          </div>

          <div className="formRow">
            <div className="formGroup">
              <label className="formLabel">Suburb</label>
              <input
                type="text"
                className="formInput"
                value={vendor.suburb}
                onChange={(e) => setVendor((v: any) => ({ ...v, suburb: e.target.value }))}
              />
            </div>
            <div className="formGroup">
              <label className="formLabel">Postcode</label>
              <input
                type="text"
                className="formInput"
                value={vendor.postcode}
                onChange={(e) => setVendor((v: any) => ({ ...v, postcode: e.target.value }))}
              />
            </div>
          </div>
        </section>

        {/* Fulfillment Options */}
        <section className="settingsCard wide">
          <h2 className="settingsCardTitle">Fulfillment options</h2>
          <p className="settingsCardDesc">
            Choose how customers can receive their orders.
          </p>

          <div className="fulfillmentOptions">
            {/* Pickup */}
            <div className="fulfillmentCard">
              <label className="fulfillmentToggle">
                <input
                  type="checkbox"
                  checked={vendor.fulfillment.pickup}
                  onChange={(e) =>
                    setVendor((v: any) => ({
                      ...v,
                      fulfillment: { ...v.fulfillment, pickup: e.target.checked },
                    }))
                  }
                />
                <div className="toggleTrack">
                  <div className="toggleThumb" />
                </div>
              </label>
              <div className="fulfillmentInfo">
                <div className="fulfillmentIcon pickup">
                  <svg width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z" />
                    <line x1="3" y1="6" x2="21" y2="6" />
                    <path d="M16 10a4 4 0 01-8 0" />
                  </svg>
                </div>
                <div>
                  <h3>Pickup</h3>
                  <p>Customers collect orders from your store</p>
                </div>
              </div>
            </div>

            {/* Delivery */}
            <div className="fulfillmentCard">
              <label className="fulfillmentToggle">
                <input
                  type="checkbox"
                  checked={vendor.fulfillment.delivery}
                  onChange={(e) =>
                    setVendor((v: any) => ({
                      ...v,
                      fulfillment: { ...v.fulfillment, delivery: e.target.checked },
                    }))
                  }
                />
                <div className="toggleTrack">
                  <div className="toggleThumb" />
                </div>
              </label>
              <div className="fulfillmentInfo">
                <div className="fulfillmentIcon delivery">
                  <svg width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2">
                    <rect x="1" y="3" width="15" height="13" />
                    <polygon points="16,8 20,8 23,11 23,16 16,16" />
                    <circle cx="5.5" cy="18.5" r="2.5" />
                    <circle cx="18.5" cy="18.5" r="2.5" />
                  </svg>
                </div>
                <div>
                  <h3>Delivery</h3>
                  <p>You deliver orders to customers</p>
                </div>
              </div>
            </div>
          </div>

          {/* Delivery Settings */}
          {vendor.fulfillment.delivery && (
            <div className="deliverySettings">
              <h3 className="subheading">Delivery settings</h3>

              <div className="formRow three">
                <div className="formGroup">
                  <label className="formLabel">Delivery radius</label>
                  <div className="inputWithUnit">
                    <input
                      type="number"
                      className="formInput"
                      value={vendor.fulfillment.deliveryRadiusKm}
                      onChange={(e) =>
                        setVendor((v: any) => ({
                          ...v,
                          fulfillment: {
                            ...v.fulfillment,
                            deliveryRadiusKm: Number(e.target.value),
                          },
                        }))
                      }
                      min="1"
                      max="50"
                    />
                    <span className="inputUnit">km</span>
                  </div>
                  <p className="helpText">
                    Distance from your store address
                  </p>
                </div>

                <div className="formGroup">
                  <label className="formLabel">Delivery fee</label>
                  <div className="inputWithUnit">
                    <span className="inputPrefix">$</span>
                    <input
                      type="number"
                      className="formInput hasPrefix"
                      value={vendor.fulfillment.deliveryFee}
                      onChange={(e) =>
                        setVendor((v: any) => ({
                          ...v,
                          fulfillment: {
                            ...v.fulfillment,
                            deliveryFee: Number(e.target.value),
                          },
                        }))
                      }
                      min="0"
                      step="0.5"
                    />
                  </div>
                </div>

                <div className="formGroup">
                  <label className="formLabel">Minimum order</label>
                  <div className="inputWithUnit">
                    <span className="inputPrefix">$</span>
                    <input
                      type="number"
                      className="formInput hasPrefix"
                      value={vendor.fulfillment.minOrderDelivery}
                      onChange={(e) =>
                        setVendor((v: any) => ({
                          ...v,
                          fulfillment: {
                            ...v.fulfillment,
                            minOrderDelivery: Number(e.target.value),
                          },
                        }))
                      }
                      min="0"
                      step="5"
                    />
                  </div>
                  <p className="helpText">For free delivery</p>
                </div>
              </div>

              <div className="radiusVisual">
                <div className="radiusMap">
                  <div
                    className="radiusCircle"
                    style={
                      {
                        "--radius-scale": Math.min(vendor.fulfillment.deliveryRadiusKm / 25, 1),
                      } as React.CSSProperties
                    }
                  />
                  <div className="radiusCenter">
                    <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z" />
                      <circle cx="12" cy="10" r="3" />
                    </svg>
                  </div>
                </div>
                <p className="radiusLabel">
                  Delivering within {vendor.fulfillment.deliveryRadiusKm}km of your store
                </p>
              </div>
            </div>
          )}
        </section>
      </div>

      <div className="settingsFooter">
        <button className="secondaryBtn">Cancel</button>
        <button className="primaryBtn">Save changes</button>
      </div>
    </div>
  );
}
