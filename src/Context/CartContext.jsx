import axios from "axios";
import { createContext, useEffect, useState } from "react";

export let CartContext = createContext();

export default function CartContextProvider(props) {
  const [numberOfCart, setnumberOfCart] = useState(0);
  const [cartId, setcartId] = useState(0);

  let headers = {
    token: localStorage.getItem("userToken"),
  };
  function addTCart(productId) {
    return axios
      .post(
        `https://ecommerce.routemisr.com/api/v1/cart`,
        {
          productId: productId,
        },
        { headers }
      )
      .then((res) => res)
      .catch((err) => err);
  }

  function getloggedCart() {
    return axios
      .get(`https://ecommerce.routemisr.com/api/v1/cart`, { headers })
      .then((res) => {
        setnumberOfCart(res.data.numOfCartItems);
        setcartId(res.data.data._id);
        console.log(res.data.data._id);
        
        return res;
      })
      .catch((err) => err);
  }
  function checkOut(cartId, url, formData) {
    return axios
      .post(
        `https://ecommerce.routemisr.com/api/v1/orders/checkout-session/${cartId}?url=${url}`,
        { shippingAddress: formData },
        { headers }
      )
      .then((res) => res)
      .catch((err) => err);
  }
  function updateCart(productId, newCount) {
    return axios
      .put(
        `https://ecommerce.routemisr.com/api/v1/cart/${productId}`,
        { count: newCount },
        { headers }
      )
      .then((res) => res)
      .catch((err) => err);
  }

  function deleteCart(productId) {
    return axios
      .delete(
        `https://ecommerce.routemisr.com/api/v1/cart/${productId}`,

        { headers }
      )
      .then((res) => res)
      .catch((err) => err);
  }
  useEffect(() => {
    getloggedCart();
  }, []);
  return (
    <CartContext.Provider
      value={{
        addTCart,
        getloggedCart,
        updateCart,
        deleteCart,
        numberOfCart,
        setnumberOfCart,
        checkOut,
        cartId
      }}
    >
      {props.children}
    </CartContext.Provider>
  );
}
