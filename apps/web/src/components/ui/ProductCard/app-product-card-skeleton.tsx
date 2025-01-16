"use client";

import { cn } from "@/libs/utils";

const AppProductCardSkeleton = () => {
  return (
    <div className={cn("group min-w-[224px] rounded-lg border p-3 text-start text-sm shadow-sm")}>
      {/* image skeleton */}
      <div className="relative mx-auto flex items-center justify-center">
        <div className="aspect-[16/14] w-full animate-pulse rounded-sm bg-gray-200" />
      </div>
      {/* info skeleton */}
      <div className="mt-2 flex flex-col justify-between gap-2">
        {/* title skeleton */}
        <div className="h-5 w-3/4 animate-pulse rounded bg-gray-200" />

        <div className="space-y-1">
          {/* price skeleton */}
          <div className="space-x-2">
            <div className="inline-block h-5 w-16 animate-pulse rounded bg-gray-200" />
            <div className="inline-block h-4 w-12 animate-pulse rounded bg-gray-200" />
          </div>
          {/* review skeleton */}
          <div className="flex items-center space-x-1">
            {[...Array(5)].map((_, index) => (
              <div key={index} className="h-4 w-4 animate-pulse rounded-full bg-gray-200" />
            ))}
            <div className="ml-2 h-4 w-8 animate-pulse rounded bg-gray-200" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default AppProductCardSkeleton;
