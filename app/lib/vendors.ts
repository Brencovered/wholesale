import "server-only";
import fs from "node:fs";
import path from "node:path";
import type { Vendor } from "./vendors-shared";

const DATA_PATH = path.join(process.cwd(), "data", "vendors.json");

function ensureDataFile() {
  const dir = path.dirname(DATA_PATH);

  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }

  if (!fs.existsSync(DATA_PATH)) {
    fs.writeFileSync(DATA_PATH, "[]", "utf8");
  }
}

export function readVendors(): Vendor[] {
  ensureDataFile();

  try {
    const raw = fs.readFileSync(DATA_PATH, "utf8");
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? (parsed as Vendor[]) : [];
  } catch (error) {
    console.error("Failed to read vendors.json", error);
    return [];
  }
}

export function writeVendors(vendors: Vendor[]) {
  ensureDataFile();
  fs.writeFileSync(DATA_PATH, JSON.stringify(vendors, null, 2), "utf8");
}

export function getVendors(): Vendor[] {
  return readVendors();
}

export function findVendor(vendorId: string): Vendor | undefined {
  return readVendors().find((vendor) => vendor.id === vendorId);
}

export function searchVendors({
  postcode,
  category,
}: {
  postcode?: string;
  category?: string;
}): Vendor[] {
  const vendors = readVendors();

  return vendors.filter((vendor) => {
    const postcodeMatch =
      !postcode || vendor.postcode.toLowerCase().includes(postcode.toLowerCase());

    const categoryMatch = !category || category === "all" || vendor.category === category;

    return postcodeMatch && categoryMatch;
  });
}