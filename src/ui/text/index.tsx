import React from "react";
import css from "./text.css"

type props = {
    title?: boolean,
    subtitle?: boolean,
    text?: boolean,
    description?: boolean,
    logo?: boolean,
    children: string,
    link?: boolean,
    className?: string
    userClick?: ()=> void
}
export function Texto(p: props) {
    let clase
    let componentClassName
    
    if (p.title) {
         clase = "titulo"
    }
    if (p.subtitle) {
         clase = "subtitle"
    }
    if (p.text) {
         clase = "text"
    }
    if (p.description) {
         clase = "description"
    }
    if (p.logo) {
         clase = "logo"
    }
    if (p.link) {
         clase = "link"
    }
    if (p.className) {
          componentClassName = p.className
    } else {
          componentClassName = ""
     }
     
     return <p className={`${css[clase] + " " + componentClassName}`} onClick={p.userClick}>{p.children}</p>

    

}