// src/components/Sidebar.jsx
import React, { useState } from 'react';
import Home from '../sideBarComponents';
import Sidebar from '../components/sideBar';

function VendorLayout ()  {
    const [options, setOptions] = useState("mainContent");
    const changeOption = (newoption) =>{
        setOptions(newoption)
    }
  return (
   <>
    <div className="flex  w-screen h-screen">
        <Sidebar changeOption = {changeOption}/>
        <Home option = {options}/>
    </div>
   </>
  );
}

export default VendorLayout;
