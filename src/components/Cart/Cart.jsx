import React, { useContext, useEffect, useState } from 'react'
import style from './Cart.module.css'
import { CartContext } from '../../Context/CartContext'
import toast from 'react-hot-toast'
import { Link } from 'react-router-dom'
import image from "../../assets/empty-cart.png"
import { LazyLoadImage } from 'react-lazy-load-image-component';
import 'react-lazy-load-image-component/src/effects/blur.css';

export default function Cart() {
  const [cartDetails, setcartDetails] = useState(null)
  let { getloggedCart, updateCart ,deleteCart,numberOfCart,setnumberOfCart} = useContext(CartContext)
  const [loading, setLoading] = useState(false);

  async function getCartItem() {
    let response = await getloggedCart()
    console.log(response.data);
    if (response.data.status === "success") {
      setcartDetails(response.data.data)
    }
  }

  async function updateProduct(id, count) {
    setLoading(true);
    try {
      let response = await updateCart(id, count)
      if (response.data.status === "success") {
      
        setcartDetails(response.data.data);
        toast.success("Product updated successfully", { position: 'top-right' })
      } else {
        toast.error("Failed to update product", { position: 'top-right' })
      }
    } catch (error) {
      toast.error("An error occurred", { position: 'top-right' })
      console.log(error)
    } finally {
      setLoading(false);
    }
  }

  async function deleteItem(id) {
    setLoading(true);
    try {
      let response = await deleteCart(id)
      if (response.data.status === "success") {
        setnumberOfCart(numberOfCart - 1)
        setcartDetails(response.data.data);
        toast.success("Product deleted successfully", { position: 'top-right' })
      } else {
        toast.error("Failed to update product", { position: 'top-right' })
      }
    } catch (error) {
      toast.error("An error occurred", { position: 'top-right' })
      console.log(error)
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    getCartItem()
  }, []) 

  return (
    <>
     
      
      {cartDetails == null ? (
  <div className="flex justify-center items-center w-full h-64">
    <div className="sk-folding-cube">
      <div className="sk-cube1 sk-cube" />
      <div className="sk-cube2 sk-cube" />
      <div className="sk-cube4 sk-cube" />
      <div className="sk-cube3 sk-cube" />
    </div>
  </div>
) : cartDetails?.products.length > 0 ? (
  <><h2 className='mb-4 text-center text-2xl text-emerald-500'>
            <span className="font-bold capitalize text-gray-900">totalCartPrice:</span> {cartDetails?.totalCartPrice}
          </h2>
          <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
              <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                  <tr>
                    <th scope="col" className="px-16 py-3">
                      <span className="sr-only">Image</span>
                    </th>
                    <th scope="col" className="px-6 py-3">Product</th>
                    <th scope="col" className="px-6 py-3">Qty</th>
                    <th scope="col" className="px-6 py-3">Price</th>
                    <th scope="col" className="px-6 py-3">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {cartDetails.products.map((product) => (
                    <tr key={product.product.id} className="bg-white border-b dark:bg-gray-800 transition duration-500 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-900">
                      <td className="p-4">
                        <LazyLoadImage effect='blur' src={product.product.imageCover} className="w-16 md:w-32 max-w-full max-h-full" alt={product.product.title} />
                      </td>
                      <td className="px-6 py-4 font-semibold text-gray-900 dark:text-white">
                        {product.product.title}
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center">
                          {loading ? (
                            <div className="mx-auto w-fit">
                              <i className="fas fa-spinner fa-spin text-black text-3xl"></i>
                            </div>
                          ) : (
                            <>
                              <button onClick={() => updateProduct(product.product.id, product.count - 1)} className="inline-flex items-center justify-center p-1 me-3 text-sm font-medium h-6 w-6 text-gray-500 bg-white border border-gray-300 rounded-full focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700" type="button">
                                <span className="sr-only">Quantity button</span>
                                <svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 18 2">
                                  <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M1 1h16" />
                                </svg>
                              </button>
                              <span>{product.count}</span>
                              <button onClick={() => updateProduct(product.product.id, product.count + 1)} className="inline-flex items-center justify-center h-6 w-6 p-1 ms-3 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-full focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700" type="button">
                                <span className="sr-only">Quantity button</span>
                                <svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 18 18">
                                  <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 1v16M1 9h16" />
                                </svg>
                              </button>
                            </>
                          )}
                        </div>
                      </td>
                      <td className="px-6 py-4 font-semibold text-gray-900 dark:text-white">
                        {product.price}
                      </td>
                      <td className="px-6 py-4">
                        <span onClick={() => deleteItem(product.product.id)} className="cursor-pointer font-medium text-red-600 dark:text-red-500 hover:underline">Remove</span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className="w-full flex justify-center">
            <Link to="/payment" className="capitalize transition duration-500 bg-blue-500 hover:bg-blue-600 text-slate-50 text-center w-fit font-semibold text-lg mx-auto px-6 py-2 rounded-md my-3">check out</Link>
            </div>
            </>
) : (
  <div className="container mx-auto mt-24">
  <div className="flex flex-wrap">
    <div className="w-full">
      <div className="bg-white shadow-md rounded-lg overflow-hidden">
     
        <div className="p-6 bg-transparent">
          <div className="text-center">
            <img src={image} width={130} height={130} className="mx-auto mb-4" />
            <h3 className="text-2xl font-bold mb-2"><strong>Your Cart is Empty</strong></h3>
            <h4 className="text-lg mb-4">Add something to make me happy :&#40;</h4>
            <Link to="/" className=" bg-gradient-to-r from-cyan-500  via-50% to-emerald-400  text-white py-2 px-4 rounded-md hover:bg-gradient-to-l from-cyan-500 via-50% to-emerald-400  transition-colors duration-300">Continue Shopping</Link>
          </div>
        </div>
      </div>
    </div>
  </div>
</div>


)}

    </>
  )
}
