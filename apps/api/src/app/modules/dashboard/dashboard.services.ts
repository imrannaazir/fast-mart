import { ProductStatus, Role } from '@repo/utils/constants';
import { TDashboardInsights } from '@repo/utils/types';
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

const DashboardServices = { getDashboardInsights };
export default DashboardServices;
