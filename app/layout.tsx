import type { Metadata } from "next";
import "./globals.css";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Local Food Marketplace",
  description: "Discover local fruit & veg shops, butchers, seafood and specialty grocers near you.",
};

function TopNav() {
  return (
    <header className="bg-white border-b border-slate-200">
      <div className="mx-auto max-w-6xl px-4 py-3 flex items-center justify-between">
        <Link href="/" className="font-semibold tracking-tight text-slate-900">
          Local Food Marketplace
        </Link>
        <nav className="flex gap-4 text-sm text-slate-700">
          <Link href="/search" className="hover:text-slate-900">
            Search
          </Link>
          <Link href="/account" className="hover:text-slate-900">
            Account
          </Link>
          <Link href="/vendor/login" className="hover:text-slate-900">
            Vendor Login
          </Link>
        </nav>
      </div>
    </header>
  );
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <TopNav />
        <main className="mx-auto max-w-6xl px-4 py-8">{children}</main>
      </body>
    </html>
  );
}
