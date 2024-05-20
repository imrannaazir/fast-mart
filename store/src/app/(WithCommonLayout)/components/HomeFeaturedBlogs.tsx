"use client";

import AppBlogCard from "@/components/ui/AppBlogCard";
import HomeSectionTop from "./HomeSectionTop";
import AppSlider from "@/components/ui/AppSlider";
import { SwiperSlide } from "swiper/react";

const HomeFeaturedBlogs = () => {
  return (
    <section>
      <HomeSectionTop
        heading="Featured Blog"
        description="A virtual assistant collects the products from your list"
      />

      {/* blogs */}

      <AppSlider className="mt-4" slidesPerView={2}>
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
