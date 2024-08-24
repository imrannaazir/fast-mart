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
import { SwiperOptions } from "swiper/types";

type TAppSliderProps = {
  children: ReactNode;
  className?: ClassValue;
  slidesPerView: number;
  breakpoints:
    | {
        [width: number]: SwiperOptions;
        [ratio: string]: SwiperOptions;
      }
    | undefined;
};

const AppSlider: FC<TAppSliderProps> = ({ children, className, slidesPerView, breakpoints }) => {
  const prevRef = useRef<HTMLButtonElement>(null);
  const nextRef = useRef<HTMLButtonElement>(null);
  const swiperRef = useRef<SwiperCore | null>(null);

  useEffect(() => {
    if (prevRef.current && nextRef.current && swiperRef.current) {
      swiperRef.current.navigation.update();
    }
  }, []);
  return (
    <div className={cn("swiper-container relative", className)}>
      <Swiper
        onBeforeInit={(swiper) => {
          swiperRef.current = swiper;
          if (typeof swiper.params.navigation !== "boolean" && swiper.params.navigation) {
            swiper.params.navigation.prevEl = prevRef.current;
            swiper.params.navigation.nextEl = nextRef.current;
          }
          swiper.navigation.update();
        }}
        loop={true}
        slidesPerView={slidesPerView}
        breakpoints={breakpoints}
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
      <button ref={prevRef} className="custom-swiper-button-prev bg-primary rounded-full p-2 text-white">
        <FaAngleLeft />
      </button>
      <button ref={nextRef} className="custom-swiper-button-next bg-primary rounded-full p-2 text-white">
        <FaAngleRight />
      </button>
    </div>
  );
};

export default AppSlider;
