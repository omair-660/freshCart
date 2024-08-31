import React, { useEffect, useState } from 'react'
import style from './Layout.module.css'
import Navbar from "../Navbar/Navbar";
import Footer from "../Footer/Footer";
import { Outlet } from "react-router-dom";


export default function Layout() {
  return (
    <>
   <Navbar/>
    <div className="container mx-auto pt-16 px-4 mt-10 w[80%]">
    <Outlet/>
    </div>
   <Footer/>
    </>
  )
}
