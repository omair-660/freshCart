import axios from "axios";
import { createContext } from "react";

export let WishListContext = createContext();

export default function WishListContextProvider(props) {
  let headers = {
    token: localStorage.getItem("userToken"),
  };
    
  function addProductToWishList(productId) {
   return axios.post(
      `https://ecommerce.routemisr.com/api/v1/wishlist`,
      { productId: productId },
      { headers}
    ).then((res)=>res
  
      
    )
    .catch((err)=>err)
  }

  function getproductWishList(){
    return axios.get(`https://ecommerce.routemisr.com/api/v1/wishlist`,{headers})
    .then((res)=> res)
    .catch((err)=> err)

  }

  function delelteWishListItem(productId){
    return axios.delete(`https://ecommerce.routemisr.com/api/v1/wishlist/${productId}`, {headers})
    .then((res)=> res)
    .catch((err)=> err)
  }

  return (
    <WishListContext.Provider value={{addProductToWishList,getproductWishList,delelteWishListItem}}>
      {props.children}
    </WishListContext.Provider>
  );
}
