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
  addCategory,
  addConnectivity,
  addOperatingSystems,
  addPowerSources,
  addStatus,
  addTag,
  clearBrand,
  clearCategories,
  clearConnectivity,
  clearOperatingSystem,
  clearPowerSources,
  clearStatus,
  clearTags,
  removeTag,
  removeBrand,
  removeCategory,
  removeConnectivity,
  removeOperatingSystems,
  removePowerSource,
  removeStatus,
  selectCategory,
  selectConnectivity,
  selectFilteredBrands,
  selectFilteredStatus,
  selectOperatingSystems,
  selectPowerSources,
  selectSearchTerm,
  selectTags,
  updateSearchTerm,
} from "@/redux/features/filter/filterSlice";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { useGetAllBrandsQuery } from "@/redux/features/brand/brandApi";
import { TCollection } from "@/types/product.type";
import { useGetAllCategoriesQuery } from "@/redux/features/category/categoryApi";
import { useGetAllConnectivityQuery } from "@/redux/features/connectivity/connectivityApi";
import { useGetAllPowerSourcesQuery } from "@/redux/features/powerSource/powerSourceApi";
import { useGetAllOperatingSystemsQuery } from "@/redux/features/operatingSystem/operatingSystemApi";
import { useGetAllTagQuery } from "@/redux/features/tag/tagApi";
// import { useGetAllFeatureNamesQuery } from "@/redux/features/featureName/featureNameApi";

const ProductDataTableToolbar = () => {
  //invoked hooks
  const dispatch = useAppDispatch();

  // rtk query api hooks
  const { data: brandsData, isLoading: isBrandLoading } =
    useGetAllBrandsQuery(undefined);
  const { data: categoryData, isLoading: isCategoriesLoading } =
    useGetAllCategoriesQuery(undefined);
  const { data: connectivityData, isLoading: isConnectivityLoading } =
    useGetAllConnectivityQuery(undefined);
  const { data: powerSourceData, isLoading: isPowerSourcesLoading } =
    useGetAllPowerSourcesQuery(undefined);
  const { data: operatingSystemData, isLoading: isOSLoading } =
    useGetAllOperatingSystemsQuery(undefined);
  const { data: tagData, isLoading: isTagsLoading } =
    useGetAllTagQuery(undefined);
  // const { data: featuresNamesData, isLoading:isFeatureNamesLoading } = useGetAllFeatureNamesQuery(undefined);

  // redux store data
  const searchTerm = useAppSelector(selectSearchTerm);
  const selectedStatus = useAppSelector(selectFilteredStatus);
  const selectedBrands = useAppSelector(selectFilteredBrands);
  const selectedCategories = useAppSelector(selectCategory);
  const selectedOperatingSystems = useAppSelector(selectOperatingSystems);
  const selectedPowerSources = useAppSelector(selectPowerSources);
  const selectedTags = useAppSelector(selectTags);
  const selectedConnectivity = useAppSelector(selectConnectivity);

  // restructured brands
  const brands: TFilter[] = !isBrandLoading
    ? brandsData?.data?.map((brand: TCollection) => ({
        label: brand.name,
        value: brand?._id,
      }))
    : [];

  // restructured categories
  const categories: TFilter[] = !isCategoriesLoading
    ? categoryData?.data?.map((category: TCollection) => ({
        label: category.name,
        value: category?._id,
      }))
    : [];
  // restructured connectivity
  const connectivity: TFilter[] = !isConnectivityLoading
    ? connectivityData?.data?.map((el: TCollection) => ({
        label: el.name,
        value: el?._id,
      }))
    : [];
  // restructured operating system
  const operatingSystems: TFilter[] = !isOSLoading
    ? operatingSystemData?.data?.map((el: TCollection) => ({
        label: el.name,
        value: el?._id,
      }))
    : [];
  // restructured operating system
  const powerSources: TFilter[] = !isPowerSourcesLoading
    ? powerSourceData?.data?.map((el: TCollection) => ({
        label: el.name,
        value: el?._id,
      }))
    : [];
  // restructured tags
  const tags: TFilter[] = !isTagsLoading
    ? tagData?.data?.map((el: TCollection) => ({
        label: el.name,
        value: el?._id,
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
            {/* category filters  */}
            <DataTableFacetedFilter
              selectedValues={selectedCategories}
              clearFilter={clearCategories}
              addFilter={addCategory}
              removeFilter={removeCategory}
              title="Categories"
              options={categories}
            />
            {/* connectivity filters  */}
            <DataTableFacetedFilter
              selectedValues={selectedConnectivity}
              clearFilter={clearConnectivity}
              addFilter={addConnectivity}
              removeFilter={removeConnectivity}
              title="Connectivity"
              options={connectivity}
            />
            {/* Operating system filters  */}
            <DataTableFacetedFilter
              selectedValues={selectedOperatingSystems}
              clearFilter={clearOperatingSystem}
              addFilter={addOperatingSystems}
              removeFilter={removeOperatingSystems}
              title="OS"
              options={operatingSystems}
            />
            {/* Power sources filters  */}
            <DataTableFacetedFilter
              selectedValues={selectedPowerSources}
              clearFilter={clearPowerSources}
              addFilter={addPowerSources}
              removeFilter={removePowerSource}
              title="Power"
              options={powerSources}
            />
            {/* Tags filters  */}
            <DataTableFacetedFilter
              selectedValues={selectedTags}
              clearFilter={clearTags}
              addFilter={addTag}
              removeFilter={removeTag}
              title="Tags"
              options={tags}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDataTableToolbar;
