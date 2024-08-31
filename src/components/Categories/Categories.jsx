import React, { useEffect, useState } from 'react'
import style from './Categories.module.css'
import axios from 'axios'
import { LazyLoadImage } from 'react-lazy-load-image-component';
import 'react-lazy-load-image-component/src/effects/blur.css';

export default function Categories() {
const [categories, setcategories] = useState([])
const [subCategory, setsubCategory] = useState([])

function getSubCategory(){
  axios.get(`https://ecommerce.routemisr.com/api/v1/subcategories`)
  .then((res)=> { 
  let subCategoryName = res.data.data

 let final =  subCategoryName.fillter((product)=>{product.slug == categories.name 
    setsubCategory(final)
    console.log(final);

  })
  
 } )
}

function getCategory(){
  axios.get(`https://ecommerce.routemisr.com/api/v1/categories`)
.then((res)=>{ 
setcategories(res.data.data)
console.log(categories);
}
)
}
useEffect(()=>{
getCategory()
getSubCategory()
},[])

  return (
    <>
   <h1 className="text-emerald-500 capitalize text-center font-semibold text-4xl my-8">
        all categories
      </h1>

    {categories.length > 0 ? (
  <div className="flex flex-wrap">
    {categories.map((cate) => (
      <div className="w-1/4 p-2" key={cate._id}>
        <div className="border p-3 rounded-md hover:shadow-md transition duration-[500ms] cursor-pointer">
          <LazyLoadImage effect='blur' src={cate.image} alt="" className="w-full h-[300px] mb-2" />
          <div className="py-3  border-t">
            <h2 className='text-emerald-700 capitalize text-center font-semibold text-2xl my-3'>{cate.name}</h2>
          </div>
        </div>
      </div>
    ))}
  </div>
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

    </>
  )
}
