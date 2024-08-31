import React, { useEffect, useState } from "react";
import style from "./MainSilder.module.css";
import slide1 from "../../assets/slide1.jpg";
import slide2 from "../../assets/slide2.jpg";
import slide3 from "../../assets/slide3.jpg";
import slide4 from "../../assets/slide4.jpg";
import Slider from "react-slick";
import { LazyLoadImage } from 'react-lazy-load-image-component';
import 'react-lazy-load-image-component/src/effects/blur.css';

export default function MainSilder() {
  let settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 2500,
  };

  return (
    <>
    <div className="flex flex-wrap w-full">
  
  <div className="w-full lg:w-3/4">
    <Slider {...settings} className="pb-4 px-2">
      <img className="w-full lg:h-[400px]" src={slide1} alt="" />
      <img className="w-full lg:h-[400px]" src={slide2} alt="" />
    </Slider>
  </div>
 
  <div className="w-full lg:w-1/4 mt-8 lg:mt-0">
    <LazyLoadImage effect="blur" className="w-full lg:h-[200px] mb-4 lg:mb-0" src={slide3} alt="" />
    <LazyLoadImage effect="blur" className="w-full lg:h-[200px]" src={slide4} alt="" />
  </div>
</div>

    </>
  );
}
