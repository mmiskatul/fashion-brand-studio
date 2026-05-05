import { z } from "zod";

export const productSchema = z.object({
  name: z.string().trim().min(2).max(120),
  slug: z.string().trim().min(2).max(120),
  category: z.string().min(1, "Category required"),
  sku: z.string().min(2).max(40),
  price: z.coerce.number().positive("Price must be positive"),
  discountPrice: z.coerce.number().nonnegative().optional(),
  description: z.string().min(10).max(2000),
  shortDescription: z.string().max(280).optional(),
  material: z.string().min(2).max(80),
  fit: z.string().min(2).max(40),
  gender: z.enum(["men","women","unisex"]),
  featured: z.boolean().default(false),
  bestSeller: z.boolean().default(false),
  newArrival: z.boolean().default(false),
  active: z.boolean().default(true),
}).refine((d) => !d.discountPrice || d.discountPrice < d.price, {
  message: "Discount must be less than price", path: ["discountPrice"],
});
export type ProductInput = z.infer<typeof productSchema>;
