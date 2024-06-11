"use client";
import AppSlider from "@/components/ui/AppSlider";
import AppProductCard from "@/components/ui/ProductCard/AppProductCard";
import { TAppProductCardProps } from "@/types";
import { SwiperSlide } from "swiper/react";

const ProductsSlider = ({ products }: { products: TAppProductCardProps[] }) => {
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
      {products?.map((product) => (
        <SwiperSlide key={product?.id}>
          <AppProductCard product={product} />
        </SwiperSlide>
      ))}
    </AppSlider>
  );
};

export default ProductsSlider;
