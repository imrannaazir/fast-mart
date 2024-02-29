import { columns } from "@/components/dataTable/product/columns";
import { ProductDataTable } from "@/components/dataTable/product/data-table";
import { Button } from "@/components/ui/button";
import { useGetAllProductQuery } from "@/redux/features/product/productApi";
import { TProduct } from "@/types/product";

const ProductList = () => {
  const { data } = useGetAllProductQuery(undefined);
  const products: TProduct[] = data?.data || [];
  console.log(products);

  return (
    <div>
      {/* header */}
      <div className="flex justify-between">
        <h3 className="text-xl font-semibold">Products</h3>
        <Button size={"sm"}>Add product</Button>
      </div>

      {/* product list */}
      <div className="container mx-auto py-10">
        <ProductDataTable columns={columns} data={products} />
      </div>
    </div>
  );
};

export default ProductList;
