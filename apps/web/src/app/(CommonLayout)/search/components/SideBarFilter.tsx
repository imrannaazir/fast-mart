"use client";
import { useFilterState } from "@/hooks/use-filter-state";
import { cn } from "@/libs/utils";
import { TBrand, TCategory, TCollection } from "@repo/utils/types";
import { Flex, Form } from "antd";
import Card from "antd/es/card/Card";
import { ClassValue } from "clsx";
import { useSearchParams } from "next/navigation";
import { FC, useMemo } from "react";
import SidebarSectionHeader from "../../components/SidebarSectionHeader";
import FilterSection from "./FilterSection";
import PriceRangeFilter from "./PriceRangeFilter";
import ClearFilterButton from "./clear-filter-button";

type TSideBarFilterProps = {
  maxPrice: number;
  brands: TBrand[];
  collections: TCollection[];
  categories: TCategory[];
  className?: ClassValue;
  header?: "hide" | "show";
};

const SideBarFilter: FC<TSideBarFilterProps> = ({
  maxPrice,
  brands,
  className,
  collections,
  categories,
  header = "show",
}) => {
  const searchParams = useSearchParams();
  const { form, handleValuesChanges, roundedMaxPrice } = useFilterState(maxPrice);

  const memoizedCollections = useMemo(
    () =>
      collections.map((collection) => ({
        value: collection._id!,
        label: collection.title,
        count: collection?.noOfProducts!,
      })),
    []
  );

  const memoizedCategories = useMemo(
    () =>
      categories.map((category) => ({
        value: category._id!,
        label: category.title,
        count: category?.noOfProducts!,
      })),
    []
  );

  const memoizedBrands = useMemo(
    () => brands.map((brand) => ({ value: brand?._id!, label: brand?.name, count: brand?.noOfProducts! })),
    []
  );

  const memoizedRatings = useMemo(
    () => [5, 4, 3, 2, 1].map((rating) => ({ value: rating, label: `${rating} Stars` })),
    []
  );

  return (
    <aside className={cn("mb-6 min-w-[300px]", className)}>
      <Form onValuesChange={handleValuesChanges} form={form} className="space-y-4">
        <Card className={cn(header === "hide" ? "hidden" : "block")} size="small">
          <Form.Item
            style={{
              margin: 0,
              padding: 0,
            }}
          >
            <Flex style={{ justifyContent: "space-between", alignItems: "center" }}>
              <SidebarSectionHeader border={false} level="Filter" className="text-base font-medium" />
              <ClearFilterButton maxPrice={maxPrice} />
            </Flex>
          </Form.Item>
        </Card>

        {/* price range */}
        <PriceRangeFilter
          maxPrice={roundedMaxPrice}
          maxRange={Number(searchParams.get("maxPrice")) || roundedMaxPrice}
          minRange={Number(searchParams.get("minPrice")) || 0}
        />

        <FilterSection
          open={!!searchParams.get("collections")}
          initialValue={searchParams.get("collections")?.split(",") || []}
          title="Collections"
          name="collections"
          options={memoizedCollections}
        />
        <FilterSection
          open={!!searchParams.get("categories")}
          initialValue={searchParams.get("categories")?.split(",") || []}
          title="Categories"
          name="categories"
          options={memoizedCategories}
        />
        <FilterSection
          open={!!searchParams.get("brands")}
          initialValue={searchParams.get("brands")?.split(",") || []}
          title="Brands"
          name="brands"
          options={memoizedBrands}
        />
        <FilterSection
          open={!!searchParams.get("ratings")}
          initialValue={searchParams.get("ratings")?.split(",") || []}
          title="Ratings"
          name="ratings"
          options={memoizedRatings}
          type="rate"
        />
      </Form>
    </aside>
  );
};

export default SideBarFilter;
