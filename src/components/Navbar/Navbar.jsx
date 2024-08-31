import React, { useContext, useEffect, useState } from "react";
import style from "./Navbar.module.css";
import { Link, Navigate, NavLink, useNavigate } from "react-router-dom";
import logo from "../../assets/logo-main.png";
import { UserContext } from "../../Context/UserContext";
import { CartContext } from "../../Context/CartContext";

export default function Navbar() {
  let navigate = useNavigate();
let {numberOfCart} = useContext(CartContext)
  const [mobileNavOpen, setMobileNavOpen] = useState(false);
  let { userLogin, setuserLogin } = useContext(UserContext);

  function signOut() {
    localStorage.removeItem("userToken");
    setuserLogin(null);
    navigate("/login");
  }

  return (
    <>
      <section className="bg-slate-100 shadow-sm fixed w-full z-50 top-0">
        <nav className="flex justify-between p-6 px-4 items-center">
          <Link to="">
            <img className="h-8" src={logo} alt="Logo" />
          </Link>
          {userLogin !== null ? (
            <div className="flex items-center">
              <ul className="hidden xl:flex ml-24">
                <li className="mr-8">
                  <NavLink
                    exact
                    to="/"
                    className="text-gray-900 transition duration-500 ease-in-out hover:text-gray-500"
                    activeClassName="font-bold text-gray-700"
                    aria-current="page"
                  >
                    Home
                  </NavLink>
                </li>
                <li className="mr-8">
                  <NavLink
                    to="products"
                      className="text-gray-900 transition duration-500 ease-in-out hover:text-gray-500"
                    activeClassName="font-bold text-gray-700"
                  >
                    Products
                  </NavLink>
                </li>
                <li className="mr-8">
                  <NavLink
                    to="brands"
                      className="text-gray-900 transition duration-500 ease-in-out hover:text-gray-500"
                    activeClassName="font-bold text-gray-700"
                  >
                    Brands
                  </NavLink>
                </li>
                <li className="mr-8 relative">
                  <NavLink
                    to="cart"
                      className="text-gray-900 transition duration-500 ease-in-out hover:text-gray-500"
                    activeClassName="font-bold text-gray-700"
                  >
                    Cart 
                    <span className="absolute -top-2 -right-5 bg-gradient-to-r from-cyan-500  to-emerald-400 text-slate-50 rounded-full w-5 h-5 flex items-center justify-center">
                      {numberOfCart}
                    </span>
                  </NavLink>
                </li>
                <li className="mr-8">
                  <NavLink
                    to="wishLiss"
                      className="text-gray-900 transition duration-500 ease-in-out hover:text-gray-500"
                    activeClassName="font-bold text-gray-700"
                  >
                    WishList
                  </NavLink>
                </li>
                <li className="mr-8">
                  <NavLink
                    to="categories"
                      className="text-gray-900 transition duration-500 ease-in-out hover:text-gray-500"
                    activeClassName="font-bold text-gray-700"
                  >
                    Categories
                  </NavLink>
                </li>
              </ul>
            </div>
          ) : null}

          <div className="right">
            <ul className="hidden xl:flex ml-24">
              <div className="icon">
                <ul className="flex me-4">
                  <li className="mr-5">
                    <i className="cursor-pointer fab fa-facebook-f text-gray-900 transition hover:text-gray-500"></i>
                  </li>

                  <li className="mr-5">
                    <i className="cursor-pointer fab fa-linkedin-in text-gray-900 transition hover:text-gray-500"></i>
                  </li>
                  <li className="mr-5">
                    <i className="cursor-pointer fab fa-twitter text-gray-900 transition hover:text-gray-500"></i>
                  </li>
                  <li className="mr-5">
                    <i className="cursor-pointer fab fa-instagram text-gray-900 transition hover:text-gray-500"></i>
                  </li>
                </ul>
              </div>
              {userLogin == null ? (
                <ul className="flex items-center">
                  <li className="mr-12">
                    <NavLink
                      to="login"
                      className="text-gray-900 transition duration-500 ease-in-out hover:text-gray-700"
                    activeClassName="font-bold text-gray-700"
                    >
                      Login
                    </NavLink>
                  </li>
                  <li className="mr-12">
                    <NavLink
                      to="register"
                      className="text-gray-900 transition duration-500 ease-in-out hover:text-gray-700"
                    activeClassName="font-bold text-gray-700"
                    >
                      Register
                    </NavLink>
                  </li>
                </ul>
              ) : (
                <span className="cursor-pointer" onClick={() => signOut()}>
                 <i className="fa-solid fa-right-from-bracket mx-1"></i> SignOut
                </span>
              )}
            </ul>
          </div>
          <button
            onClick={() => setMobileNavOpen(!mobileNavOpen)}
            className="xl:hidden flex items-center px-3 py-2 text-coolGray-500 hover:text-coolGray-900 font-medium focus:outline-none"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h16m-7 6h7"
              ></path>
            </svg>
          </button>
        </nav>

        {mobileNavOpen && (
          <div className="xl:hidden fixed top-0 left-0 w-full h-full bg-slate-100 shadow-lg z-50">
            <div className="flex justify-between p-4">
              <a href="#">
                <img className="h-8" src={logo} alt="Logo" />
              </a>
              <button
                onClick={() => setMobileNavOpen(false)}
                className="text-coolGray-500 hover:text-coolGray-900 font-medium"
              >
                <svg
                  className="w-6 h-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M6 18L18 6M6 6l12 12"
                  ></path>
                </svg>
              </button>
            </div>
            <ul className="flex flex-col p-4 ">
             {userLogin !== null ?
             <div>
             <li>
               <Link
                 to=""
                 className="text-gray-900 transition hover:text-gray-500"
                 aria-current="page"
               >
                 Home
               </Link>
             </li>
             <li>
               <Link
                 to="products"
                 className="text-gray-900 transition hover:text-gray-500"
               >
                 Products
               </Link>
             </li>
             <li>
               <Link
                 to="brands"
                 className="text-gray-900 transition hover:text-gray-500"
               >
                 Brands
               </Link>
             </li>
             <li>
               <Link
                 to="cart"
                 className="text-gray-900 transition hover:text-gray-500"
               >
                 Cart
               </Link>
             </li>
             <li className=" mb-3">
               <Link
                 to="categories"
                 className="text-gray-900 transition hover:text-gray-500"
               >
                 Categories
               </Link>
             </li>
             <span className="cursor-pointer " onClick={() => signOut()}>
                 <i className="fa-solid fa-right-from-bracket mx-1"></i> SignOut
                </span>
           </div>
           : 
              <ul>
                <li className="mr-12">
                  <Link
                    to="login"
                    className="text-gray-900 transition hover:text-gray-500"
                  >
                    Login
                  </Link>
                </li>
                <li className="mr-12">
                  <Link
                    to="register"
                    className="text-gray-900 transition hover:text-gray-500"
                  >
                    Register
                  </Link>
                </li>
              </ul>
            }


              <li className="icon">
                <ul className="flex ms-0 md:ms-4 mt-3">
                  <li className="mr-5">
                    <i className="cursor-pointer fab fa-facebook-f text-gray-900 transition hover:text-gray-500"></i>
                  </li>

                  <li className="mr-5">
                    <i className="cursor-pointer fab fa-linkedin-in text-gray-900 transition hover:text-gray-500"></i>
                  </li>
                  <li className="mr-5">
                    <i className="cursor-pointer fab fa-twitter text-gray-900 transition hover:text-gray-500"></i>
                  </li>
                  <li className="mr-5">
                    <i className="cursor-pointer fab fa-instagram text-gray-900 transition hover:text-gray-500"></i>
                  </li>
                </ul>
              </li>
            </ul>
          </div>
        )}
      </section>
    </>
  );
}
