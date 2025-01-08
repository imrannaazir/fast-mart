"use client";
import { cn } from "@/libs/utils";
import { TImage } from "@repo/utils/types";
import { Button, Carousel } from "antd";
import { CarouselRef } from "antd/es/carousel";
import { ClassValue } from "clsx";
import { ChevronLeft, ChevronRight } from "lucide-react";
import Image from "next/image";
import { FC, useRef, useState } from "react";
import ZoomableImage from "./zoomable-image";

type TProductGalleryProps = {
  media: TImage[];
  className?: ClassValue;
};
const ProductImageGallery: FC<TProductGalleryProps> = ({ media, className }) => {
  const sliderImages = media?.length ? media.map((image) => image.url) : ["/images/blank-image.png"];
  const carouselRef = useRef<CarouselRef>(null);
  const [currentSlide, setCurrentSlide] = useState(0);

  const goPrevSlide = () => {
    carouselRef.current?.prev();
  };
  const goNextSlide = () => {
    carouselRef.current?.next();
  };

  const handleThumbnailClick = (index: number) => {
    carouselRef.current?.goTo(index);
    setCurrentSlide(index);
  };

  return (
    <div className={cn("h-fit max-w-4xl rounded-md border p-2", className)}>
      <div className="relative">
        <Carousel
          beforeChange={(_currentSlide, nextSlide) => {
            setCurrentSlide(nextSlide);
          }}
          ref={carouselRef}
          dots={false}
        >
          {sliderImages?.map((img, i) => <ZoomableImage url={img} key={i} />)}
        </Carousel>
        <Button
          onClick={goPrevSlide}
          shape="circle"
          type="primary"
          color="primary"
          className="absolute left-2 top-1/2"
          icon={<ChevronLeft size={14} />}
        />

        <Button
          onClick={goNextSlide}
          shape="circle"
          type="primary"
          color="primary"
          className="absolute right-2 top-1/2"
          icon={<ChevronRight size={14} />}
        />
      </div>
      <div className="no-scrollbar mt-2 flex gap-2 overflow-x-auto">
        {sliderImages?.map((img, i) => (
          <div key={i}>
            <Button
              className={cn("h-20 w-20 p-1", i === currentSlide && "border-primary")}
              onClick={() => handleThumbnailClick(i)}
            >
              <Image
                className="h-full w-full rounded-[4px] object-cover"
                src={img}
                key={i}
                height={80}
                width={80}
                alt={`product image ${i}`}
              />
            </Button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductImageGallery;
