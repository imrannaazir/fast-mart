import { Months } from "../constants/global.constants";

export type TDashboardInsights = {
  totalCustomers: number;
  totalProducts: number;
  totalOrders: number;
  totalRevenue: number;
};

export type TMonth = (typeof Months)[keyof typeof Months];

export type TCustomerInsights = {
  active: number;
  pending: number;
  blocked: number;
};

export type TRevenueReport = {
  year: number;
  month: TMonth;
  revenue: number;
};
