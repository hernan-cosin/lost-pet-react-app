import React, { HTMLInputTypeAttribute, useState, useEffect } from "react"
import {useRecoilState} from "recoil"
import {editPetInformation} from "atoms/atoms"
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
    const [val, setVal] = useState("")

    useEffect(()=>{
        setVal(p.value)
    }, [p.value])

    let componentClassName: string
    if (p.className ==  undefined){
        componentClassName = ""
    } if (p.className !== undefined) {
        componentClassName = p.className
    }

    return <label htmlFor="input"  className={css["search-form_label"] + " "  + componentClassName}>{p.label}
        <input required={p.required} className={css["search-form_input"]} type={p.type} defaultValue={val || ""} name={p.name}/>
    </label>
}