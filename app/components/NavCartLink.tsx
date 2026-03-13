"use client";

import Link from "next/link";
import { useCart } from "./CartProvider";

export default function NavCartLink() {
  const { itemCount } = useCart();

  return (
    <Link href="/checkout" className="navPill">
      Basket {itemCount > 0 ? `(${itemCount})` : ""}
    </Link>
  );
}