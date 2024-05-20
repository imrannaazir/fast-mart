"use client";
import AppSlider from "@/components/ui/AppSlider";
import AppProductCard from "@/components/ui/ProductCard/AppProductCard";
import { SwiperSlide } from "swiper/react";

const ProductsSlider = () => {
  return (
    <AppSlider slidesPerView={4}>
      {Array.from({ length: 8 }).map((_item, i) => (
        <SwiperSlide key={i}>
          <AppProductCard />
        </SwiperSlide>
      ))}
    </AppSlider>
  );
};

export default ProductsSlider;
