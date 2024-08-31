import React, { useContext, useEffect, useState } from "react";
import style from "./ProductDetails.module.css";
import axios from "axios";
import { Link, useParams } from "react-router-dom";
import Slider from "react-slick";
import { LazyLoadImage } from 'react-lazy-load-image-component';
import 'react-lazy-load-image-component/src/effects/blur.css';
import { CartContext } from "../../Context/CartContext";
import toast from 'react-hot-toast';

export default function ProductDetails() {
  function goToTop(){
      window.scrollTo({
        top: 0,
        behavior: "smooth", 
      });
  }
let {addTCart} = useContext(CartContext) ;
const [currentId, setcurrentId] = useState(0)
const [load, setload] = useState(false)

  let { id , category} = useParams();
  const [product, setproduct] = useState(null);
  const [productRelated, setproductRelated] = useState([]);

  function getOneProduct(id) {
    axios
      .get(`https://ecommerce.routemisr.com/api/v1/products/${id}`)
      .then((res) => {
        setproduct(res.data.data);
      })
      .catch((res) => {
        console.log(res);
      });
  }

console.log(id,category);

function getAllproducts() {
  axios
    .get(`https://ecommerce.routemisr.com/api/v1/products`)
    .then((res) => {
      let getRelated = res?.data?.data;
      let related = getRelated.filter((product) => product.category.name === category);
      setproductRelated(related);
      console.log(related, res.data.data);
    })
    .catch((res) => {
      console.log(res);
    });
}
async function addToCart(id){
  setload(true)
  setcurrentId(id)
  let response =  await addTCart(id)
 console.log(response);
 if (response.data.status == "success") {
  setload(false)
   toast(response.data.message, {
 
     duration: 3000,
     position: 'top-center',
   
     style: {
       marginTop:"55px"
     },
   
     icon: '✔',
   
    
   
   
   })
   
 }else{
  setload(false)

 toast(response.data.message,{
   style: {
     marginTop:"55px"
   },
   icon: '❌',
 })
 }
   }

  useEffect(() => {
    getOneProduct(id);
    getAllproducts();
  }, [id, category]);

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
     {product == null ?<div className="bg-slate-200 h-screen w-full fixed top-0 z-40 left-0">
      <div className="flex justify-center items-center w-full h-64">
            <div className="sk-folding-cube">
              <div className="sk-cube1 sk-cube" />
              <div className="sk-cube2 sk-cube" />
              <div className="sk-cube4 sk-cube" />
              <div className="sk-cube3 sk-cube" />
            </div>
          </div>
     </div>
     : <div className="flex flex-wrap items-center gap-5">
     <div className="w-full md:w-1/3">
      <Slider {...settings}>
     {product.images.map((src)=> <LazyLoadImage effect="blur" src={src} alt="image" className="w-full" />)}
      </Slider>
     </div>
     <div className="w-full md:w-1/2 ">
       <h2 className="font-bold mb-4 text-xl">{product?.title}</h2>
       <p className="text-slate-500">{product?.description}</p>
       <h2 className="font-bold my-4 ">{product?.category.name}</h2>
       <div className="flex justify-between items-center flex-wrap">
         <h3 className="text-end text-gray-700">{product?.price} EGP</h3>
         <span>
           <i className="fas fa-star text-yellow-400"></i>{" "}
           {product?.ratingsAverage}
         </span>
       </div>
       {load ?  <div className="bg-emerald-700  px-5 py-2.5 text-center w-full rounded-md cursor-wait">
            {" "}
            <i className="fas fa-spinner fa-spin text-white "></i>
          </div>
        :  
       <button onClick={()=> addToCart(product.id)}  className="mt-6 bg-emerald-600 text-white px-4 w-full py-2 rounded-lg text-center mx-auto capitalize">
         <i className="fa-solid fa-cart-plus"></i> add to cart
       </button>
        }
     </div>
   </div>
   }
    <div className="flex flex-wrap mt-8">
    {productRelated.length > 0 ? (
  productRelated.map((product) => (
            <div
              className="w-full sm:w-full md:w-1/3 lg:w-1/6 p-4 "
              key={product._id}
            >
              <div to="productdetails" className="bg-white shadow-md hover:shadow-lg  rounded-lg overflow-hidden product">

           <Link to={`/productdetails/${product.id}/${product.category.name}`} onClick={goToTop} >
           <LazyLoadImage
                  src={product.imageCover}
                  alt={product.title}
                  className="w-full  "
                effect="blur"
                />
                <div className="px-4 py-2">
                  <h3 className="text-emerald-500 mb-2">
                    {product.category.name}
                  </h3>
                  <h2 className="text-lg font-semibold mb-2">
                    {product.title.split(" ").slice(0, 2).join(" ")}
                  </h2>
                </div>
                <div className="p-4 flex justify-between items-center flex-wrap">
                  <h3 className="text-end text-gray-700">
                    {product.price} EGP
                  </h3>
                  <span>
                    <i className="fas fa-star text-yellow-400"></i>
                    {product.ratingsAverage}
                  </span>
                </div>
           </Link>

           {load && currentId == product.id ?  <div className="bg-emerald-700  px-5 py-2.5 text-center w-full rounded-md cursor-wait">
            {" "}
            <i className="fas fa-spinner fa-spin text-white "></i>
          </div>:
           <button onClick={()=> addToCart(product.id)} className="btn bg-emerald-600 text-white px-4 w-full py-2 rounded-lg text-center mx-auto capitalize">
                  <i className="fa-solid fa-cart-plus"></i> add to cart
                </button>
          }
              </div>
            </div>
          ))
        ) : (
          <div className="flex justify-center items-center w-full h-64 ">
            <div className="sk-folding-cubee">
              <div className="sk-cube1 sk-cube" />
              <div className="sk-cube2 sk-cube" />
              <div className="sk-cube4 sk-cube" />
              <div className="sk-cube3 sk-cube" />
            </div>
          </div>
        )}
      </div>
    </>
  );
}
