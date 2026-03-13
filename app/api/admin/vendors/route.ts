import { NextResponse } from "next/server";
import { readVendors, writeVendors } from "../../../lib/vendors";
import type { Vendor } from "../../../lib/vendors-shared";

function makeId(name: string) {
  const base = name
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");

  return base || `vendor-${Date.now()}`;
}

export async function GET() {
  const vendors = readVendors();
  return NextResponse.json(vendors);
}

export async function POST(req: Request) {
  const body = await req.json();

  const newVendor: Vendor = {
    id: makeId(body.name || ""),
    name: String(body.name ?? ""),
    suburb: String(body.suburb ?? ""),
    postcode: String(body.postcode ?? ""),
    category: String(body.category ?? ""),
    description: String(body.description ?? ""),
    image: String(body.image ?? ""),
    products: Array.isArray(body.products) ? body.products : [],
  };

  const vendors = readVendors();
  vendors.push(newVendor);
  writeVendors(vendors);

  return NextResponse.json(newVendor, { status: 201 });
}
