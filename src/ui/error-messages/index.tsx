import React from "react"
import css from "./error-message.css"

type props = {
    children: string
    className?: string
}

export function ErrorMessage(p: props) {
    return <p className={css["error-message"] + p.className? " " + p.className : ""}>{p.children}</p>
}