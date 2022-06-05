import React, {useEffect, useState} from "react"
import { useRecoilState } from "recoil"
import {editPetInformation} from "atoms/atoms"
import css from "./index.css"

type props = {
    label?: string
    className?: string
    value?: string
    name: string
}

export function AreaInput(p: props) {
    const [val, setVal] = useState("")
    const [editPetInformationAtom, setEditPetInformationAtom] = useRecoilState(editPetInformation)

    useEffect(()=>{
        setVal(p.value)
    }, [p.value])

    useEffect(()=>{
        setVal(editPetInformationAtom.name)
    }, [editPetInformationAtom.name])

    useEffect(()=>{
        setVal(editPetInformationAtom.petZone)
    }, [editPetInformationAtom.petZone])

    useEffect(()=>{
        setVal(editPetInformationAtom.description)
    }, [editPetInformationAtom.description])
    
    let componentClassName: string
    if (p.className ==  undefined){
        componentClassName = ""
    } if (p.className !== undefined) {
        componentClassName = p.className
    }

    return <label htmlFor="input"  className={css["search-form_label"] + " "  + componentClassName}>{p.label}
        <textarea className={css["search-form_text-area"]} name={p.name} defaultValue={val || ""} ></textarea>
    </label>
}