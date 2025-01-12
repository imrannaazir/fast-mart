"use client";

import AppBlogCard from "@/components/ui/AppBlogCard";
import { blogPosts } from "@/constants/db";
import { Carousel } from "antd";
import HomeSectionTop from "./HomeSectionTop";

const HomeFeaturedBlogs = () => {
  return (
    <section>
      <HomeSectionTop
        heading="Featured Blog"
        description="A virtual assistant collects the products from your list"
        className="mb-4"
      />

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
        {blogPosts.map((post) => (
          <div key={post?.id} className="px-4">
            <AppBlogCard post={post} />
          </div>
        ))}
      </Carousel>
    </section>
  );
};

export default HomeFeaturedBlogs;
