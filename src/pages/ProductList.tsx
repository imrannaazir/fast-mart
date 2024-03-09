import { columns } from "@/components/dataTable/product/columns";
import { ProductDataTable } from "@/components/dataTable/product/data-table";
import { Button } from "@/components/ui/button";
import { useGetAllProductQuery } from "@/redux/features/product/productApi";
import { TProduct } from "@/types/product.type";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import queryString from "query-string";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import {
  selectCategory,
  selectConnectivity,
  selectFilteredBrands,
  selectFilteredStatus,
  selectLimit,
  selectOperatingSystems,
  selectPage,
  selectPowerSources,
  selectPriceRange,
  selectSearchTerm,
  selectTags,
  setMeta,
} from "@/redux/features/filter/filterSlice";

const ProductList = () => {
  // invoke hooks
  // redux store
  const searchTerm = useAppSelector(selectSearchTerm);
  const filteredStatus = useAppSelector(selectFilteredStatus);
  const filteredBrands = useAppSelector(selectFilteredBrands);
  const filteredCategories = useAppSelector(selectCategory);
  const filteredOperatingSystems = useAppSelector(selectOperatingSystems);
  const filteredPowerSources = useAppSelector(selectPowerSources);
  const filteredTags = useAppSelector(selectTags);
  const filteredConnectivity = useAppSelector(selectConnectivity);
  const page = useAppSelector(selectPage);
  const limit = useAppSelector(selectLimit);
  const [lowPrice, highPrice] = useAppSelector(selectPriceRange);

  // local state
  const [skip, setSkip] = useState(true);

  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  // query parameter
  const query = queryString.stringify({
    searchTerm,
    status: filteredStatus?.map((filter) => filter.value),
    brand: filteredBrands?.map((filter) => filter.value),
    category: filteredCategories?.map((filter) => filter.value),
    connectivity: filteredConnectivity?.map((filter) => filter.value),
    powerSource: filteredPowerSources?.map((filter) => filter.value),
    operatingSystem: filteredOperatingSystems?.map((filter) => filter.value),
    tags: filteredTags?.map((filter) => filter.value),
    page,
    limit,
    lowPrice,
    highPrice,
  });
  const { data } = useGetAllProductQuery(query, { skip });
  const products: TProduct[] = data?.data?.data || [];

  if (data?.data?.meta) {
    dispatch(setMeta(data?.data?.meta));
  }
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
