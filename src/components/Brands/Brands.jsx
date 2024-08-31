import React, { useEffect, useState } from "react";
import style from "./Brands.module.css";
import axios from "axios";
import { LazyLoadImage } from 'react-lazy-load-image-component';
import 'react-lazy-load-image-component/src/effects/blur.css';

export default function Brands() {
  const [brands, setbrands] = useState([]);
  const [brandItem, setbrandItem] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);


function getAllBrands(){
  axios.get(`https://ecommerce.routemisr.com/api/v1/brands`).then((res) => {
    setbrands(res.data.data);
  });
}

function getSpecificBrands(id){
  axios.get(`https://ecommerce.routemisr.com/api/v1/brands/${id}`).then((res) => {
    setbrandItem(res.data.data);
  console.log(res.data.data);
  setIsModalOpen(true);
  });
}

useEffect(()=>{
getAllBrands()
},[])

  return (
    <>
      <h1 className="text-emerald-500 capitalize text-center font-semibold text-4xl my-8">
  all brands
</h1>
<div className="flex flex-wrap">
  {brands.length > 0 ? (
    brands.map((brand) => (
      <div className="w-full md:w-1/2 lg:w-1/4 p-2 text-center" key={brand._id}>
        <div
          className="border p-3 rounded-md hover:shadow-md transition duration-500 cursor-pointer"
          onClick={() => getSpecificBrands(brand._id)}
        >
          <LazyLoadImage effect="blur" src={brand.image} alt="" className="w-full" />
        </div>
      </div>
    ))
  ) : (
    <div className="flex justify-center items-center w-full h-64">
      <div className="sk-folding-cube">
        <div className="sk-cube1 sk-cube" />
        <div className="sk-cube2 sk-cube" />
        <div className="sk-cube4 sk-cube" />
        <div className="sk-cube3 sk-cube" />
      </div>
    </div>
  )}

  {isModalOpen && (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 ">
      <div className="bg-white px-4 rounded-lg shadow-lg w-[90%] md:w-1/3 relative  pt-14 pb-4   ">
       <div className="border-t border-b flex-wrap flex items-center my-4">
       <div className="w-full md:w-1/2">
        <h2 className="text-3xl font-semibold mb-4 text-emerald-500">{brandItem.name}</h2>
        <p className="text-gray-600">{brandItem.slug}</p>
        </div>
        <div className="w-full md:w-1/2">
        <LazyLoadImage effect="blur" src={brandItem.image} alt={brandItem.name} className="w-full mb-4" />
        </div>
       </div>
        <button
          className="mt-4 bg-red-500 transition duration-500 hover:bg-red-700 text-white px-4 py-2 rounded absolute top-0 right-2"
          onClick={() => setIsModalOpen(false)}
        >
         <i className="fa-solid fa-xmark"></i>
        </button>
      </div>
    </div>
  )}
</div>

    </>
  );
}
