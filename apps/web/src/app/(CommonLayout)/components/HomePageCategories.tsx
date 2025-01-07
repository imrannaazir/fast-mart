"use client";
import { TCollectionDropdownItemProps } from "@/components/navbar/DropdownCategories";
import { Carousel } from "antd";
import HomePageCategoryCard from "./HomePageCategoryCard";

export default function HomePageCategories({ collections }: { collections: TCollectionDropdownItemProps[] }) {
  return (
    <div className="">
      <Carousel
        className="md pb-0 pt-6"
        autoplay
        dots={false}
        slidesToShow={5}
        responsive={[
          {
            breakpoint: 1280,
            settings: {
              slidesToShow: 6,
            },
          },
          {
            breakpoint: 1080,
            settings: {
              slidesToShow: 5,
            },
          },
          {
            breakpoint: 920,
            settings: {
              slidesToShow: 4,
            },
          },
          {
            breakpoint: 740,
            settings: {
              slidesToShow: 3,
            },
          },
          {
            breakpoint: 565,
            settings: {
              slidesToShow: 2,
            },
          },
          {
            breakpoint: 390,
            settings: {
              slidesToShow: 1.7,
            },
          },
        ]}
      >
        {collections?.map((collection) => <HomePageCategoryCard key={collection?.id} collection={collection} />)}
      </Carousel>
    </div>
  );
}
