import React, { useContext, useEffect, useState } from "react";
import style from "./WishLiss.module.css";
import { WishListContext } from "../../Context/WishListContext";
import { LazyLoadImage } from "react-lazy-load-image-component";
import toast from "react-hot-toast";
import { CartContext } from "../../Context/CartContext";
import { Link } from "react-router-dom";

export default function WishLiss() {
  let { getproductWishList, delelteWishListItem } = useContext(WishListContext);
  const [wishList, setwishList] = useState([]);
  let { addTCart } = useContext(CartContext);
  const [currentId, setcurrentId] = useState(0);
  const [load, setload] = useState(false);

  async function deleteItem(productId) {
    let response = await delelteWishListItem(productId);
    setwishList(response.data.data);
    if (response.data.status == "success") {
      setload(false);
      toast(response.data.message, {
        duration: 3000,
        position: "top-center",

        style: {
          marginTop: "55px",
        },

        icon: "✔",
      });
    } else {
      setload(false);

      toast(response.data.message, {
        style: {
          marginTop: "55px",
        },
        icon: "❌",
      });
    }
  }

  async function getWishList() {
    let response = await getproductWishList();
    setwishList(response.data.data);
    console.log(response.data.data);
  }
  async function addToCart(id) {
    setload(true);
    setcurrentId(id);
    let response = await addTCart(id);
    console.log(response);
    if (response.data.status == "success") {
      setload(false);
      toast(response.data.message, {
        duration: 3000,
        position: "top-center",

        style: {
          marginTop: "55px",
        },

        icon: "✔",
      });
    } else {
      setload(false);

      toast(response.data.message, {
        style: {
          marginTop: "55px",
        },
        icon: "❌",
      });
    }
  }

  useEffect(() => {
    getWishList();
  }, []);
  return (
    <>
      <div className="flex flex-wrap justify-between flex-col bg-gray-50 p-9 my-4 rounded-md">
        <h3 className="capitalize text-4xl font-semibold border-b w-fit pb-5 mb-4 text-gray-700">
          my wishlist
        </h3>
        {wishList && wishList.length > 0 ? (
  wishList.map((product) => (
    <div key={product.id}>
      <div className="flex w-full justify-between items-center my-4 border-b pb-3">
        <div className="flex items-center gap-5">
          <div className="image">
            <LazyLoadImage
              effect="blur"
              src={product.imageCover}
              alt=""
            />
          </div>
          <div className="text">
            <p className="font-semibold text-2xl mb-2 text-gray-800">
              {product.title.split(" ").slice(0, 2).join(" ")}
            </p>
            <p className="font-semibold text-emerald-500">
              {product.price} EG
            </p>
            <p className="my-2">
              {product.ratingsAverage}{" "}
              <i className="ms-1 fa-solid fa-star text-yellow-400 text-[14px]"></i>
            </p>
            <button
              onClick={() => deleteItem(product._id)}
              className="text-red-600 capitalize"
            >
              <i className="fa-solid fa-trash-can"></i> delete
            </button>
          </div>
        </div>
        <div className="addCart">
          {load && currentId === product._id ? (
            <div className="bg-emerald-700  px-5 py-2.5 text-center w-full rounded-md cursor-wait">
              {" "}
              <i className="fas fa-spinner fa-spin text-white "></i>
            </div>
          ) : (
            <button
              onClick={() => addToCart(product._id)}
              className="mt-6 bg-emerald-600 text-white px-4  py-2 rounded-lg text-center mx-auto capitalize"
            >
              <i className="fa-solid fa-cart-plus"></i> add to cart
            </button>
          )}
        </div>
      </div>
    </div>
  ))
) : (
  <div className="container mx-auto ">
  <div className="flex flex-wrap">
    <div className="w-full">
      <div className=" shadow-md rounded-lg overflow-hidden">
     
        <div className="p-6 bg-transparent">
          <div className="text-center">
          <i className="text-7xl fa-solid fa-heart-crack  font-bold bg-clip-text text-transparent animate-gradient bg-gradient-to-r from-cyan-600 via-blue-300 to-emerald-300"></i>
            <h3 className="text-2xl font-bold mb-2"><strong>Your wishList is Empty</strong></h3>
            <h4 className="text-lg mb-4">Add something to make me happy :)</h4>
            <Link to="/" className=" bg-gradient-to-r from-cyan-500  via-50% to-emerald-400  text-white py-2 px-4 rounded-md hover:bg-gradient-to-l from-cyan-500 via-50% to-emerald-400  transition-colors duration-300">Continue Shopping</Link>
          </div>
        </div>
      </div>
    </div>
  </div>
</div>
)}

      </div>
    </>
  );
}
