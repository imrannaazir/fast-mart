import { Months, ProductStatus, Role, UserStatus } from '@repo/utils/constants';
import { TCustomerInsights, TDashboardInsights } from '@repo/utils/types';
import { Order } from '../order/order.model';
import Product from '../product/product.model';
import User from '../user/user.model';

const getDashboardInsights = async (): Promise<TDashboardInsights> => {
  const totalCustomers = await User.countDocuments({
    role: Role.USER,
  });

  const totalProducts = await Product.countDocuments({
    status: ProductStatus.ACTIVE,
  });

  const totalOrders = await Order.countDocuments({});

  const orders = await Order.aggregate([
    {
      $match: {
        // status: OrderStatus.PLACED,
      },
    },
    {
      $group: {
        _id: null,
        totalRevenue: { $sum: '$grossAmount' },
      },
    },
  ]);

  return {
    totalCustomers,
    totalOrders,
    totalProducts,
    totalRevenue: orders?.[0]?.totalRevenue,
  };
};

const getCustomerInsights = async (): Promise<TCustomerInsights> => {
  const active = await User.countDocuments({
    status: UserStatus.ACTIVE,
  });
  const pending = await User.countDocuments({
    status: UserStatus.PENDING,
  });
  const blocked = await User.countDocuments({
    status: UserStatus.BLOCKED,
  });

  return {
    active,
    pending,
    blocked,
  };
};

const getRevenueInMonths = async () => {
  const yearStartFrom = new Date();
  yearStartFrom.setFullYear(yearStartFrom.getFullYear() - 1);

  const revenueReport = await Order.aggregate([
    {
      $match: {
        createdAt: {
          $gte: yearStartFrom,
        },
      },
    },
    {
      $project: {
        grossAmount: 1,
        month: {
          $month: '$createdAt',
        },
        year: {
          $year: '$createdAt',
        },
      },
    },
    {
      $group: {
        _id: {
          year: '$year',
          month: '$month',
        },
        revenue: { $sum: '$grossAmount' },
      },
    },
    {
      $sort: {
        '_id.year': 1,
        '_id.month': 1,
      },
    },
    {
      $project: {
        year: '$_id.year',
        month: {
          $arrayElemAt: [
            Object.values(Months),
            { $subtract: ['$_id.month', 1] },
          ],
        },
        revenue: '$revenue',
        _id: 0,
      },
    },
  ]);

  return revenueReport;
};

const DashboardServices = {
  getDashboardInsights,
  getCustomerInsights,
  getRevenueInMonths,
};
export default DashboardServices;
