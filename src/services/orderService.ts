import { orders } from "@/data/mock";
import { mockGet, mockPost } from "./api";
import type { Order } from "@/types/order";

export const orderService = {
  list: () => mockGet(orders),
  getById: (id: string) => mockGet(orders.find((o) => o.id === id)),
  track: (id: string) => mockGet(orders.find((o) => o.id.toLowerCase() === id.toLowerCase())),
  create: (order: Partial<Order>) => mockPost({
    ...order,
    id: `ORD-${Math.floor(1000 + Math.random() * 9000)}`,
    createdAt: new Date().toISOString(),
    status: "pending" as const,
    paymentStatus: "pending" as const,
  }),
  updateStatus: (id: string, status: Order["status"]) => mockPost({ id, status }),
};
