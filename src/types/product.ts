export type Color = { name: string; hex: string };
export type Size = "XS" | "S" | "M" | "L" | "XL" | "XXL";

export type ProductVariant = {
  id: string;
  color: string;
  size: Size;
  sku: string;
  stock: number;
  sold: number;
};

export type Product = {
  id: string;
  slug: string;
  name: string;
  shortDescription: string;
  description: string;
  category: string;
  subcategory?: string;
  collection?: string;
  sku: string;
  price: number;
  discountPrice?: number;
  images: string[];
  colors: Color[];
  sizes: Size[];
  variants: ProductVariant[];
  material: string;
  fit: string;
  gender: "men" | "women" | "unisex";
  tags: string[];
  featured: boolean;
  bestSeller: boolean;
  newArrival: boolean;
  active: boolean;
  rating: number;
  reviewCount: number;
  createdAt: string;
};

export type Category = {
  id: string;
  name: string;
  slug: string;
  image: string;
  productCount: number;
};

export type Collection = {
  id: string;
  name: string;
  slug: string;
  description: string;
  image: string;
  productIds: string[];
};
