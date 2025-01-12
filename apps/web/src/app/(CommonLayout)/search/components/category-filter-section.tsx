import { TCategory } from "@repo/utils/types";
import { Skeleton } from "antd";
import { useSearchParams } from "next/navigation";
import { Suspense } from "react";
import FilterSection from "./FilterSection";

interface CategoryFilterSectionProps {
  categories: TCategory[];
}

function CategoryFilterSectionContent({ categories }: CategoryFilterSectionProps) {
  const searchParams = useSearchParams();

  const memoizedCategories = categories.map((category) => ({
    value: category._id!,
    label: category.title,
    count: category?.noOfProducts!,
  }));

  return (
    <FilterSection
      open={!!searchParams.get("categories")}
      initialValue={searchParams.get("categories")?.split(",") || []}
      title="Categories"
      name="categories"
      options={memoizedCategories}
    />
  );
}

export default function CategoryFilterSection({ categories }: CategoryFilterSectionProps) {
  return (
    <Suspense fallback={<CategoryFilterSkeleton />}>
      <CategoryFilterSectionContent categories={categories} />
    </Suspense>
  );
}

function CategoryFilterSkeleton() {
  return (
    <div className="space-y-2">
      <Skeleton className="h-6 w-24" />
      <Skeleton className="h-4 w-full" />
      <Skeleton className="h-4 w-full" />
      <Skeleton className="h-4 w-full" />
    </div>
  );
}
