import Link from 'next/link'

export default function VendorDashboardPage() {
  return (
    <div className="page">
      <header className="pageHeader">
        <h1>Vendor dashboard</h1>
        <p className="muted">Manage stock, pricing, deals, and pickup orders.</p>
      </header>

      <section className="grid threeCol stats">
        <div className="card">
          <div className="cardInner">
            <div className="kpi">2</div>
            <div className="muted">products</div>
          </div>
        </div>
        <div className="card">
          <div className="cardInner">
            <div className="kpi">0</div>
            <div className="muted">pending pickup orders</div>
          </div>
        </div>
        <div className="card">
          <div className="cardInner">
            <div className="kpi">$12</div>
            <div className="muted">subscription</div>
          </div>
        </div>
      </section>

      <section className="grid twoCol">
        <div className="card">
          <div className="cardInner">
            <h2 className="sectionTitle">Quick actions</h2>

            <div className="actionRow">
              <Link className="primaryBtn" href="/vendor/dashboard/products/new">
                Add stock
              </Link>
              <Link className="secondaryBtn" href="/vendor/dashboard/orders">
                View orders
              </Link>
              <Link className="secondaryBtn" href="/vendor/parkigrocer">
                View store page
              </Link>
            </div>

            <p className="muted">
              Upload images, nutritional info and daily deals. Deals show up in search results.
            </p>
          </div>
        </div>

        <div className="card">
          <div className="cardInner">
            <h2 className="sectionTitle">Deals preview</h2>
            <p className="muted">Keep your deals fresh. Deals appear in search results.</p>

            <ul className="list">
              <li className="listItem">
                <span className="pill orange">Deal</span>
                <strong>Strawberries</strong>
                <span className="muted">$2.00 punnet</span>
              </li>
            </ul>
          </div>
        </div>
      </section>
    </div>
  )
}
