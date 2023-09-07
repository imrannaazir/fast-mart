import prismaDb from "@/lib/prismadb";

export const getStockCount = async (storeId: string) => {
  const stockCount = prismaDb.product.count({
    where: {
      storeId,
      isArchived: false,
    },
  });
  return stockCount;
};
