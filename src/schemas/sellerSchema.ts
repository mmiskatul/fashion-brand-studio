import { z } from "zod";

export const sellerSchema = z.object({
  name: z.string().trim().min(2).max(80),
  email: z.string().trim().email().max(255),
  phone: z.string().trim().min(7).max(20),
  password: z.string().min(8, "At least 8 characters").max(72),
  status: z.enum(["active","disabled"]),
  permissions: z.array(z.string()).default([]),
});
export type SellerInput = z.infer<typeof sellerSchema>;
