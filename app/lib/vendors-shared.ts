export type Product = {
  id: string;
  name: string;
  price: number;
  category: string;
  image?: string;
  description?: string;
};

export type FulfillmentOptions = {
  pickup: boolean;
  delivery: boolean;
  deliveryRadiusKm?: number;
  deliveryFee?: number;
  minOrderDelivery?: number;
};

export type Vendor = {
  id: string;
  name: string;
  suburb: string;
  postcode: string;
  address?: string;
  category: string;
  description?: string;
  image?: string;
  logo?: string;
  phone?: string;
  email?: string;
  website?: string;
  openingHours?: string;
  fulfillment: FulfillmentOptions;
  products: Product[];
};

export type Category =
  | "all"
  | "fruit-veg"
  | "meat"
  | "seafood"
  | "bakery"
  | "dairy"
  | "pantry"
  | "mixed-groceries"
  | "specialty-foods";

export type CategoryOption = {
  key: Category;
  label: string;
};

export const CATEGORY_OPTIONS: CategoryOption[] = [
  { key: "all", label: "All categories" },
  { key: "fruit-veg", label: "Fruit & Veg" },
  { key: "meat", label: "Meat" },
  { key: "seafood", label: "Seafood" },
  { key: "bakery", label: "Bakery" },
  { key: "dairy", label: "Dairy" },
  { key: "pantry", label: "Pantry" },
  { key: "mixed-groceries", label: "Mixed Groceries" },
  { key: "specialty-foods", label: "Specialty Foods" },
];

export function listCategories(): CategoryOption[] {
  return CATEGORY_OPTIONS;
}
