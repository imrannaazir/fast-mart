"use client";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import "../../../styles/slider.css";

// import required modules
import { Navigation } from "swiper/modules";
import AppProductCard from "@/components/ui/ProductCard/AppProductCard";
import { useRef } from "react";
import { FaAngleLeft, FaAngleRight } from "react-icons/fa";

export default function ProductsSlider() {
  const prevRef = useRef(null);
  const nextRef = useRef(null);
  return (
    <div className="relative swiper-container ">
      <Swiper
        loop={true}
        slidesPerView={4}
        navigation={{
          prevEl: prevRef.current,
          nextEl: nextRef.current,
        }}
        centeredSlides={false}
        spaceBetween={9}
        modules={[Navigation]}
        className="mySwiper"
      >
        {Array.from({ length: 8 }).map((_item, i) => (
          <SwiperSlide key={i}>
            <AppProductCard />
          </SwiperSlide>
        ))}
      </Swiper>
      <div
        ref={prevRef}
        className="custom-swiper-button-prev bg-primary text-white p-2 rounded-full"
      >
        <FaAngleLeft />
      </div>
      <div
        ref={nextRef}
        className="custom-swiper-button-next bg-primary text-white p-2 rounded-full"
      >
        <FaAngleRight />
      </div>
    </div>
  );
}
