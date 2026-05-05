import { products } from "@/data/products";
import { categories, collections } from "@/data/products";
import { mockGet } from "./api";
import type { Product } from "@/types/product";

export const productService = {
  list: (filters?: { category?: string; search?: string; collection?: string }) => {
    let res = products;
    if (filters?.category) res = res.filter((p) => p.category.toLowerCase() === filters.category!.toLowerCase());
    if (filters?.collection) {
      const col = collections.find((c) => c.slug === filters.collection);
      if (col) res = res.filter((p) => col.productIds.includes(p.id));
    }
    if (filters?.search) {
      const q = filters.search.toLowerCase();
      res = res.filter((p) => p.name.toLowerCase().includes(q) || p.category.toLowerCase().includes(q) || p.tags.some((t) => t.includes(q)));
    }
    return mockGet(res);
  },
  getBySlug: (slug: string) => mockGet(products.find((p) => p.slug === slug)),
  getById: (id: string) => mockGet(products.find((p) => p.id === id)),
  related: (id: string, limit = 4): Promise<Product[]> => {
    const p = products.find((x) => x.id === id);
    return mockGet(products.filter((x) => x.id !== id && x.category === p?.category).slice(0, limit));
  },
  categories: () => mockGet(categories),
  collections: () => mockGet(collections),
  bestSellers: () => mockGet(products.filter((p) => p.bestSeller)),
  newArrivals: () => mockGet(products.filter((p) => p.newArrival)),
  featured: () => mockGet(products.filter((p) => p.featured)),
};
