import Link from 'next/link'

export default function OrdersPage() {
  return (
    <div className="page">
      <header className="pageHeader">
        <h1>Orders</h1>
        <p className="muted">Pickup orders placed through the platform.</p>
      </header>

      <div className="card">
        <div className="cardInner">
          <h2 className="sectionTitle">Current orders</h2>

          <table className="table">
            <thead>
              <tr>
                <th>Order</th>
                <th>Status</th>
                <th>Items</th>
                <th>Pick up</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>#2026-0001</td>
                <td>
                  <span className="pill green">Ready</span>
                </td>
                <td>2 items</td>
                <td>Today 4:00pm</td>
              </tr>
              <tr>
                <td>#2026-0002</td>
                <td>
                  <span className="pill yellow">Pending</span>
                </td>
                <td>1 item</td>
                <td>Tomorrow 10:00am</td>
              </tr>
            </tbody>
          </table>

          <p className="muted small">MVP: this is a mocked list.</p>

          <div className="actionRow">
            <Link className="secondaryBtn" href="/vendor/dashboard">
              Back to dashboard
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
