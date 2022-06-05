import React, {useState, useEffect} from "react"
import {Title} from "ui/texts/title"
import {Body} from "ui/texts/body"
import {Subtitle} from "ui/texts/subtitle"
import {ReportSeenPet} from "components/report-seen-pet"
import {openReportForm} from "atoms/atoms"
import { useRecoilValue, useSetRecoilState } from "recoil"
import css from "./pet-card.css"

type props = {
    id: number,
    name: string,
    description: string,
    petZone: string,
    imgUrl: string,
    status: string,
    deleted: boolean,
    ownerEmail: string
}

export function PetCard (p: props) {
    const [descriptionToggleOn, setDescriptionToggle] = useState(false)
    const [descriptionClass, setDescriptionClass] = useState("")
    const [plusRotation, setPlusRotation] = useState("")
    const openReport = useRecoilValue(openReportForm)
    const setOpenReport = useSetRecoilState(openReportForm)

    useEffect(()=>{
        if (descriptionToggleOn) {
            setDescriptionClass(css.visible)
        } else {
            setDescriptionClass("")
        }
    }, [descriptionToggleOn])

    useEffect(()=>{
        if (descriptionToggleOn) {
            setPlusRotation(css.plusRotate)
        } else {
            setPlusRotation("")
        }
    }, [descriptionToggleOn])

    function handleDescriptionClick() {
        setDescriptionToggle(!descriptionToggleOn)
    }
    
    function handleReportClick() {
        setOpenReport({petId: p.id, open: true})
        window.scrollTo(0, 0)
    }

        return <>
            <ReportSeenPet name={p.name} id={p.id} ownerEmail={p.ownerEmail}></ReportSeenPet>
            <div className={css["petcard-container"]}>
                <img className={css["pet-img"]} src={p.imgUrl} alt="Imagen de la mascota perdida" />
                <Title className={css["pet-name"]}>{p.name}</Title>
                <div className={css["pet-zone"]}>
                    <Body className={css["pet-location"]}>{p.petZone}</Body>
                    <p className={css["pet-report-link"]} onClick={handleReportClick}>Reportar información</p>
                </div>
                <p onClick={handleDescriptionClick} className={css.plusButton + " " + plusRotation}>+</p>
                <Subtitle className={css["pet-description"] + " " + descriptionClass}>{p.description}</Subtitle>
            </div>
        </>

}