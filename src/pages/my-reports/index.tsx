import React, { useEffect, useState } from "react";
import { Title } from "ui/texts/title";
import { Subtitle } from "ui/texts/subtitle";
import {useMyReportedPet} from "hooks/reportedPet"
import { useRecoilValue } from "recoil";
import { openMenu } from "atoms/atoms";
import {reportedPetState} from "atoms/atoms"
import {PetCardEdit} from "components/pet-card/editable"
import css from "./my-reports.css"

export function MyReports() {
    const openMenuAtomValue = useRecoilValue(openMenu) // atom para corregir z-index
    const [open, setOpen]  = useState(false) // state para setear clase con z-index  
    const reportedPets = useRecoilValue(reportedPetState) // atom que recibe las mascotas del custom hook
    const myReportedPetHookRes = useMyReportedPet() // custom hook
    
    useEffect(()=>{
        setOpen(!openMenuAtomValue)        
    }, [openMenuAtomValue])

    function filterPets(pets) { // filtra las mascotas eliminadas
        const filterDeleted = pets.filter((p)=>{
            return p.deleted == "false"
        })
                
        return filterDeleted
    }

    const myPublicPets = filterPets(reportedPets)
    
    return <div className={`${css["my-reports-container"]} ${open == false? css.menuOpen : ""}`} id="my-reports-container">
        <div className={css.content}>
            <Title className={css.title}>Mis mascotas reportadas</Title>
            <div className={css["result-container"]}>
            {myPublicPets.length == 0? <Subtitle className={css.subtitle}>Aún no tienes mascotas reportadas</Subtitle> :  myPublicPets.map((i)=><PetCardEdit key={i.id} id={i.id} name={i.name} description={i.description} petZone={i.petZone} imgUrl={i.imgUrl} deleted={i.deleted} status={i.status} latlng={{lat: i.loc_lat, lng:i.loc_lng}}></PetCardEdit>)}
            </div>
        </div>
    </div>
}