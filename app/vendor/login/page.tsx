import Link from 'next/link'

export default function VendorLoginPage() {
  return (
    <div className="page">
      <div className="authCard">
        <div className="authHeader">
          <div style={{ 
            width: 56, 
            height: 56, 
            background: "#0a0a0a", 
            borderRadius: 14, 
            margin: "0 auto 20px"
          }} />
          <h1>Vendor Portal</h1>
          <p>
            Sign in to manage your store, products, and orders.
          </p>
        </div>

        <form action="/vendor/dashboard">
          <div className="formGroup">
            <label className="formLabel">Email Address</label>
            <input 
              className="formInput" 
              type="email" 
              placeholder="you@yourshop.com" 
              required 
            />
          </div>
          
          <div className="formGroup">
            <label className="formLabel">Password</label>
            <input 
              className="formInput" 
              type="password" 
              placeholder="Enter your password" 
              required 
            />
          </div>

          <div className="formActions">
            <button className="primaryBtn" type="submit" style={{ width: "100%" }}>
              Sign In
            </button>
          </div>

          <p className="divider">or</p>

          <Link 
            className="secondaryBtn" 
            href="/vendor/dashboard" 
            style={{ width: "100%", textAlign: "center" }}
          >
            Continue to Demo Dashboard
          </Link>

          <p style={{ 
            marginTop: 24, 
            textAlign: "center", 
            fontSize: 13, 
            color: "#a3a3a3" 
          }}>
            MVP: Authentication is mocked for demo purposes.
          </p>
        </form>
      </div>

      <div style={{ 
        maxWidth: 440, 
        margin: "0 auto", 
        textAlign: "center",
        padding: "0 24px"
      }}>
        <p style={{ fontSize: 14, color: "#525252", marginBottom: 12 }}>
          Not registered yet?
        </p>
        <p style={{ fontSize: 14, color: "#a3a3a3", lineHeight: 1.6 }}>
          Get discovered by locals with a simple, beautiful online storefront.
          Contact us to join the Local Pantry marketplace.
        </p>
      </div>
    </div>
  )
}
