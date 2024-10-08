import { Skeleton } from "@/components/ui/skeleton";

const IconLoader = () => {
  // create 100 length array
  const skeletonArray = Array.from({ length: 100 });

  return (
    <div className="flex flex-wrap gap-4 py-4">
      {skeletonArray.map((_, i) => (
        <Skeleton key={i} className="h-10 w-10 rounded-md" />
      ))}
    </div>
  );
};

export default IconLoader;
