import { useGetAllCollectionsQuery } from "@/redux/features/collection/collection.api";
import "@/styles/categorySlider.css";
import "swiper/css";
import "swiper/css/pagination";
import { Swiper, SwiperSlide } from "swiper/react";
import Icon from "../ui/lucide-icon";
import { Skeleton } from "../ui/skeleton";

const DashboardCategory = () => {
  const { data, isFetching } = useGetAllCollectionsQuery("");
  const collections = data?.data || [];

  return (
    <section className="bg-card rounded-xl p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-md">
      <div className="mb-6 flex items-center justify-between">
        <h3 className="text-xl font-semibold tracking-tight">Categories</h3>
        <div className="bg-primary/10 h-1 w-16 rounded-full" />
      </div>

      <Swiper
        slidesPerView={3}
        spaceBetween={25}
        breakpoints={{
          640: {
            slidesPerView: 4,
            spaceBetween: 25,
          },
          768: {
            slidesPerView: 5,
            spaceBetween: 25,
          },
          1024: {
            slidesPerView: 10,
            spaceBetween: 25,
          },
        }}
        className="mySwiper"
      >
        {isFetching
          ? Array(10)
              .fill(0)
              .map((_item, index) => (
                <SwiperSlide key={index}>
                  <CategoryCardSkeleton />
                </SwiperSlide>
              ))
          : collections?.map((collection) => (
              <SwiperSlide key={collection?._id}>
                <CategoryCard iconName={collection?.icon?.name || "combine"} collectionName={collection?.title} />
              </SwiperSlide>
            ))}
      </Swiper>
    </section>
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
