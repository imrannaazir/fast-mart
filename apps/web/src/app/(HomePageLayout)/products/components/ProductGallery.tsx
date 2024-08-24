"use client";
import { useState } from "react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/thumbs";
import { Autoplay, Navigation, Thumbs } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import { Swiper as SwiperType } from "swiper/types";
import "../styles/productSlider.css";
import ReactImageMagnify from "react-image-magnify"; // Import the magnifier component
import AppMagnifier from "@/components/ui/AppMagnifier";

const sliderImages = [
  {
    id: 1,
    image: "https://themes.pixelstrap.com/fastkart/assets/images/fashion/product/23.jpg",
  },
];

const ProductGallery = () => {
  const [activeThumb, setActiveThumb] = useState<SwiperType | null>(null);
  return sliderImages?.length > 1 ? (
    <div className="h-full space-y-5">
      <Swiper
        loop={true}
        spaceBetween={10}
        navigation={true}
        modules={[Navigation, Thumbs]}
        grabCursor={true}
        thumbs={{ swiper: activeThumb }}
        autoplay={{
          delay: 3500,
          disableOnInteraction: false,
          pauseOnMouseEnter: true,
        }}
      >
        {sliderImages.map((image, index) => (
          <SwiperSlide key={image.id}>
            <AppMagnifier
              imageUrl={image?.image}
              largeImageUrl={image?.image}
              zoomFactor={2}
              imgAlt="image
      "
              glassDimension={250}
              glassBorderColor="#be9a35"
              glassBorderWidth={2}
            />
          </SwiperSlide>
        ))}
      </Swiper>
      <Swiper
        onSwiper={setActiveThumb}
        spaceBetween={14}
        slidesPerView={4}
        modules={[Thumbs, Autoplay]}
        autoplay={{
          delay: 3500,
          disableOnInteraction: false,
          pauseOnMouseEnter: true,
        }}
      >
        {sliderImages.map((image, index) => (
          <SwiperSlide key={image.id}>
            <div className="border-primary border-3 flex aspect-square items-center justify-center rounded-md border-none">
              <img
                src={image.image}
                className="h-full w-full rounded-[5px] object-fill object-center"
                alt={`Thumbnail image ${index + 1}`}
              />
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  ) : (
    <div className="aspect-square w-full">
      {" "}
      <AppMagnifier
        imageUrl={sliderImages[0]?.image as string}
        largeImageUrl={sliderImages[0]?.image as string}
        zoomFactor={2}
        imgAlt="image
"
        glassDimension={250}
        glassBorderColor="#be9a35"
        glassBorderWidth={2}
      />
    </div>
  );
};

export default ProductGallery;
