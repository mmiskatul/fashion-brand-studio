export type OrderStatus = "pending" | "confirmed" | "processing" | "shipped" | "delivered" | "cancelled" | "returned";
export type PaymentStatus = "pending" | "paid" | "failed" | "refunded";
export type PaymentMethod = "cod" | "manual" | "online";

export type OrderItem = {
  productId: string;
  name: string;
  image: string;
  color: string;
  size: string;
  quantity: number;
  price: number;
};

export type Address = {
  name: string;
  phone: string;
  email: string;
  address: string;
  city: string;
  area: string;
  postalCode: string;
  note?: string;
};

export type Order = {
  id: string;
  customer: Address;
  items: OrderItem[];
  subtotal: number;
  discount: number;
  delivery: number;
  total: number;
  paymentMethod: PaymentMethod;
  paymentStatus: PaymentStatus;
  status: OrderStatus;
  sellerId?: string;
  couponCode?: string;
  createdAt: string;
  timeline: { status: OrderStatus; date: string; note?: string }[];
};
