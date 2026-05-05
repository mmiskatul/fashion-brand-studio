import { z } from "zod";

export const checkoutSchema = z.object({
  name: z.string().trim().min(2, "Name is required").max(80),
  phone: z.string().trim().min(7, "Valid phone required").max(20).regex(/^[+\d\s-()]+$/, "Invalid phone"),
  email: z.string().trim().email("Invalid email").max(255),
  address: z.string().trim().min(5, "Address required").max(200),
  city: z.string().trim().min(2).max(80),
  area: z.string().trim().min(2).max(80),
  postalCode: z.string().trim().min(3).max(15),
  note: z.string().max(300).optional(),
  paymentMethod: z.enum(["cod", "manual", "online"]),
});
export type CheckoutInput = z.infer<typeof checkoutSchema>;

export const trackOrderSchema = z.object({
  orderId: z.string().trim().min(3, "Order ID required"),
  contact: z.string().trim().min(5, "Email or phone required"),
});
