import React, { HTMLInputTypeAttribute } from "react"
import css from "./index.css"

type props = {
    label?: string
    className?: string
    value?: string
    name: string
}

export function AreaInput(p: props) {
    
    let componentClassName: string
    if (p.className ==  undefined){
        componentClassName = ""
    } if (p.className !== undefined) {
        componentClassName = p.className
    }

    return <label htmlFor="input"  className={css["search-form_label"] + " "  + componentClassName}>{p.label}
        <textarea className={css["search-form_text-area"]} name={p.name} defaultValue={p.value || ""}></textarea>
    </label>
}