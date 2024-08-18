"use client";

import AppBlogCard from "@/components/ui/AppBlogCard";
import HomeSectionTop from "./HomeSectionTop";
import AppSlider from "@/components/ui/AppSlider";
import { SwiperSlide } from "swiper/react";

const HomeFeaturedBlogs = () => {
  const breakpoints = {
    540: {
      slidesPerView: 1,
      spaceBetween: 10,
    },
    768: {
      slidesPerView: 2,
      spaceBetween: 20,
    },
    1024: {
      slidesPerView: 3,
      spaceBetween: 20,
    },
    1280: {
      slidesPerView: 2,
      spaceBetween: 20,
    },
  };
  return (
    <section>
      <HomeSectionTop
        heading="Featured Blog"
        description="A virtual assistant collects the products from your list"
      />

      {/* blogs */}

      <AppSlider breakpoints={breakpoints} className="mt-4" slidesPerView={1}>
        {Array.from({ length: 5 }).map((_item, i) => (
          <SwiperSlide key={i}>
            <AppBlogCard />
          </SwiperSlide>
        ))}
      </AppSlider>
    </section>
  );
};

export default HomeFeaturedBlogs;
