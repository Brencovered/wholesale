import Link from "next/link";
import SearchForm from "./components/SearchForm";
import { listCategories, CATEGORY_OPTIONS } from "./lib/vendors-shared";
import "./home.css";

const HERO_IMAGE =
  "https://images.unsplash.com/photo-1606787366850-de6330128bfc?auto=format&fit=crop&w=1600&q=80";

const CATEGORY_IMAGES: Record<string, string> = {
  "fruit-veg":
    "https://images.unsplash.com/photo-1610832958506-aa56368176cf?auto=format&fit=crop&w=800&q=80",
  meat: "https://images.unsplash.com/photo-1607623814075-e51df1bdc82f?auto=format&fit=crop&w=800&q=80",
  seafood:
    "https://images.unsplash.com/photo-1615141982883-c7ad0e69fd62?auto=format&fit=crop&w=800&q=80",
  bakery:
    "https://images.unsplash.com/photo-1509440159596-0249088772ff?auto=format&fit=crop&w=800&q=80",
  dairy:
    "https://images.unsplash.com/photo-1628088062854-d1870b4553da?auto=format&fit=crop&w=800&q=80",
  pantry:
    "https://images.unsplash.com/photo-1584568694244-14fbdf83bd30?auto=format&fit=crop&w=800&q=80",
};

export default function HomePage() {
  const categories = CATEGORY_OPTIONS.filter((c) => c.key !== "all");

  return (
    <div className="homePage">
      {/* Hero Section */}
      <section className="hero">
        <div className="heroContent">
          <span className="heroLabel">Melbourne's Local Food Network</span>
          <h1 className="heroTitle">
            Fresh food,
            <br />
            from your
            <br />
            neighbourhood.
          </h1>
          <p className="heroDesc">
            Discover independent greengrocers, butchers, seafood markets, and
            specialty food stores. Skip the supermarket duopoly, support local
            businesses, and eat better.
          </p>
          <div className="heroCta">
            <Link href="/search" className="ctaPrimary">
              Find vendors near you
            </Link>
            <Link href="#how-it-works" className="ctaSecondary">
              How it works
            </Link>
          </div>
        </div>
        <div className="heroImageWrap">
          <img
            src={HERO_IMAGE}
            alt="Fresh local produce beautifully arranged"
            className="heroImage"
          />
        </div>
      </section>

      {/* Stats Bar */}
      <section className="statsBar">
        <div className="statItem">
          <span className="statValue">50+</span>
          <span className="statLabel">Local Vendors</span>
        </div>
        <div className="statDivider" />
        <div className="statItem">
          <span className="statValue">9</span>
          <span className="statLabel">Categories</span>
        </div>
        <div className="statDivider" />
        <div className="statItem">
          <span className="statValue">100%</span>
          <span className="statLabel">Independent</span>
        </div>
        <div className="statDivider" />
        <div className="statItem">
          <span className="statValue">Melbourne</span>
          <span className="statLabel">Wide Coverage</span>
        </div>
      </section>

      {/* Search Section */}
      <section className="searchSection">
        <div className="searchHeader">
          <h2 className="sectionTitle">Find your local vendors</h2>
          <p className="sectionDesc">
            Search by postcode to discover quality food shops in your area
          </p>
        </div>
        <div className="searchCard">
          <SearchForm />
        </div>
      </section>

      {/* Categories Grid */}
      <section className="categoriesSection">
        <div className="sectionHeader">
          <h2 className="sectionTitle">Browse by category</h2>
          <p className="sectionDesc">
            Explore our curated selection of local food categories
          </p>
        </div>
        <div className="categoriesGrid">
          {categories.slice(0, 6).map((category) => (
            <Link
              key={category.key}
              href={`/search?category=${category.key}`}
              className="categoryCard"
            >
              <div className="categoryImageWrap">
                <img
                  src={CATEGORY_IMAGES[category.key] || HERO_IMAGE}
                  alt={category.label}
                  className="categoryImage"
                />
              </div>
              <div className="categoryContent">
                <h3 className="categoryName">{category.label}</h3>
                <span className="categoryArrow">
                  <svg
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M5 12h14M12 5l7 7-7 7" />
                  </svg>
                </span>
              </div>
            </Link>
          ))}
        </div>
        <div className="categoriesMore">
          <Link href="/search" className="viewAllLink">
            View all categories
            <svg
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M5 12h14M12 5l7 7-7 7" />
            </svg>
          </Link>
        </div>
      </section>

      {/* How It Works */}
      <section className="howSection" id="how-it-works">
        <div className="sectionHeader">
          <h2 className="sectionTitle">How it works</h2>
          <p className="sectionDesc">
            Simple steps to connect with your local food community
          </p>
        </div>
        <div className="stepsGrid">
          <div className="stepCard">
            <div className="stepNumber">1</div>
            <h3 className="stepTitle">Search your area</h3>
            <p className="stepDesc">
              Enter your postcode to discover independent food vendors near you.
              Filter by category to find exactly what you need.
            </p>
          </div>
          <div className="stepCard">
            <div className="stepNumber">2</div>
            <h3 className="stepTitle">Browse and compare</h3>
            <p className="stepDesc">
              View vendor profiles, check their latest stock, compare prices,
              and discover weekly specials from local shops.
            </p>
          </div>
          <div className="stepCard">
            <div className="stepNumber">3</div>
            <h3 className="stepTitle">Order your way</h3>
            <p className="stepDesc">
              Add items to your basket and checkout for pickup, or delivery
              where available. Support local with every purchase.
            </p>
          </div>
        </div>
      </section>

      {/* Value Props */}
      <section className="valueSection">
        <div className="valueGrid">
          <div className="valueCard valueCardDark">
            <h3 className="valueTitle">Support independent businesses</h3>
            <p className="valueDesc">
              Every purchase goes directly to local, family-owned shops. No
              middlemen, no supermarket margins.
            </p>
          </div>
          <div className="valueCard">
            <h3 className="valueTitle">Better quality, better prices</h3>
            <p className="valueDesc">
              Fresh produce straight from the source. Skip the supply chain and
              get food at its peak.
            </p>
          </div>
          <div className="valueCard">
            <h3 className="valueTitle">Build your food community</h3>
            <p className="valueDesc">
              Connect with passionate vendors who know their products. Get
              recommendations, recipes, and expertise.
            </p>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="ctaSection">
        <h2 className="ctaTitle">Ready to shop local?</h2>
        <p className="ctaDesc">
          Join thousands of Melbournians discovering their local food network.
        </p>
        <div className="ctaButtons">
          <Link href="/search" className="ctaPrimary">
            Start exploring
          </Link>
          <Link href="/vendor/login" className="ctaSecondary">
            List your business
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="footer">
        <div className="footerContent">
          <div className="footerBrand">
            <div className="footerLogo" />
            <span className="footerName">Local Pantry</span>
          </div>
          <nav className="footerNav">
            <Link href="/search">Search</Link>
            <Link href="/account">Account</Link>
            <Link href="/vendor/login">For Vendors</Link>
            <Link href="/admin">Admin</Link>
          </nav>
          <p className="footerCopy">
            Melbourne's local food network. Built with care.
          </p>
        </div>
      </footer>
    </div>
  );
}
