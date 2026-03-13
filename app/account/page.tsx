import Link from 'next/link'

export default function AccountPage() {
  return (
    <div className="page">
      <header className="pageHeader">
        <h1>Account</h1>
        <p className="muted">
          Save your favourites, view pickup orders, and keep your local food shopping organised.
        </p>
      </header>

      <section className="grid twoCol">
        <div className="card">
          <div className="cardInner">
            <h2 className="sectionTitle">Welcome back</h2>
            <p className="muted">Account features are mocked for this MVP.</p>

            <div className="actionRow">
              <Link className="primaryBtn" href="/search">
                Find vendors
              </Link>
              <Link className="secondaryBtn" href="/checkout">
                View checkout
              </Link>
            </div>
          </div>
        </div>

        <div className="card">
          <div className="cardInner">
            <h2 className="sectionTitle">Your favourites</h2>
            <p className="muted">Add vendors from store pages and we’ll keep them here.</p>

            <ul className="list">
              <li className="listEmpty">No favourites yet.</li>
            </ul>
          </div>
        </div>
      </section>
    </div>
  )
}
