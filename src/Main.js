import React from 'react'
import Header from './Header'
import { useState } from 'react';
import Card from './card'
import { useLocation } from 'react-router-dom'

import SideCard from './SideCard'

export default function Main() {

 
  const location=useLocation();
  return (
    <div>
        <Header/>
        <SideCard path={location.pathname}/>
         
        <Card />
        
        
    </div>
  )
}
