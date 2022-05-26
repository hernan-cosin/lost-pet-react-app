import React, { useEffect } from "react";
import { Title } from "ui/texts/title";
import { PetCard } from "components/pet-card";
import {useGetPetsNearBy} from "hooks/hooks"
import css from "./near-by.css"

export function NearBy() {
    const pets = useGetPetsNearBy()

    return <div className={css["near-by-container"]} id="near-by-container">
            <div className={css.content}>
                <Title className={css.title}>Mascotas perdidas cerca tuyo</Title>
                <div className={css["result-container"]}>
                    {pets?.map((i)=><PetCard key={i.id} id={i.id} name={i.name} description={i.description} petZone={i.petZone} imgUrl={i.imgUrl} deleted={i.deleted == "false" || false? false: true} status={i.status}></PetCard>)}
                </div>
            </div>
        </div>
}