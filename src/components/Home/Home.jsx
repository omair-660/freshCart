import React, { useEffect, useState } from 'react'
import style from './Home.module.css'
import ResentProductt from '../ResentProductt/ResentProductt'
import CateSlider from '../cateSlider/cateSlider'
import MainSilder from '../MainSilder/MainSilder'


export default function Home() {
 return ( 
  <>
<div className="overflow-hidden">
  <MainSilder/>
<CateSlider/>
<ResentProductt/>
</div>
    </>
  )
}
