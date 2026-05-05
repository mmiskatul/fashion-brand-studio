export type Role = "customer" | "seller" | "admin";

export type Seller = {
  id: string;
  name: string;
  email: string;
  phone: string;
  status: "active" | "disabled";
  permissions: string[];
  joinedAt: string;
  totalSales: number;
  ordersHandled: number;
};

export type Customer = {
  id: string;
  name: string;
  email: string;
  phone: string;
  totalOrders: number;
  totalSpent: number;
  joinedAt: string;
};

export type Coupon = {
  id: string;
  code: string;
  discountType: "percent" | "fixed";
  discountValue: number;
  minOrder: number;
  usageLimit: number;
  usedCount: number;
  startDate: string;
  endDate: string;
  status: "active" | "disabled";
};
