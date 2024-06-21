import React, { useState } from 'react'
import HomeIndex from '../homeSidebarComponents/homeIndex';
import SideBarHome from '../homeSidebarComponents/sideBarHome';

function HomeSidebar() {
    const [options, setOptions] = useState("recentReplies");
    const changeOption = (newoption) =>{
        setOptions(newoption)
    }
  return (
   <>
    <div className="">
        <SideBarHome changeOption = {changeOption}/>
        <hr />
       <HomeIndex option = {options}/>
    </div>
   </>
  );
}

export default HomeSidebar