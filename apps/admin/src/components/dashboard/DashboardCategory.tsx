import { useGetAllCollectionsQuery } from "@/redux/features/collection/collection.api";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";

import "@/styles/categorySlider.css";

// import required modules
import { Pagination } from "swiper/modules";

const DashboardCategory = () => {
  const { data, isFetching } = useGetAllCollectionsQuery("");

  const collections = data?.data || [];

  return (
    <section className="bg-background my-6 max-w-full rounded-xl">
      <Swiper
        breakpoints={{
          640: {
            slidesPerView: 2,
            spaceBetween: 20,
          },
          768: {
            slidesPerView: 4,
            spaceBetween: 40,
          },
          1024: {
            slidesPerView: 4,
            spaceBetween: 50,
          },
        }}
        className="mySwiper"
      >
        {collections?.map((collection) => (
          <SwiperSlide key={collection?._id}>
            <CategoryCard />
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  );
};

export default DashboardCategory;

const CategoryCard = () => {
  return <div className="bg-gray-500 p-6">Category Card</div>;
};
