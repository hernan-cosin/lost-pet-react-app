import React, { HTMLInputTypeAttribute } from "react"
import css from "./index.css"

type props = {
    type: HTMLInputTypeAttribute
    label?: string
    className?: string
    value?: string
    required?: boolean
    name: string
}

export function SearchInput(p: props) {
    
    let componentClassName: string
    if (p.className ==  undefined){
        componentClassName = ""
    } if (p.className !== undefined) {
        componentClassName = p.className
    }

    return <label htmlFor="input"  className={css["search-form_label"] + " "  + componentClassName}>{p.label}
        <input required={p.required}className={css["search-form_input"]} type={p.type} defaultValue={p.value || ""} name={p.name}/>
    </label>
}