import React from "react"
import css from "./body.css"

type props = {
    children: string
    className?: string
}

export function Body(p:props) {
    let className
    
    if (p.className) {
        className = p.className
        
    } else {
        className = ""
    }

    return <p className={css["body"] + " " + className}>{p.children}</p>
}