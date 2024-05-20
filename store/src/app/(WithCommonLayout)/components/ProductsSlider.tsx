"use client";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import "../../../styles/slider.css";
import SwiperCore from "swiper";

// import required modules
import { Navigation } from "swiper/modules";
import AppProductCard from "@/components/ui/ProductCard/AppProductCard";
import { useEffect, useRef } from "react";
import { FaAngleLeft, FaAngleRight } from "react-icons/fa";

export default function ProductsSlider() {
  const prevRef = useRef<HTMLButtonElement>(null);
  const nextRef = useRef<HTMLButtonElement>(null);
  const swiperRef = useRef<SwiperCore | null>(null);

  useEffect(() => {
    if (prevRef.current && nextRef.current && swiperRef.current) {
      swiperRef.current.navigation.update();
    }
  }, []);

  return (
    <div className="relative swiper-container ">
      <Swiper
        onBeforeInit={(swiper) => {
          swiperRef.current = swiper;
          if (
            typeof swiper.params.navigation !== "boolean" &&
            swiper.params.navigation
          ) {
            swiper.params.navigation.prevEl = prevRef.current;
            swiper.params.navigation.nextEl = nextRef.current;
          }
          swiper.navigation.update();
        }}
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
      <button
        ref={prevRef}
        className="custom-swiper-button-prev bg-primary text-white p-2 rounded-full"
      >
        <FaAngleLeft />
      </button>
      <button
        ref={nextRef}
        className="custom-swiper-button-next bg-primary text-white p-2 rounded-full"
      >
        <FaAngleRight />
      </button>
    </div>
  );
}
