"use client";
import { TCollectionDropdownItemProps } from "@/components/navbar/DropdownCategories";
import { Carousel } from "antd";
import HomePageCategoryCard from "./HomePageCategoryCard";

export default function HomePageCategories({ collections }: { collections: TCollectionDropdownItemProps[] }) {
  return (
    <div className="mt-6">
      <Carousel
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
        {collections?.map((collection) => <HomePageCategoryCard key={collection?.id} collection={collection} />)}
      </Carousel>
    </div>
  );
}
