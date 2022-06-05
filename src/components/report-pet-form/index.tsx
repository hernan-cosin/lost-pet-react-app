import React, { useEffect } from "react";
import { Body } from "ui/texts/body";
import {SearchInput} from "ui/text-field"
import {AreaInput} from "ui/text-field/text-area"
import { Mapbox } from "components/map";
import {MyDropzone} from "components/dropzone"
import {editPetInformation, flagCreatePet} from "atoms/atoms"
import { useRecoilState, useSetRecoilState } from "recoil";

import css from "./index.css"


export function ReportPetForm() {
    const petInformation = useRecoilState(editPetInformation)
    const setFlagCreatePet = useSetRecoilState(flagCreatePet)

    useEffect(()=>{ 
        if (petInformation[0].name.length > 0) { // si la mascota tiene nombre setea el flag en false
            setFlagCreatePet(false) // no hay que crearla, hay que actualizarla
        } else {
            setFlagCreatePet(true) // setea al flag en true, hay que crear una nueva mascota
        }
    }, [petInformation])
    
    
    return <>
        <SearchInput name="name" type="text" label="Nombre" value={petInformation[0].name.length > 0 ? petInformation[0].name : ""}></SearchInput>
        <AreaInput name="description" label="Descripción"  value={petInformation?petInformation[0].description : ""}></AreaInput>
        <MyDropzone imgUrl={petInformation?petInformation[0].imgUrl : ""}></MyDropzone>
        <SearchInput name="neighborhood" type="text" label="Barrio" value={petInformation?petInformation[0].petZone : ""}></SearchInput>
        <Body className={css["map-information"]}>Haz click en el mapa para seleccionar un punto de referencia para reportar a tu mascota</Body>
        <Mapbox latlng={petInformation?petInformation[0].latlng : {lat: undefined, lng: undefined}}></Mapbox>
    </>
}