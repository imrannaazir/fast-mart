"use client";
// Import Swiper React components
import { Swiper } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import "../../styles/slider.css";
import SwiperCore from "swiper";

// import required modules
import { Navigation } from "swiper/modules";
import { FC, ReactNode, useEffect, useRef } from "react";
import { FaAngleLeft, FaAngleRight } from "react-icons/fa";
import { ClassValue } from "clsx";
import { cn } from "@/libs/utils";

type TAppSliderProps = {
  children: ReactNode;
  className?: ClassValue;
  slidesPerView: number;
};

const AppSlider: FC<TAppSliderProps> = ({
  children,
  className,
  slidesPerView,
}) => {
  const prevRef = useRef<HTMLButtonElement>(null);
  const nextRef = useRef<HTMLButtonElement>(null);
  const swiperRef = useRef<SwiperCore | null>(null);

  useEffect(() => {
    if (prevRef.current && nextRef.current && swiperRef.current) {
      swiperRef.current.navigation.update();
    }
  }, []);
  return (
    <div className={cn("relative swiper-container ", className)}>
      <Swiper
        onBeforeInit={(swiper) => {
          swiperRef.current = swiper;
          if (
            typeof swiper.params.navigation !== "boolean" &&
            swiper.params.navigation
          ) {
            swiper.params.navigation.prevEl = prevRef.current;
            swiper.params.navigation.nextEl = nextRef.current;
          }
          swiper.navigation.update();
        }}
        loop={true}
        slidesPerView={slidesPerView}
        navigation={{
          prevEl: prevRef.current,
          nextEl: nextRef.current,
        }}
        centeredSlides={false}
        spaceBetween={9}
        modules={[Navigation]}
        className="mySwiper"
      >
        {children}
      </Swiper>
      <button
        ref={prevRef}
        className="custom-swiper-button-prev bg-primary text-white p-2 rounded-full"
      >
        <FaAngleLeft />
      </button>
      <button
        ref={nextRef}
        className="custom-swiper-button-next bg-primary text-white p-2 rounded-full"
      >
        <FaAngleRight />
      </button>
    </div>
  );
};

export default AppSlider;
