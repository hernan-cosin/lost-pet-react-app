import React from "react";
import { Outlet, useNavigate } from "react-router-dom";
import { Header } from "components/header";
import  css from "./layout.css"

export function Layout() {    
//     let navigate = useNavigate()
   
//    function handleSearch(query) {        
//       navigate("/query/" + query)
//    }

    return <div className={css["layout-container"]} id="layout-container">
        <div className={css["header-container"]} id="header-container">
            <Header></Header>
        </div>
        <Outlet/>
    </div> 
}