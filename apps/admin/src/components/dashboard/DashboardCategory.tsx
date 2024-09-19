/* eslint-disable @typescript-eslint/no-explicit-any */
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";

import "@/styles/categorySlider.css";
import { useGetAllCollectionsQuery } from "@/redux/features/collection/collection.api";
import Icon from "../ui/lucide-icon";
import { Skeleton } from "../ui/skeleton";

// import required modules

const DashboardCategory = () => {
  const { data, isFetching } = useGetAllCollectionsQuery("");
  const collections = data?.data || [];

  return (
    <section className="bg-background my-6 overflow-hidden rounded-xl p-[25px] duration-300 hover:-translate-y-1 hover:shadow-sm">
      <h3 className="mb-3 text-lg text-gray-700">Category</h3>
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

export default DashboardCategory;

const CategoryCard = ({ iconName, collectionName }: { iconName: string; collectionName: string }) => {
  return (
    <div className="flex w-full max-w-[150px] cursor-pointer flex-col items-center">
      <div className="flex aspect-square w-full items-center justify-center rounded-xl bg-gray-100 from-green-700 to-green-300 text-gray-600 transition-colors duration-300 hover:bg-gradient-to-tl hover:text-white">
        <Icon size={49} name={iconName as any} strokeWidth={1} />
      </div>
      <span className="mt-2 w-full truncate text-center" title={collectionName}>
        {collectionName}
      </span>
    </div>
  );
};

const CategoryCardSkeleton = () => {
  return (
    <div className="flex w-full max-w-[150px] cursor-pointer flex-col items-center">
      <Skeleton className="aspect-square w-full rounded-xl" />
      <Skeleton className="mt-2 h-4 w-full" />
    </div>
  );
};
