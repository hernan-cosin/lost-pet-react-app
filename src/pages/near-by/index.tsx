import React from "react";
import css from "./near-by.css"
import { Texto } from "ui/text";
import { PetCard } from "components/pet-card";
import {useGetPetsNearBy} from "hooks/hooks"

export function NearBy() {
    const pets = useGetPetsNearBy()
    // console.log(pets);
    
    
    return <div className={css["near-by-container"]} id="near-by-container">
        <div className={css.content}>
            <Texto className={css.title} title={true}>Mascotas perdidas cerca tuyo</Texto>
            <div className={css["result-container"]}>
            {pets.map((i)=><PetCard key={i.id} id={i.id} name={i.name} description={i.description} petZone={i.petZone} imgUrl={i.imgUrl} deleted={i.deleted} status={i.status}></PetCard>)}
        </div>
        </div>

    </div>
}