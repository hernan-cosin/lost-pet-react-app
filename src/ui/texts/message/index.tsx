import React from "react"
import css from "./message.css"

type props = {
    children: string
    className?: string
}

export function Message(p:props) {
    let className
    
       if (p.className) {
           className = p.className
       } else {
           className = ""
       }
    return <p className={css["message"]+ " " + className}>{p.children}</p>
}