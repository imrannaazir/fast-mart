"use client";

import AppBlogCard from "@/components/ui/AppBlogCard";
import { Carousel } from "antd";
import HomeSectionTop from "./HomeSectionTop";

const HomeFeaturedBlogs = () => {
  return (
    <section>
      <HomeSectionTop heading="Featured Blog" description="A virtual assistant collects the products from your list" />

      <div className=" ">
        <Carousel
          className=""
          autoplay
          dots={{ className: "custom-dots" }}
          slidesToShow={3}
          responsive={[
            {
              breakpoint: 1024,
              settings: {
                slidesToShow: 2,
              },
            },
            {
              breakpoint: 640,
              settings: {
                slidesToShow: 1,
              },
            },
          ]}
        >
          {[...Array(5)].map((_, i) => (
            <div className="px-4">
              <AppBlogCard key={i} />
            </div>
          ))}
        </Carousel>
      </div>
    </section>
  );
};

export default HomeFeaturedBlogs;
