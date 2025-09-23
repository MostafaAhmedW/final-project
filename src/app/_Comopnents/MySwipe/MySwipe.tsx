"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Autoplay } from "swiper/modules"; 
import "swiper/css";
import "swiper/css/pagination";
import Image from "next/image";

export default function MySwiper({
  items,
  spaceBetween = 10,
  slidesPerView = 1,
  imageClass = "h-[400px] object-cover rounded-md"
}: {
  items: { image: string; name?: string }[];
  spaceBetween?: number;
  slidesPerView?: number;
  imageClass?: string;
}) {
  return (
    <Swiper
      modules={[Pagination, Autoplay]}
      spaceBetween={spaceBetween}
      slidesPerView={slidesPerView}
      loop={true}
      // pagination={{ clickable: false }} // النقاط (dots) تظهر هنا
      autoplay={{ delay: 3000, disableOnInteraction: false }}
      className="w-full cursor-pointe dark:text-white"
    >
      {items.map(({ image, name }) => (
        <SwiperSlide key={image} className="text-center">
          <Image width={1000} height={1000} src={image} className={`w-full ${imageClass}`} alt="Fresh cart" />
          {name && (
            <p className="mt-2 text-sm font-medium text-gray-700">
              {name}
            </p>
          )}
        </SwiperSlide>
      ))}
    </Swiper>
  );
}
