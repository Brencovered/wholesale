import "./layout.css";
import Link from "next/link";
import type { ReactNode } from "react";
import { CartProvider } from "./components/CartProvider";
import NavCartLink from "./components/NavCartLink";

export const metadata = {
  title: "Local Pantry",
  description: "Your local food network",
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body>
        <CartProvider>
          <header className="siteHeader">
            <div className="shell">
              <div className="topbar">
                <Link href="/" className="brand brandLink">
                  <div className="brandMark" />
                  <div>
                    <div className="brandTitle">Local Pantry</div>
                    <div className="brandSub">Your local food network</div>
                  </div>
                </Link>

                <nav className="nav" aria-label="Primary">
                  <ul className="navList">
                    <li>
                      <Link href="/search" className="navPill">
                        Search vendors
                      </Link>
                    </li>
                    <li>
                      <Link href="/account" className="navPill">
                        Account
                      </Link>
                    </li>
                    <li>
                      <Link href="/vendor/login" className="navPill">
                        Vendor login
                      </Link>
                    </li>
                    <li>
                      <Link href="/admin" className="navPill">
                        Admin
                      </Link>
                    </li>
                    <li>
                      <NavCartLink />
                    </li>
                  </ul>
                </nav>
              </div>
            </div>
          </header>

          <main className="main">{children}</main>
        </CartProvider>
      </body>
    </html>
  );
}