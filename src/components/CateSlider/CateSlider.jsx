import React, { useEffect, useState } from "react";
import style from "./CateSlider.module.css";
import axios from "axios";
import Slider from "react-slick";
import { LazyLoadImage } from 'react-lazy-load-image-component';
import 'react-lazy-load-image-component/src/effects/blur.css';

export default function CateSlider() {
  const [cate, setcate] = useState([]);

  let settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 7,
    slidesToScroll: 2,
    autoplay: true,
    autoplaySpeed: 2500,
    responsive: [
      {
        breakpoint: 1024, 
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 480, 
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };

  function getCate() {
    axios
      .get(`https://ecommerce.routemisr.com/api/v1/categories`)
      .then((res) => {
        setcate(res.data.data);
      });
  }
  useEffect(() => {
    getCate();
  }, []);
  return (
    <>
    
    <h2 className="capitalize px-2 mt-9 font-semibold text-gray-600">shop popular categories</h2>
    {cate.length > 0 ?
      <Slider className="" {...settings}>
      {cate.map((category) => (
          <div className={`my-9 px-2 ${style.foucs}`} key={category._id}>
            <LazyLoadImage effect="blur" src={category.image} className="w-full object-cover h-[200px]" alt={category.name} />
            <h2>{category.name}</h2>
          </div>
        ))}
      </Slider>
      :<div className="mx-auto w-fit"> <i className="fas fa-spinner fa-spin text-black text-3xl"></i></div>}
    </>
  );
}
