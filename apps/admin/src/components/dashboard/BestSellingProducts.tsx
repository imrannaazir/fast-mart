import { columns } from "@/components/dataTable/product/columns";

import queryString from "query-string";
import { useGetAllProductQuery } from "@/redux/features/product/productApi";
import { ProductDataTable } from "@/components/dataTable/product/data-table";

const BestSellingProducts = () => {
  // invoke hooks

  const page = 1;
  const limit = 6;
  //   const sort = useAppSelector(selectSortBy) || "createdAt";
  //   const order = useAppSelector(selectOrderBy);
  //   const searchTerm = useAppSelector(selectSearchTerm);

  // query parameter
  const query = queryString.stringify({
    page,
    limit,
    // sort: order === "asc" ? `${sort}` : `-${sort}`,
    // searchTerm,
  });

  const { data, isFetching } = useGetAllProductQuery(query);

  const products = data?.data || [];
  return (
    <div className="bg-background rounded-xl p-[25px] duration-300 hover:-translate-y-1 hover:shadow-lg">
      <h3 className="mb-6 text-xl text-gray-700">Best Selling Products</h3>
      <ProductDataTable columns={columns} data={products} isLoading={isFetching} showHeader={false} />
    </div>
  );
};

export default BestSellingProducts;
