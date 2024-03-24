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
  setPriceRange,
} from "@/redux/features/filter/filterSlice";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { useGetAllBrandsQuery } from "@/redux/features/brand/brandApi";
import { TCollection } from "@/types/product.type";
import { useGetAllCategoriesQuery } from "@/redux/features/category/categoryApi";
import { useGetAllConnectivityQuery } from "@/redux/features/connectivity/connectivityApi";
import { useGetAllPowerSourcesQuery } from "@/redux/features/powerSource/powerSourceApi";
import { useGetAllOperatingSystemsQuery } from "@/redux/features/operatingSystem/operatingSystemApi";
import { useGetAllTagQuery } from "@/redux/features/tag/tagApi";
import { Slider } from "./price-limit-filter";
import {
  useDeleteBulkProductsMutation,
  useGetHighestProductPriceQuery,
} from "@/redux/features/product/productApi";
import { useEffect, useState } from "react";
import { selectSelectedProducts } from "@/redux/features/product/productSlice";
import { Trash2 } from "lucide-react";
import AlertModal from "@/components/modal/alert-modal";
import { toast } from "sonner";
("./price-limit-filter");
const ProductDataTableToolbar = () => {
  const dispatch = useAppDispatch();
  const handleRangeChange = (value: number[]) => {
    dispatch(setPriceRange(value));
  };
  //invoked hooks
  const [isOpen, setIsOpen] = useState(false);
  const [isBulkDeleting, setIsBulkDeleting] = useState(false);
  // rtk query api hooks
  const [deleteBulkProducts] = useDeleteBulkProductsMutation();

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
  const { data: highestProductPriceData, isLoading: isHighPriceLoading } =
    useGetHighestProductPriceQuery(undefined);
  const highRange = highestProductPriceData?.data?.highRange;
  // redux store data
  const searchTerm = useAppSelector(selectSearchTerm);
  const selectedStatus = useAppSelector(selectFilteredStatus);
  const selectedBrands = useAppSelector(selectFilteredBrands);
  const selectedCategories = useAppSelector(selectCategory);
  const selectedOperatingSystems = useAppSelector(selectOperatingSystems);
  const selectedPowerSources = useAppSelector(selectPowerSources);
  const selectedTags = useAppSelector(selectTags);
  const selectedConnectivity = useAppSelector(selectConnectivity);
  const selectedProducts = useAppSelector(selectSelectedProducts);

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

  // on delete handler
  const onDelete = async () => {
    setIsBulkDeleting(true);
    const toastId = toast.loading("Deleting selected products.", {
      duration: 200,
    });
    try {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const response: any = await deleteBulkProducts({ ids: selectedProducts });
      if (response.data.data.deletedProductCount > 0) {
        toast.success(
          `Successfully deleted ${response.data.data.deletedProductCount} products.`,
          { id: toastId }
        );
      } else {
        toast.error("Failed to delete products.", { id: toastId });
      }
      setIsOpen(false);
      setIsBulkDeleting(false);
    } catch (error) {
      toast.error("Failed to delete products.", { id: toastId });
      setIsBulkDeleting(false);
    }
  };

  useEffect(() => {
    if (highRange) {
      dispatch(setPriceRange([0, highRange]));
    }
  }, [dispatch, highRange]);

  if (isHighPriceLoading) {
    return <p>Loading...</p>;
  }

  return (
    <>
      <AlertModal
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        isLoading={isBulkDeleting}
        onConfirm={onDelete}
      />
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
            <div className=" flex justify-between">
              <div className="space-x-2">
                {highRange && (
                  <Slider
                    minStepsBetweenThumbs={1}
                    max={highRange}
                    min={0}
                    step={10}
                    value={[0, highRange]}
                    onValueChange={handleRangeChange}
                    formatLabel={(value) => `$${value} `}
                  />
                )}
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

              {/* bulk delete */}
              {selectedProducts?.length > 0 && (
                <Button
                  onClick={() => setIsOpen(true)}
                  size={"sm"}
                  className="flex items-center gap-2"
                  variant={"destructive"}
                >
                  Bulk
                  <Trash2 size={14} />
                </Button>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ProductDataTableToolbar;
