import React from "react"
import css from "./link.css"

type props = {
    children: string
    className?: string
    userClick?: ()=>void
}

export function LinkText(p:props) {
    let className
    
       if (p.className) {
           className = p.className
       } else {
           className = ""
       }
    
    return <p className={css["link"] + " " + className}>{p.children}</p>
}