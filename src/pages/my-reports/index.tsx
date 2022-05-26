import React, { useEffect, useState } from "react";
import css from "./my-reports.css"
import { Title } from "ui/texts/title";
import {useMyReportedPet} from "hooks/reportedPet"
import { useRecoilValue } from "recoil";
import {reportedPetState} from "atoms/atoms"
import {PetCardEdit} from "components/pet-card/editable"

export function MyReports() {
    const reportedPets = useRecoilValue(reportedPetState)
    const myReportedPetHookRes = useMyReportedPet()

    function filterPets(pets) {
        const filterDeleted = pets.filter((p)=>{
            return p.deleted == "false"
        })

        return filterDeleted
    }

    const myPublicPets = filterPets(reportedPets)
    
    return <div className={css["my-reports-container"]} id="my-reports-container">
        <div className={css.content}>
            <Title className={css.title}>Mis mascotas reportadas</Title>
            <div className={css["result-container"]}>
            {reportedPets? myPublicPets.map((i)=><PetCardEdit key={i.id} id={i.id} name={i.name} description={i.description} petZone={i.petZone} imgUrl={i.imgUrl} deleted={i.deleted} status={i.status}></PetCardEdit>) : ""}
            </div>
        </div>

    </div>
}