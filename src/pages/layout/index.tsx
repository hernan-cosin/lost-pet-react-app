import React from "react";
import { Outlet, useNavigate } from "react-router-dom";
import { Header } from "components/header";
import  css from "./layout.css"

export function Layout() {    
    return <React.StrictMode> 
    <div className={css["layout-container"]} id="layout-container">
        <div className={css["header-container"]} id="header-container">
            <Header></Header>
        </div>
        <Outlet/>
    </div>
    </React.StrictMode> 
}