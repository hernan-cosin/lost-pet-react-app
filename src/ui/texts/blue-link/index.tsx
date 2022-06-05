import React from "react"
import css from "./blue-link.css"

type props = {
    children: string
    className?: string
    userClick?: ()=>void
}

export function BlueLink(p:props) {
    let className
    
       if (p.className) {
           className = p.className
       } else {
           className = ""
       }
    
    return <p className={css["link"] + " " + className} onClick={p.userClick? p.userClick : null}>{p.children}</p>
}