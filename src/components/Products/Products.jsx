import React, { useContext, useEffect, useRef, useState } from 'react';
import style from './Products.module.css';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { CartContext } from "../../Context/CartContext";
import toast from 'react-hot-toast';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import 'react-lazy-load-image-component/src/effects/blur.css';

export default function Products() {
  const [currentId, setcurrentId] = useState(0)

  const [load, setload] = useState(false)
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);

  let myInput = useRef(null);
  let {addTCart} = useContext(CartContext) ;
  function getValue() {
    let val = myInput.current.value.toLowerCase();
    let filtered = products.filter((product) =>
      product.title.toLowerCase().includes(val)
    );
    setFilteredProducts(filtered);
  }

  function getProduct() {
    axios.get(`https://ecommerce.routemisr.com/api/v1/products`).then((res) => { 

      setProducts(res.data.data);
      setFilteredProducts(res.data.data); 
    });
  }

  
 async function addToCart(id){
  setcurrentId(id)
  setload(true)
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
    getProduct();
  }, []);

  return (
    <>
      <input onInput={() => getValue()} type="text" ref={myInput} className='w-full outline-none border mx-2 rounded-lg p-4 transition duration-500' placeholder='Search...'/>
      <div className="flex flex-wrap my-9">
        {filteredProducts.length > 0 ? (
          filteredProducts.map((product) => (
            <div
              className="w-full sm:w-full md:w-1/3 lg:w-1/6 p-4 "
              key={product._id}
            >
              <div
                to="productdetails"
                className="bg-white shadow-md hover:shadow-lg rounded-lg overflow-hidden product"
              >
                <Link
                  to={`/productdetails/${product.id}/${product.category.name}`}
                >
                  <LazyLoadImage
                    src={product.imageCover}
                    alt={product.title}
                    effect='blur'
                    className="w-full  "
                  />
                  <div className="px-4 py-2">
                    <h3 className="text-emerald-500 mb-2">
                      {product.category.name}
                    </h3>
                    <h2 className="text-lg font-semibold mb-2">
                      {product.title.split(' ').slice(0, 2).join(' ')}
                    </h2>
                  </div>
                  <div className="p-4 flex justify-between items-center flex-wrap">
                    <h3 className="text-end text-gray-700">
                      ${product.price} EGP
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
