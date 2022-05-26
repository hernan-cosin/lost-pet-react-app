import React from "react"
import css from "./logo.css"

type props = {
    children: string
    className?: string
} 

export function LogoText(p:props) {
    let className
    
       if (p.className) {
           className = p.className
       } else {
           className = ""
       }
    
       return <p className={css["logo-text"] + " " + className}>{p.children}</p>
}