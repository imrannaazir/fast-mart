import { Skeleton } from "../ui/skeleton";

const RecentOrderItemSkeleton = () => {
  return (
    <div className="flex items-center">
      <Skeleton className="h-9 w-9 rounded-full" />

      <div className="ml-4 space-y-1">
        <Skeleton className="h-4 w-20" />
        <Skeleton className="h-3 w-28" />
      </div>
      <Skeleton className="ml-auto h-3 w-24" />
    </div>
  );
};

export default RecentOrderItemSkeleton;
