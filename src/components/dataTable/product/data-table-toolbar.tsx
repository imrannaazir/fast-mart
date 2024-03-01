import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { MixerHorizontalIcon } from "@radix-ui/react-icons";
import { DataTableFacetedFilter } from "./data-table-faceted-filter";

import {
  CheckCircledIcon,
  QuestionMarkCircledIcon,
} from "@radix-ui/react-icons";
import {
  TFilter,
  addBrand,
  addStatus,
  clearBrand,
  clearStatus,
  removeBrand,
  removeStatus,
  selectFilteredBrands,
  selectFilteredStatus,
  selectSearchTerm,
  updateSearchTerm,
} from "@/redux/features/filter/filterSlice";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { useGetAllBrandsQuery } from "@/redux/features/brand/brandApi";
import { TCollection } from "@/types/product";

const ProductDataTableToolbar = () => {
  //invoked hooks
  const dispatch = useAppDispatch();

  // rtk query api hooks
  const { data, isLoading: isBrandLoading } = useGetAllBrandsQuery(undefined);

  // redux store data
  const selectedStatus = useAppSelector(selectFilteredStatus);
  const selectedBrands = useAppSelector(selectFilteredBrands);
  const searchTerm = useAppSelector(selectSearchTerm);

  const brands: TFilter[] = !isBrandLoading
    ? data?.data?.map((brand: TCollection) => ({
        label: brand.name,
        value: brand?._id,
      }))
    : [];

  const statuses = [
    {
      value: "in-stock",
      label: "In stock",
      icon: CheckCircledIcon,
    },
    {
      value: "out-of-stock",
      label: "Out of stock",
      icon: QuestionMarkCircledIcon,
    },
  ];

  return (
    <div className="flex items-center justify-between border p-2 rounded-md">
      <div className="flex flex-1 items-center space-x-2">
        <div className="space-y-2 w-full">
          {/* search and sort */}
          <div className="flex items-center justify-between w-full">
            <Input
              placeholder="Filter product..."
              value={searchTerm}
              onChange={(e) => dispatch(updateSearchTerm(e.target.value))}
              className="h-8 w-[150px] lg:w-[250px]"
            />
            <Button
              variant="outline"
              size="sm"
              className="ml-auto hidden h-8 lg:flex"
            >
              <MixerHorizontalIcon className="mr-2 h-4 w-4" />
              Sort
            </Button>
          </div>

          {/* filters */}
          <div className="space-x-2">
            {/* status filters  */}
            <DataTableFacetedFilter
              selectedValues={selectedStatus}
              clearFilter={clearStatus}
              addFilter={addStatus}
              removeFilter={removeStatus}
              title="Status"
              options={statuses}
            />
            {/* brand filters  */}
            <DataTableFacetedFilter
              selectedValues={selectedBrands}
              clearFilter={clearBrand}
              addFilter={addBrand}
              removeFilter={removeBrand}
              title="Brands"
              options={brands}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDataTableToolbar;
