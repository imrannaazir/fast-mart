import { columns } from "@/components/dataTable/product/columns";
import { ProductDataTable } from "@/components/dataTable/product/data-table";
import { Button } from "@/components/ui/button";
import { useGetAllProductQuery } from "@/redux/features/product/productApi";
import { TProduct } from "@/types/product";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import queryString from "query-string";
import { useAppSelector } from "@/redux/hooks";
import {
  selectFilteredBrands,
  selectFilteredStatus,
  selectSearchTerm,
} from "@/redux/features/filter/filterSlice";

const ProductList = () => {
  // invoke hooks
  // redux store
  const searchTerm = useAppSelector(selectSearchTerm);
  const filteredStatus = useAppSelector(selectFilteredStatus);
  const filteredBrands = useAppSelector(selectFilteredBrands);

  // local state
  const [skip, setSkip] = useState(true);

  const navigate = useNavigate();

  // query parameter
  const query = queryString.stringify({
    status: filteredStatus?.map((filter) => filter.value),
    brand: filteredBrands?.map((filter) => filter.value),
    searchTerm,
  });
  const { data } = useGetAllProductQuery(query, { skip });
  const products: TProduct[] = data?.data?.data || [];

  // make skip  to get all product
  useEffect(() => {
    setSkip(false);
  }, [query]);

  return (
    <div>
      {/* header */}
      <div className="flex justify-between">
        <h3 className="text-xl font-semibold">Products</h3>
        <Button onClick={() => navigate("/add-product")} size={"sm"}>
          Add product
        </Button>
      </div>

      {/* product list */}
      <div className="container mx-auto py-10">
        <ProductDataTable columns={columns} data={products} />
      </div>
    </div>
  );
};

export default ProductList;
