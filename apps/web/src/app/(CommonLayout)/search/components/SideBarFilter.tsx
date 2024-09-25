"use client";
import React, { FC, useCallback, useMemo } from "react";
import { Button, Flex, Form } from "antd";
import Card from "antd/es/card/Card";
import SidebarSectionHeader from "../../components/SidebarSectionHeader";
import { collections } from "@/constants/db";
import { useRouter, useSearchParams } from "next/navigation";
import { filterableFields, useFilterState } from "@/hooks/use-filter-state";
import PriceRangeFilter from "./PriceRangeFilter";
import FilterSection from "./FilterSection";

type TSideBarFilterProps = {
  maxPrice: number;
};

const SideBarFilter: FC<TSideBarFilterProps> = ({ maxPrice }) => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { form, handleValuesChanges, clearFilters } = useFilterState(maxPrice);

  const memoizedCollections = useMemo(
    () => collections.map((c) => ({ value: c._id, label: c.title, count: c.noOfProducts })),
    []
  );

  const memoizedRatings = useMemo(
    () => [5, 4, 3, 2, 1].map((rating) => ({ value: rating, label: `${rating} Stars` })),
    []
  );

  // handle clear filters
  const handleClearFilter = useCallback(() => {
    clearFilters();
    const newParams = new URLSearchParams(searchParams.toString());
    filterableFields.forEach((field) => {
      newParams.delete(field);
    });
    router.push(`/search?${newParams}`, { scroll: false });
  }, []);
  return (
    <aside className="min-w-[300px]">
      <Form onValuesChange={handleValuesChanges} form={form} className="space-y-4">
        <Card size="small">
          <Form.Item
            style={{
              margin: 0,
              padding: 0,
            }}
          >
            <Flex style={{ justifyContent: "space-between" }}>
              <SidebarSectionHeader border={false} level="Filter" className="text-lg font-medium" />
              <Button className="text-primary m-0 p-0 font-semibold" type="link" onClick={handleClearFilter}>
                Clear All
              </Button>
            </Flex>
          </Form.Item>
        </Card>

        {/* price range */}
        <PriceRangeFilter maxPrice={maxPrice} />

        <FilterSection title="Collections" name="collections" options={memoizedCollections} />
        <FilterSection title="Categories" name="categories" options={memoizedCollections} />
        <FilterSection title="Brands" name="brands" options={memoizedCollections} />
        <FilterSection title="Ratings" name="ratings" options={memoizedRatings} type="rate" />
      </Form>
    </aside>
  );
};

export default SideBarFilter;
