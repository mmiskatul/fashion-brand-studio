import { sellers, customers, coupons, auditLogs, securityLogs, banners } from "@/data/mock";
import { mockGet, mockPost } from "./api";

export const adminService = {
  sellers: () => mockGet(sellers),
  customers: () => mockGet(customers),
  coupons: () => mockGet(coupons),
  auditLogs: () => mockGet(auditLogs),
  securityLogs: () => mockGet(securityLogs),
  banners: () => mockGet(banners),
  createSeller: (data: any) => mockPost(data),
  createCoupon: (data: any) => mockPost(data),
};
