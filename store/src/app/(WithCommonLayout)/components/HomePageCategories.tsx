"use client";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import "../../../styles/slider.css";

// import required modules
import { Pagination, Autoplay } from "swiper/modules";
import HomePageCategoryCard from "./HomePageCategoryCard";

export default function HomePageCategories() {
  const pagination = {
    clickable: true,
    renderBullet: function (index: number, className: string) {
      return '<span class="' + className + '">' + "</span>";
    },
  };

  return (
    <div className="mt-6">
      <Swiper
        loop={true}
        slidesPerView={2}
        spaceBetween={10}
        autoplay={{
          delay: 2500,
          disableOnInteraction: false,
          pauseOnMouseEnter: true,
        }}
        pagination={pagination}
        modules={[Autoplay, Pagination]}
        className="mySwiper"
        breakpoints={{
          540: {
            slidesPerView: 3,
            spaceBetween: 10,
          },
          768: {
            slidesPerView: 4,
            spaceBetween: 0,
          },
          1024: {
            slidesPerView: 5,
            spaceBetween: 0,
          },
        }}
      >
        {Array.from({ length: 8 }).map((_item, i) => (
          <SwiperSlide key={i}>
            <HomePageCategoryCard />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}
