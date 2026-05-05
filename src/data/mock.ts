import type { Order } from "@/types/order";
import type { Seller, Customer, Coupon } from "@/types/user";
import { products } from "./products";

const statuses = ["pending","confirmed","processing","shipped","delivered","cancelled"] as const;

export const sellers: Seller[] = Array.from({ length: 6 }).map((_, i) => ({
  id: `s${i + 1}`,
  name: ["Aiden Carter","Maya Singh","Leo Chen","Noor Ali","Ethan Brooks","Sara Khan"][i],
  email: `seller${i + 1}@brand.com`,
  phone: `+1 555 010${i}${i}${i}`,
  status: i === 5 ? "disabled" : "active",
  permissions: ["view_orders","update_status"],
  joinedAt: new Date(Date.now() - i * 86400000 * 30).toISOString(),
  totalSales: 12000 + i * 4500,
  ordersHandled: 60 + i * 12,
}));

export const customers: Customer[] = Array.from({ length: 12 }).map((_, i) => ({
  id: `cu${i + 1}`,
  name: ["James W.","Olivia R.","Liam P.","Emma S.","Noah K.","Ava L.","Mia T.","Lucas D.","Sophia M.","Jack H.","Isla B.","Ben C."][i],
  email: `customer${i + 1}@mail.com`,
  phone: `+1 555 020${i}${i}`,
  totalOrders: 1 + (i % 7),
  totalSpent: 150 + i * 87,
  joinedAt: new Date(Date.now() - i * 86400000 * 12).toISOString(),
}));

export const coupons: Coupon[] = [
  { id: "cp1", code: "WELCOME10", discountType: "percent", discountValue: 10, minOrder: 50, usageLimit: 500, usedCount: 132, startDate: "2025-01-01", endDate: "2026-12-31", status: "active" },
  { id: "cp2", code: "AUTUMN25", discountType: "percent", discountValue: 25, minOrder: 120, usageLimit: 200, usedCount: 88, startDate: "2025-09-01", endDate: "2025-12-01", status: "active" },
  { id: "cp3", code: "FLAT15", discountType: "fixed", discountValue: 15, minOrder: 80, usageLimit: 1000, usedCount: 412, startDate: "2025-01-01", endDate: "2026-06-30", status: "active" },
  { id: "cp4", code: "BLACKWEEK", discountType: "percent", discountValue: 30, minOrder: 200, usageLimit: 300, usedCount: 300, startDate: "2024-11-20", endDate: "2024-12-01", status: "disabled" },
];

export const orders: Order[] = Array.from({ length: 18 }).map((_, i) => {
  const product = products[i % products.length];
  const qty = 1 + (i % 3);
  const price = product.discountPrice ?? product.price;
  const subtotal = price * qty;
  const discount = i % 4 === 0 ? Math.round(subtotal * 0.1) : 0;
  const delivery = subtotal > 100 ? 0 : 8;
  return {
    id: `ORD-${1000 + i}`,
    customer: {
      name: customers[i % customers.length].name,
      phone: customers[i % customers.length].phone,
      email: customers[i % customers.length].email,
      address: `${100 + i} Market Street`,
      city: "New York",
      area: "Manhattan",
      postalCode: `1000${i % 10}`,
    },
    items: [{
      productId: product.id,
      name: product.name,
      image: product.images[0],
      color: product.colors[0].name,
      size: product.sizes[0],
      quantity: qty,
      price,
    }],
    subtotal,
    discount,
    delivery,
    total: subtotal - discount + delivery,
    paymentMethod: (["cod","manual","online"] as const)[i % 3],
    paymentStatus: i % 4 === 0 ? "pending" : "paid",
    status: statuses[i % statuses.length],
    sellerId: sellers[i % sellers.length].id,
    couponCode: discount ? "WELCOME10" : undefined,
    createdAt: new Date(Date.now() - i * 86400000).toISOString(),
    timeline: [
      { status: "pending", date: new Date(Date.now() - i * 86400000).toISOString() },
      ...(i % statuses.length >= 1 ? [{ status: "confirmed" as const, date: new Date(Date.now() - i * 86400000 + 3600000).toISOString() }] : []),
      ...(i % statuses.length >= 2 ? [{ status: "processing" as const, date: new Date(Date.now() - i * 86400000 + 7200000).toISOString() }] : []),
      ...(i % statuses.length >= 3 ? [{ status: "shipped" as const, date: new Date(Date.now() - i * 86400000 + 14400000).toISOString() }] : []),
      ...(i % statuses.length >= 4 ? [{ status: "delivered" as const, date: new Date(Date.now() - i * 86400000 + 86400000).toISOString() }] : []),
    ],
  };
});

export const auditLogs = Array.from({ length: 14 }).map((_, i) => ({
  id: `al${i}`,
  user: ["admin","admin","seller1","admin","seller2"][i % 5],
  action: ["Updated product","Created coupon","Updated order status","Disabled seller","Changed settings"][i % 5],
  target: ["Essential Cotton Tee","WELCOME10","ORD-1003","seller6","Brand name"][i % 5],
  date: new Date(Date.now() - i * 3600000).toISOString(),
}));

export const securityLogs = Array.from({ length: 10 }).map((_, i) => ({
  id: `sl${i}`,
  user: i % 2 ? "admin" : "seller3",
  event: ["Login success","Login failed","Password changed","Permission updated","Login success"][i % 5],
  ip: `192.168.${i}.${10 + i}`,
  date: new Date(Date.now() - i * 7200000).toISOString(),
}));

export const banners = [
  { id: "b1", title: "Autumn Collection 2025", subtitle: "Warm tones, soft fabrics", image: "https://images.unsplash.com/photo-1490481651871-ab68de25d43d?auto=format&fit=crop&w=1600&q=80", active: true, position: "hero" },
  { id: "b2", title: "Free shipping over $100", subtitle: "Limited time", image: "", active: true, position: "promo" },
];
