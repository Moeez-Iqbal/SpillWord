import { Route , Routes} from "react-router-dom";



import React from 'react'
import Sidebar from "../components/sideBar";
import Email from "../sideBarComponents/email";

function appRoute() {
  return (
    <>
    <Sidebar/>
    <Routes>
        <Route path="/email" element={<Email/>}/>

        
    </Routes>
        </>
  )
}

export default appRoute