import { useGetAllCollectionsQuery } from "@/redux/features/collection/collection.api";
import "@/styles/categorySlider.css";
import { Card, CardContent } from "../ui/card";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "../ui/carousel";
import Icon from "../ui/lucide-icon";
import { Skeleton } from "../ui/skeleton";
import { DashboardCardHeader } from "./card-header";

const DashboardCategory = () => {
  const { data, isFetching } = useGetAllCollectionsQuery("");
  const collections = data?.data || [];

  return (
    <Card className="group max-w-full">
      <DashboardCardHeader title="Categories" description="Browse top categories" />
      <CardContent>
        <Carousel
          opts={{
            align: "start",
          }}
          className="w-full"
        >
          <CarouselContent>
            {isFetching
              ? Array(10)
                  .fill(0)
                  .map((_item, index) => (
                    <CarouselItem key={index} className="basis-1/2 md:basis-1/2 lg:basis-1/6">
                      <CategoryCardSkeleton />
                    </CarouselItem>
                  ))
              : collections?.map((collection) => (
                  <CarouselItem key={collection?._id} className="basis-[100%] md:basis-1/2 lg:basis-1/6">
                    <CategoryCard iconName={collection?.icon || "Ban"} collectionName={collection?.title} />
                  </CarouselItem>
                ))}
          </CarouselContent>
          <div className="hidden group-hover:block">
            <CarouselPrevious className="left-0 opacity-0" />
            <CarouselNext className="right-0 opacity-0" />
          </div>
        </Carousel>
      </CardContent>
    </Card>
  );
};

const CategoryCard = ({ iconName, collectionName }: { iconName: string; collectionName: string }) => {
  return (
    <div className="group flex w-full max-w-[150px] cursor-pointer flex-col items-center">
      <div className="bg-accent text-accent-foreground hover:bg-primary hover:text-primary-foreground relative flex aspect-square w-full items-center justify-center overflow-hidden rounded-xl transition-all duration-300">
        <Icon
          size={42}
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          name={iconName as any}
          strokeWidth={1.5}
          className="transition-transform duration-300 group-hover:scale-110"
        />
        {/* Decorative elements */}
        <div className="bg-primary/5 absolute -right-4 -top-4 h-12 w-12 rounded-full" />
        <div className="bg-primary/5 absolute -bottom-4 -left-4 h-12 w-12 rounded-full" />
      </div>
      <span className="mt-3 w-full truncate text-center text-sm font-medium" title={collectionName}>
        {collectionName}
      </span>
    </div>
  );
};

const CategoryCardSkeleton = () => {
  return (
    <div className="flex w-full max-w-[150px] flex-col items-center">
      <Skeleton className="aspect-square w-full rounded-xl" />
      <Skeleton className="mt-3 h-4 w-3/4" />
    </div>
  );
};

export default DashboardCategory;
