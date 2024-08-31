import React, { useEffect, useState } from "react";
import style from "./Notfound.module.css";
import { Link } from "react-router-dom";

export default function Notfound() {
  return (
    <>
      <div className={`h-lvh w-full not-found flex justify-center items-center flex-col relative overflow-hidden ${style.R}`} >
        <div className={style.botm}></div>
        
        <div className={style.top}></div>
        <div className={style.br}></div>
        <p className="font-semibold text-2xl">Oopps...</p>
        <h1 className={`text-9xl font-bold bg-clip-text text-transparent animate-gradient bg-gradient-to-r from-cyan-600 via-blue-300 to-emerald-300 ${style.gradient}`}>404</h1>


        <p className="uppercase xl">page not found!</p>
        <Link to="/">
          <button className={`text-slate-50 font-semibold bg-gradient-to-r from-cyan-500 via-blue-500 via-50% to-emerald-400 px-4 py-2 rounded-md mt-3 hover:bg-gradient-to-l from-cyan-500 via-blue-500 via-50% to-emerald-400 ${style.btnH}`}>
            Go to Home
          </button>
        </Link>
      </div>
    </>
  );
}
