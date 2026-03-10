export type Category = "fruit" | "veg" | "meat" | "seafood" | "deli" | "grocery";

export type Product = {
  id: string;
  name: string;
  category: Category;
  price: number;
  unit: string; // e.g. kg, each
  stock: number;
  imageUrl?: string;
  deal?: string;
  nutrition?: string;
};

export type Vendor = {
  id: string;
  name: string;
  suburb: string;
  postcode: string;
  categories: Category[];
  delivery: boolean; // vendor does their own delivery
  pickup: boolean;
  blurb: string;
  heroImageUrl?: string;
  products: Product[];
};

const vendors: Vendor[] = [
  {
    id: "parkigrocer",
    name: "ParkiGrocer",
    suburb: "Parkdale",
    postcode: "3195",
    categories: ["fruit", "veg", "grocery"],
    pickup: true,
    delivery: false,
    blurb: "Local organic fruit & veg with seasonal specials.",
    heroImageUrl: "https://images.unsplash.com/photo-1506806732259-39c2d0268443?auto=format&fit=crop&w=1200&q=80",
    products: [
      {
        id: "pk1",
        name: "Seasonal Veg Box",
        category: "veg",
        price: 35,
        unit: "box",
        stock: 12,
        deal: "New customers: 10% off",
        nutrition: "Varies by season",
      },
      {
        id: "pk2",
        name: "Strawberries",
        category: "fruit",
        price: 2,
        unit: "punnet",
        stock: 48,
        deal: "Today only",
        nutrition: "Good source of vitamin C",
      },
    ],
  },
  {
    id: "charbutchers",
    name: "Char Char Char Butchers",
    suburb: "Mordialloc",
    postcode: "3195",
    categories: ["meat"],
    pickup: true,
    delivery: true,
    blurb: "Family butcher with weekly BBQ specials.",
    heroImageUrl: "https://images.unsplash.com/photo-1603048687077-51f7c1c66a45?auto=format&fit=crop&w=1200&q=80",
    products: [
      {
        id: "cc1",
        name: "Beef Mince",
        category: "meat",
        price: 14,
        unit: "kg",
        stock: 30,
        deal: "Bundle price for 2kg",
        nutrition: "High in protein",
      },
      {
        id: "cc2",
        name: "Free-range Chicken Breast",
        category: "meat",
        price: 16,
        unit: "kg",
        stock: 20,
        nutrition: "Lean protein",
      },
    ],
  },
  {
    id: "bigfish",
    name: "The Big Fish Fish Market",
    suburb: "Carrum Downs",
    postcode: "3201",
    categories: ["seafood"],
    pickup: true,
    delivery: true,
    blurb: "Fresh seafood arriving daily.",
    heroImageUrl: "https://images.unsplash.com/photo-1553621042-f6e147245754?auto=format&fit=crop&w=1200&q=80",
    products: [
      {
        id: "bf1",
        name: "Snapper",
        category: "seafood",
        price: 19,
        unit: "kg",
        stock: 12,
        deal: "Whole fish special",
        nutrition: "Source of omega-3",
      },
      {
        id: "bf2",
        name: "Prawns",
        category: "seafood",
        price: 26,
        unit: "kg",
        stock: 18,
        nutrition: "Protein rich",
      },
    ],
  },
];

export function listCategories(): { key: Category; label: string }[] {
  return [
    { key: "fruit", label: "Fruit" },
    { key: "veg", label: "Veg" },
    { key: "meat", label: "Meat" },
    { key: "seafood", label: "Seafood" },
    { key: "deli", label: "Deli" },
    { key: "grocery", label: "Grocery" },
  ];
}

export function getVendors() {
  return vendors;
}

export function findVendor(id: string) {
  return vendors.find((v) => v.id === id);
}

export function searchVendors(params: {
  postcode?: string;
  category?: Category;
}) {
  const postcode = (params.postcode || "").trim();
  return vendors.filter((v) => {
    const matchesPostcode = postcode ? v.postcode === postcode : true;
    const matchesCategory = params.category ? v.categories.includes(params.category) : true;
    return matchesPostcode && matchesCategory;
  });
}
