import React from "react"
import logo from 'media/logo.svg';
import css from "./logo.css"

export function Logo() {
    return <img src={logo} alt="" className={css["logo"]}/>
     
}