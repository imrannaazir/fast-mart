import prismaDb from "@/lib/prismadb";
import { format } from "date-fns";

import ProductClient from "./components/product-client";
import { ProductColumn } from "./components/column";
import { formatter } from "@/lib/utils";

const ProductsPage = async ({ params }: { params: { storeId: string } }) => {
  const products = await prismaDb.product.findMany({
    where: {
      storeId: params.storeId,
    },
    include: {
      category: true,
      color: true,
      size: true,
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  const formattedProducts: ProductColumn[] = products.map((product) => ({
    id: product.id,
    name: product.name,
    price: formatter.format(product.price),
    isFeatured: product.isFeatured,
    isArchived: product.isArchived,
    category: product.category.name,
    size: product.size.name,
    color: product.color.value,
    createdAt: format(product.createdAt, "MMMM do, yyyy"),
  }));
  return (
    <div className="flex-col">
      <div className="flex-1 space-y-4 p-8 pt-6">
        <ProductClient data={formattedProducts} />
      </div>
    </div>
  );
};

export default ProductsPage;
