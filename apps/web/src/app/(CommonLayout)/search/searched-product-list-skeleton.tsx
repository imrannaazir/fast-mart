"use client";
import AppProductCardSkeleton from "@/components/ui/ProductCard/app-product-card-skeleton";
import { Skeleton } from "antd";

const SearchedProductListSkeleton = () => {
  return (
    <section className="space-y-6">
      <div className="flex justify-between">
        <Skeleton.Input size="small" active />
        <Skeleton.Input size="small" active />
      </div>

      <div className="grid grid-cols-1 gap-x-6 gap-y-3 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4">
        {Array.from({ length: 12 })?.map((_, i) => <AppProductCardSkeleton key={i} />)}
      </div>
    </section>
  );
};

export default SearchedProductListSkeleton;
