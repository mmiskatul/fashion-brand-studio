import type { Product, Category, Collection } from "@/types/product";

export const COLORS = [
  { name: "Black", hex: "#1a1a1a" },
  { name: "White", hex: "#f5f5f0" },
  { name: "Navy", hex: "#1e2a44" },
  { name: "Beige", hex: "#d8c8a8" },
  { name: "Olive", hex: "#6b7048" },
  { name: "Gray", hex: "#8a8a8a" },
];

export const SIZES = ["XS", "S", "M", "L", "XL", "XXL"] as const;

const img = (id: string, w = 800) =>
  `https://images.unsplash.com/${id}?auto=format&fit=crop&w=${w}&q=80`;

export const categories: Category[] = [
  { id: "c1", name: "T-Shirts", slug: "t-shirts", image: img("photo-1521572163474-6864f9cf17ab"), productCount: 24 },
  { id: "c2", name: "Hoodies", slug: "hoodies", image: img("photo-1556821840-3a63f95609a7"), productCount: 16 },
  { id: "c3", name: "Shirts", slug: "shirts", image: img("photo-1602810318383-e386cc2a3ccf"), productCount: 18 },
  { id: "c4", name: "Pants", slug: "pants", image: img("photo-1473966968600-fa801b869a1a"), productCount: 12 },
  { id: "c5", name: "Jackets", slug: "jackets", image: img("photo-1551028719-00167b16eac5"), productCount: 10 },
  { id: "c6", name: "Accessories", slug: "accessories", image: img("photo-1556306535-0f09a537f0a3"), productCount: 20 },
];

export const collections: Collection[] = [
  { id: "col1", name: "Autumn Essentials", slug: "autumn-essentials", description: "Warm tones for the season.", image: img("photo-1490481651871-ab68de25d43d"), productIds: ["p1","p2","p5"] },
  { id: "col2", name: "Minimal Edit", slug: "minimal-edit", description: "Less, but better.", image: img("photo-1483985988355-763728e1935b"), productIds: ["p3","p4","p6"] },
  { id: "col3", name: "Street Series", slug: "street-series", description: "Urban silhouettes.", image: img("photo-1529139574466-a303027c1d8b"), productIds: ["p2","p7","p8"] },
];

const productImages = [
  "photo-1521572163474-6864f9cf17ab",
  "photo-1581655353564-df123a1eb820",
  "photo-1503341504253-dff4815485f1",
  "photo-1576566588028-4147f3842f27",
  "photo-1556821840-3a63f95609a7",
  "photo-1620799140408-edc6dcb6d633",
  "photo-1602810318383-e386cc2a3ccf",
  "photo-1596755094514-f87e34085b2c",
  "photo-1473966968600-fa801b869a1a",
  "photo-1542272604-787c3835535d",
  "photo-1551028719-00167b16eac5",
  "photo-1591047139829-d91aecb6caea",
];

const names = [
  ["Essential Cotton Tee", "T-Shirts"],
  ["Oversized Heavyweight Tee", "T-Shirts"],
  ["Cropped Hoodie", "Hoodies"],
  ["Brushed Fleece Hoodie", "Hoodies"],
  ["Linen Camp Shirt", "Shirts"],
  ["Oxford Button-Down", "Shirts"],
  ["Tapered Wool Trousers", "Pants"],
  ["Pleated Wide-Leg Pants", "Pants"],
  ["Quilted Bomber Jacket", "Jackets"],
  ["Wool Overcoat", "Jackets"],
  ["Leather Card Holder", "Accessories"],
  ["Canvas Tote Bag", "Accessories"],
];

const fits = ["Regular", "Slim", "Oversized", "Relaxed"];
const materials = ["100% Organic Cotton", "Cotton/Linen Blend", "Wool/Cashmere", "Recycled Polyester"];

export const products: Product[] = names.map(([name, category], i) => {
  const base = 49 + (i * 17) % 250;
  const id = `p${i + 1}`;
  const colors = COLORS.slice(0, 3 + (i % 3));
  const sizes = (["S", "M", "L", "XL"] as const).slice(0, 3 + (i % 2));
  return {
    id,
    slug: name.toLowerCase().replace(/\s+/g, "-") + "-" + id,
    name,
    shortDescription: `Premium ${name.toLowerCase()} crafted with care.`,
    description: `The ${name} is built from ${materials[i % 4]}, designed for everyday wear with timeless silhouettes. Pre-washed for softness and durability. Made ethically in limited runs.`,
    category,
    sku: `SKU-${1000 + i}`,
    price: base,
    discountPrice: i % 3 === 0 ? Math.round(base * 0.8) : undefined,
    images: [img(productImages[i]), img(productImages[(i + 1) % 12]), img(productImages[(i + 2) % 12]), img(productImages[(i + 3) % 12])],
    colors,
    sizes: [...sizes],
    variants: colors.flatMap((c) =>
      sizes.map((s) => ({
        id: `${id}-${c.name}-${s}`,
        color: c.name,
        size: s,
        sku: `${id}-${c.name[0]}${s}`,
        stock: Math.floor(Math.random() * 30),
        sold: Math.floor(Math.random() * 80),
      }))
    ),
    material: materials[i % 4],
    fit: fits[i % 4],
    gender: i % 3 === 0 ? "women" : i % 3 === 1 ? "men" : "unisex",
    tags: [category.toLowerCase(), "premium", i % 2 ? "new" : "essential"],
    featured: i < 4,
    bestSeller: i % 3 === 0,
    newArrival: i % 2 === 0,
    active: true,
    rating: 4 + Math.random(),
    reviewCount: 20 + Math.floor(Math.random() * 200),
    createdAt: new Date(Date.now() - i * 86400000 * 3).toISOString(),
  };
});
