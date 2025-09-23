'use client';
import Image from "next/image";
import React from "react";
import Slider from "react-slick";


export default function ProductSlider( { images }: { images: string[] })  {

    const settings = {
    dots: true,
    dotsClass: "slick-dots custom-dots text-gray-800 dark:text-white",
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows:false,
    autoplay:true,
    autoplaySpeed:1800 ,
        appendDots: (dots: React.ReactNode) => (
      <ul className="flex justify-center">{dots}</ul>
    ),
    customPaging: () => (
      <div className="w-1.5 h-1.5 rounded-full mt-2 bg-gray-800 dark:bg-white"></div>
    ),
    
  };

  return (
    <div>

      <Slider {...settings}>

                { images.map( image => <div className="" key={image}>
                    <Image src={image} alt={image} width={1000} height={1000} className="w-full h-[360px] object-contain " />
                </div> )  }

    </Slider>




    </div>
  )
}
