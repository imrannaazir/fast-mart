/* eslint-disable @typescript-eslint/no-explicit-any */
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";

import "@/styles/categorySlider.css";
import { useGetAllCollectionsQuery } from "@/redux/features/collection/collection.api";
import Icon from "../ui/lucide-icon";

// import required modules

const DashboardCategory = () => {
  const { data, isFetching } = useGetAllCollectionsQuery("");
  const collections = data?.data || [];

  return (
    <section className="bg-background my-6 overflow-hidden rounded-xl p-[25px]">
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
          ? "Fetching"
          : collections?.map((collection) => (
              <SwiperSlide key={collection?._id}>
                <CategoryCard iconName={collection?.icon?.name || "combine"} />
              </SwiperSlide>
            ))}
      </Swiper>
    </section>
  );
};

export default DashboardCategory;

const CategoryCard = ({ iconName }: { iconName: string }) => {
  console.log(iconName);

  return (
    <div className="bg-gray-100">
      <Icon name={iconName as any} />
    </div>
  );
};
