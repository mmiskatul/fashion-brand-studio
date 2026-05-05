import { orders } from "@/data/mock";
import { mockGet } from "./api";

export const sellerService = {
  myOrders: (sellerId: string) => mockGet(orders.filter((o) => o.sellerId === sellerId)),
  myStats: (sellerId: string) => {
    const mine = orders.filter((o) => o.sellerId === sellerId);
    const totalSales = mine.reduce((s, o) => s + o.total, 0);
    return mockGet({
      totalSales,
      totalOrders: mine.length,
      pending: mine.filter((o) => o.status === "pending").length,
      completed: mine.filter((o) => o.status === "delivered").length,
      todaySales: Math.round(totalSales * 0.08),
      monthlySales: Math.round(totalSales * 0.6),
    });
  },
};
