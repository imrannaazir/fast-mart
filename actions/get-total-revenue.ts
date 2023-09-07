import prismaDb from "@/lib/prismadb";

export const getTotalRevenue = async (storeId: string) => {
  const paidOrder = await prismaDb.order.findMany({
    where: {
      storeId,
      isPaid: true,
    },
    include: {
      orderItems: {
        include: {
          product: true,
        },
      },
    },
  });

  const totalRevenue = paidOrder.reduce((total, order) => {
    const orderTotal = order.orderItems.reduce((orderSum, item) => {
      return orderSum + Number(item.product.price);
    }, 0);
    return total + orderTotal;
  }, 0);

  return totalRevenue;
};
