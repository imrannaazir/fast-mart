"use client";
import AppSlider from "@/components/ui/AppSlider";
import AppProductCard from "@/components/ui/ProductCard/AppProductCard";
import { SwiperSlide } from "swiper/react";

const ProductsSlider = () => {
  const breakpoints = {
    540: {
      slidesPerView: 2,
      spaceBetween: 10,
    },
    768: {
      slidesPerView: 3,
      spaceBetween: 0,
    },
    1024: {
      slidesPerView: 4,
      spaceBetween: 0,
    },
  };
  return (
    <AppSlider breakpoints={breakpoints} slidesPerView={1}>
      {Array.from({ length: 8 }).map((_item, i) => (
        <SwiperSlide key={i}>
          <AppProductCard />
        </SwiperSlide>
      ))}
    </AppSlider>
  );
};

export default ProductsSlider;
