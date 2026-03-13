import Link from 'next/link'

export default function AccountPage() {
  return (
    <div className="page">
      <div className="pageHeader">
        <h1 className="pageTitle">Your Account</h1>
        <p className="pageSubtitle">
          Manage your favourites, view orders, and keep your local food shopping organised.
        </p>
      </div>

      <div className="statsGrid">
        <div className="statCard">
          <p className="statLabel">Favourites</p>
          <p className="statValue">0</p>
        </div>
        <div className="statCard">
          <p className="statLabel">Past Orders</p>
          <p className="statValue">0</p>
        </div>
        <div className="statCard">
          <p className="statLabel">Saved Vendors</p>
          <p className="statValue">0</p>
        </div>
      </div>

      <div className="twoColLayout">
        <div>
          {/* Quick Actions */}
          <div className="section">
            <h2 style={{ marginBottom: 4 }}>Quick Actions</h2>
            <p>Jump right in and start shopping.</p>
            
            <div style={{ display: "flex", gap: 12, marginTop: 20, flexWrap: "wrap" }}>
              <Link href="/search" className="primaryBtn">
                Find Vendors
              </Link>
              <Link href="/checkout" className="secondaryBtn">
                View Basket
              </Link>
            </div>
          </div>

          {/* Favourites */}
          <div className="section" style={{ marginTop: 24 }}>
            <h2 style={{ marginBottom: 4 }}>Your Favourites</h2>
            <p>Save vendors for quick access later.</p>

            <div className="emptyState" style={{ marginTop: 20 }}>
              <svg 
                width="48" 
                height="48" 
                fill="none" 
                stroke="#a3a3a3" 
                strokeWidth="1.5" 
                viewBox="0 0 24 24"
                style={{ marginBottom: 12 }}
              >
                <path d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z" />
              </svg>
              <h3>No favourites yet</h3>
              <p>Browse vendors and click the heart icon to save them here.</p>
            </div>
          </div>

          {/* Order History */}
          <div className="section" style={{ marginTop: 24 }}>
            <h2 style={{ marginBottom: 4 }}>Order History</h2>
            <p>View your past purchases.</p>

            <div className="emptyState" style={{ marginTop: 20 }}>
              <svg 
                width="48" 
                height="48" 
                fill="none" 
                stroke="#a3a3a3" 
                strokeWidth="1.5" 
                viewBox="0 0 24 24"
                style={{ marginBottom: 12 }}
              >
                <path d="M15.75 10.5V6a3.75 3.75 0 10-7.5 0v4.5m11.356-1.993l1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 01-1.12-1.243l1.264-12A1.125 1.125 0 015.513 7.5h12.974c.576 0 1.059.435 1.119 1.007zM8.625 10.5a.375.375 0 11-.75 0 .375.375 0 01.75 0zm7.5 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z" />
              </svg>
              <h3>No orders yet</h3>
              <p>Your order history will appear here after your first purchase.</p>
            </div>
          </div>
        </div>

        {/* Sidebar */}
        <div>
          <div className="sidebarCard">
            <h3>Account Details</h3>
            <div style={{ marginTop: 16 }}>
              <div style={{ marginBottom: 12 }}>
                <p style={{ fontSize: 12, color: "#a3a3a3", marginBottom: 4, textTransform: "uppercase", letterSpacing: "0.03em" }}>
                  Email
                </p>
                <p style={{ fontSize: 15 }}>demo@localpantry.com</p>
              </div>
              <div style={{ marginBottom: 12 }}>
                <p style={{ fontSize: 12, color: "#a3a3a3", marginBottom: 4, textTransform: "uppercase", letterSpacing: "0.03em" }}>
                  Member Since
                </p>
                <p style={{ fontSize: 15 }}>March 2026</p>
              </div>
              <div>
                <p style={{ fontSize: 12, color: "#a3a3a3", marginBottom: 4, textTransform: "uppercase", letterSpacing: "0.03em" }}>
                  Location
                </p>
                <p style={{ fontSize: 15 }}>Melbourne, VIC</p>
              </div>
            </div>
            <p style={{ marginTop: 20, fontSize: 13, color: "#a3a3a3" }}>
              MVP: Account data is mocked for demo purposes.
            </p>
          </div>

          <div className="sidebarCard" style={{ marginTop: 16, background: "#0a0a0a", color: "#fff" }}>
            <h3 style={{ color: "#fff" }}>Are you a vendor?</h3>
            <p style={{ color: "#a3a3a3", fontSize: 14, marginTop: 8, lineHeight: 1.6 }}>
              Join Local Pantry and reach customers in your area.
            </p>
            <Link 
              href="/vendor/login" 
              className="secondaryBtn" 
              style={{ 
                marginTop: 16, 
                width: "100%", 
                textAlign: "center",
                background: "#fff",
                color: "#0a0a0a",
              }}
            >
              Vendor Portal
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
