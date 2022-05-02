import React, {useState, useEffect} from "react"
import { Link } from "react-router-dom"
import css from "./pet-card.css"
import {Texto} from "ui/text"

type props = {
    id: number
    name: string
    description: string
    petZone: string
    imgUrl: string
    status: string
    deleted: boolean
}

export function PetCard (p: props) {
    const [descriptionToggleOn, setDescriptionToggle] = useState(false)
    const [descriptionClass, setDescriptionClass] = useState("")

    useEffect(()=>{
        if (descriptionToggleOn) {
            setDescriptionClass(css.visible)
        } else {
            setDescriptionClass("")
        }
    }, [descriptionToggleOn])

    function handleDescriptionClick() {
        setDescriptionToggle(!descriptionToggleOn)
    }

        return <div className={css["petcard-container"]}>
            <img className={css["pet-img"]} src={p.imgUrl} alt="Imagen de la mascota perdida" />
            <Texto className={css["pet-name"]} title={true}>{p.name}</Texto>
            <div className={css["pet-zone"]}>
                <Texto className={css["pet-location"]} text={true}>{p.petZone}</Texto>
                <Link className={css["pet-report-link"]} to={""}>Reportar información</Link>
            </div>
            <p onClick={handleDescriptionClick} className={css.plusButton}>+</p>
            <Texto className={css["pet-description"] + " " + descriptionClass} description={true}>{p.description}</Texto>
        </div>
}