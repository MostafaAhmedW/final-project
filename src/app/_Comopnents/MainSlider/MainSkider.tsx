'use client'
import Image from "next/image";
import React from "react";
import Slider from "react-slick";
import img1 from "@/assets/images/slider-image-1.jpeg";
import img2 from "@/assets/images/slider-image-2.jpeg";
import img3 from "@/assets/images/slider-image-3.jpeg";
import grocery2 from "@/assets/images/grocery-banner-2.jpeg";
import slider from "@/assets/images/slider-2.jpeg";


export default function MainSkider({ showDots = true }) {
  const settings = {
    dots: showDots,
    dotsClass: "slick-dots custom-dots text-gray-800 dark:text-white",
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: false,
    autoplay: true,
    autoplaySpeed: 2000,
  };
  return (


    <div className="grid grid-cols-12 mt-14">


      <div className="col-span-10">

        <Slider {...settings} className="focus:outline-none">

          <div className="">
            <Image src={img1.src} alt={img1.src} width={1000} height={1000} className="w-full h-[400px] " />
          </div>
          <div className="">
            <Image src={img2.src} alt={img2.src} width={1000} height={1000} className="w-full h-[400px] " />
          </div>

          <div className="">
            <Image src={img3.src} alt={img3.src} width={1000} height={1000} className="w-full h-[400px] " />

          </div>


        </Slider>
      </div>

      <div className="col-span-2">

        <Image src={slider} alt="slider" width={1000} height={500} className="w-full h-[200px] " />
        <Image src={grocery2} alt="grocery2" width={1000} height={500} className="w-full h-[200px] " />


      </div>


    </div>


  );
}