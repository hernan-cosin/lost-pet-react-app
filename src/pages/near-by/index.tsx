import React, { useEffect, useState } from "react";
import { Title } from "ui/texts/title";
import { Body } from "ui/texts/body";
import { PetCard } from "components/pet-card";
import {useGetPetsNearBy} from "hooks/hooks"
import { useRecoilValue } from "recoil";
import { openMenu } from "atoms/atoms";
import css from "./near-by.css"

export function NearBy() {
    const openMenuAtomValue = useRecoilValue(openMenu) // atom para corregir z-index
    const [open, setOpen]  = useState(false) // state para setear clase con z-index  

    useEffect(()=>{
        setOpen(!openMenuAtomValue)        
    }, [openMenuAtomValue])

    const pets = useGetPetsNearBy()
    
    return <div className={`${css["near-by-container"]} ${open  == false? css.menuOpen : ""}`} id="near-by-container">
            <div className={css.content}>
                <Title className={css.title}>Mascotas perdidas cerca tuyo</Title>
                <div className={css["result-container"]}>
                    {pets.length == 0? <Body className={css.noPetsText}>No hay mascotas perdidas cerca tuyo en este momento</Body> : pets.map((i)=><PetCard key={i.id} id={i.id} name={i.name} description={i.description} petZone={i.petZone} imgUrl={i.imgUrl} deleted={i.deleted == "false" || false? false: true} status={i.status} ownerEmail={i.user.email}></PetCard>)}
                </div>
            </div>
        </div>
}