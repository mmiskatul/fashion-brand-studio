import { z } from "zod";

export const couponSchema = z.object({
  code: z.string().trim().min(3).max(20).regex(/^[A-Z0-9_-]+$/, "Uppercase letters/numbers only"),
  discountType: z.enum(["percent","fixed"]),
  discountValue: z.coerce.number().positive(),
  minOrder: z.coerce.number().nonnegative(),
  usageLimit: z.coerce.number().int().positive(),
  startDate: z.string().min(1),
  endDate: z.string().min(1),
  status: z.enum(["active","disabled"]),
}).refine((d) => new Date(d.endDate) > new Date(d.startDate), {
  message: "End date must be after start date", path: ["endDate"],
});
export type CouponInput = z.infer<typeof couponSchema>;
