import { NextResponse } from "next/server";
import { findVendor } from "../../../lib/vendors";

export async function GET(
  _req: Request,
  { params }: { params: { vendorId: string } }
) {
  const vendor = findVendor(params.vendorId);

  if (!vendor) {
    return NextResponse.json({ error: "Vendor not found" }, { status: 404 });
  }

  return NextResponse.json(vendor);
}
