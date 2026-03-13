import Link from 'next/link'

export default function VendorLoginPage() {
  return (
    <div className="page">
      <div className="hero">
        <div className="heroCard card">
          <div className="cardInner">
            <h1 className="pageTitle">Vendor login</h1>
            <p className="muted">
              Get discovered by locals with a simple, beautiful online shopfront.
            </p>

            <form className="stack" action="/vendor/dashboard">
              <label className="label">
                Email
                <input className="input" type="email" placeholder="you@yourshop.com" required />
              </label>
              <label className="label">
                Password
                <input className="input" type="password" placeholder="••••••••" required />
              </label>

              <button className="primaryBtn" type="submit">
                Log in
              </button>

              <p className="muted small">
                MVP: no auth yet – logging in takes you to a demo dashboard.
              </p>

              <Link className="secondaryBtn" href="/vendor/dashboard/products/new">
                Jump to add stock
              </Link>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}
