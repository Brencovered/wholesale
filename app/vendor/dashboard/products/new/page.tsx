import Link from 'next/link'

export default function NewProductPage() {
  return (
    <div className="page">
      <header className="pageHeader">
        <h1>Add stock</h1>
        <p className="muted">
          Upload stock, pricing, deals, images and nutritional guides.
        </p>
      </header>

      <section className="grid twoCol">
        <div className="card">
          <div className="cardInner">
            <h2 className="sectionTitle">Product details</h2>

            <form className="stack" action="/vendor/dashboard">
              <label className="label">
                Name
                <input className="input" placeholder="Seasonal Veg Box" />
              </label>

              <div className="formGrid">
                <label className="label">
                  Price
                  <input className="input" type="number" min="0" step="0.01" placeholder="35.00" />
                </label>
                <label className="label">
                  Unit
                  <input className="input" placeholder="box / kg / punnet" />
                </label>
              </div>

              <label className="label">
                Category
                <select className="input">
                  <option>fruit</option>
                  <option>veg</option>
                  <option>meat</option>
                  <option>seafood</option>
                  <option>deli</option>
                  <option>grocery</option>
                </select>
              </label>

              <label className="label">
                Is this a deal?
                <select className="input">
                  <option>No</option>
                  <option>Yes - promote</option>
                </select>
              </label>

              <label className="label">
                Upload image
                <input className="input" type="file" />
                <p className="muted small">MVP note: this form is mocked; file uploads come later.</p>
              </label>

              <label className="label">
                Nutrition guide
                <textarea className="input" placeholder="Good source of ..."></textarea>
              </label>

              <div className="actionRow">
                <button className="primaryBtn" type="submit">
                  Save stock
                </button>
                <Link className="secondaryBtn" href="/vendor/dashboard">
                  Back
                </Link>
              </div>
            </form>
          </div>
        </div>

        <div className="card">
          <div className="cardInner">
            <h2 className="sectionTitle">Tip</h2>
            <p className="muted">
              Deals and fresh stock updated daily will attract locals faster than any website.
            </p>
            <p className="muted">
              If you offer delivery yourself, we’ll show a delivery note on checkout.
            </p>
            <div className="pillRow">
              <span className="pill green">Fresh</span>
              <span className="pill yellow">Local</span>
              <span className="pill orange">Deal</span>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
