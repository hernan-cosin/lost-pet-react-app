import React, {useState, useEffect} from "react"
import { Link } from "react-router-dom"
import edit from 'media/edit.svg';
import {Title} from "ui/texts/title"
import {Body} from "ui/texts/body"
import {Subtitle} from "ui/texts/subtitle"
import css from "./pet-card.css"

type props = {
    id: number
    name: string
    description: string
    petZone: string
    imgUrl: string
    status: string
    deleted: boolean
}

export function PetCardEdit (p: props) {
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
            {p.status == "found"? <div className={css["found-tag"]}>Encontrado</div> : ""}
            <img className={css["pet-img"]} src={p.imgUrl} alt="Imagen de la mascota perdida" />
            <Title className={css["pet-name"]}>{p.name}</Title>
            <div className={css["pet-zone"]}>
                <Body className={css["pet-location"]}>{p.petZone}</Body>
                <Link className={css["pet-report-link"]} to={""}>
                    <img src={edit} alt="edit svg logo" className={css["edit"]}/>
                </Link>
            </div>
            <p onClick={handleDescriptionClick} className={css.plusButton}>+</p>
            <Subtitle className={css["pet-description"] + " " + descriptionClass}>{p.description}</Subtitle>
        </div>
}