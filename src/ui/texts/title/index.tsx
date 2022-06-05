import React from "react"
import css from "./title.css"

type props = {
    children: string
    className?: string
    onClick?: ()=>void
}

export function Title(p:props) {
    let className

    if (p.className) {
        className = p.className
    } else {
        className = ""
    }

    return <p className={css["title"] + " " + className} onClick={p.onClick? p.onClick : null}>{p.children}</p>
}