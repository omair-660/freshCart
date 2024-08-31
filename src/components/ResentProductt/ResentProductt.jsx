import React, { useContext, useEffect, useState } from "react";
import style from "./ResentProductt.module.css";
import axios from "axios";
import { Link } from "react-router-dom";
import { CartContext } from "../../Context/CartContext";
import toast from 'react-hot-toast';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import 'react-lazy-load-image-component/src/effects/blur.css';
import { WishListContext } from "../../Context/WishListContext";


export default function ResentProductt() {
  const [currentId, setcurrentId] = useState(0)
  const [load, setload] = useState(false)
  const [product, setproduct] = useState([]);
let {addTCart,setnumberOfCart, numberOfCart} = useContext(CartContext) ;
let {addProductToWishList} = useContext(WishListContext)

 async function addToWishList(id){
  let response = await addProductToWishList(id)
  console.log(response.data.data);
  if (response.data.status == "success") {
    
  
    setnumberOfCart(numberOfCart + 1)
    toast(response.data.message, {
  
      duration: 3000,
      position: 'top-center',
    
      style: {
        marginTop:"55px"
      },
    
      icon: '✔',
    
     
    
    
    })
    
  }else{
    
  
  toast(response.data.message,{
    style: {
      marginTop:"55px"
    },
    icon: '❌',
  })
  }
  }

  function getProduct() {
    axios.get(`https://ecommerce.routemisr.com/api/v1/products`).then((res) => {
      setproduct(res.data.data);
    });
  }

 async function addToCart(id){
  setcurrentId(id)
  setload(true)
 let response =  await addTCart(id)
console.log(response);
if (response.data.status == "success") {
  setload(false)

  setnumberOfCart(numberOfCart + 1)
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
    getProduct();
  }, []);
  return (
    <>

      <div className="flex flex-wrap my-9">
        {product.length > 0 ? (
          product.map((product) => (
            <div
              className="w-full sm:w-full md:w-1/3 lg:w-1/6 p-4 "
              key={product._id}
            >
              <div to="productdetails" className="relative bg-white shadow-md hover:shadow-lg  rounded-lg overflow-hidden product hover:-translate-y-2">
              <i onClick={()=>addToWishList(product.id)} className="fa-solid fa-heart absolute top-4 right-4 cursor-pointer z-30"></i>
           <Link to={`productdetails/${product.id}/${product.category.name}`}>
           <LazyLoadImage
                  src={product.imageCover}
                  alt={product.title}
                  effect="blur"
                  className="w-full  "
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
          <div className="flex justify-center items-center w-full h-64">
            <div className="sk-folding-cube">
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
