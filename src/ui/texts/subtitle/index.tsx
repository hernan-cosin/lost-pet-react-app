import React from "react"
import css from "./subtitle.css"

type props = {
    children: string
    className?: string
}

export function Subtitle(p:props) {
    let className
    
       if (p.className) {
           className = p.className
       } else {
           className = ""
       }
    
    return <p className={css["subtitle"] + " " + className}>{p.children}</p>
}