import React from "react"
import css from "./title.css"

type props = {
    children: string
    className?: string
}

export function Title(p:props) {
    let className

    if (p.className) {
        className = p.className
    } else {
        className = ""
    }

    return <p className={css["title"] + " " + className}>{p.children}</p>
}