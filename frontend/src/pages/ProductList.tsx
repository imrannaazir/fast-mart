import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import queryString from "query-string";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import {
  selectCategory,
  selectFilteredBrands,
  selectFilteredStatus,
  selectLimit,
  selectPage,
  selectSearchTerm,
  selectTags,
  setMeta,
} from "@/redux/features/filter/filterSlice";
import { useGetAllProductQuery } from "@/redux/features/product/productApi";
import { TProduct } from "@/types/product.type";
import { Button } from "@/components/ui/button";

const ProductList = () => {
  // Redux store
  const searchTerm = useAppSelector(selectSearchTerm);
  const filteredStatus = useAppSelector(selectFilteredStatus);
  const filteredBrands = useAppSelector(selectFilteredBrands);
  const filteredCategories = useAppSelector(selectCategory);
  const filteredTags = useAppSelector(selectTags);
  const page = useAppSelector(selectPage);
  const limit = useAppSelector(selectLimit);

  // Local state
  const [skip, setSkip] = useState(true);

  // Query parameter
  const query = queryString.stringify({
    searchTerm,
    status: filteredStatus?.map((filter) => filter.value),
    brand: filteredBrands?.map((filter) => filter.value),
    category: filteredCategories?.map((filter) => filter.value),
    tags: filteredTags?.map((filter) => filter.value),
    page,
    limit,
  });

  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  // Fetch data
  const { data, isLoading } = useGetAllProductQuery(query, { skip });

  // Products
  const products: TProduct[] = data?.data?.data || [];

  // Update meta in store
  useEffect(() => {
    if (data?.data?.meta) {
      dispatch(setMeta(data?.data?.meta));
    }
  }, [data?.data?.meta, dispatch]);

  // Ensure data is fetched
  useEffect(() => {
    if (skip) {
      setSkip(false);
    }
  }, [query, skip]);

  // Loading state
  if (isLoading) {
    return <p>Loading...</p>;
  }

  // Render
  return (
    <div>
      {/* Header */}
      <div className="flex justify-between">
        <h3 className="text-xl font-semibold">Products</h3>
        <Button onClick={() => navigate("/products/new")} size={"sm"}>
          Add product
        </Button>
      </div>

      {/* Product list */}
      <div className="  mx-auto py-10">
        {/* <ProductDataTable columns={columns} data={products} /> */}
      </div>
    </div>
  );
};

export default ProductList;
