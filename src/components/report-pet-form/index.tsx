import React from "react";
import { Body } from "ui/texts/body";
import {SearchInput} from "ui/text-field"
import {AreaInput} from "ui/text-field/text-area"
import { Mapbox } from "components/map";
import {MyDropzone} from "components/dropzone"

import css from "./index.css"


export function ReportPetForm() {    
    return <>
        <SearchInput name="name" type="text" label="Nombre"></SearchInput>
        <AreaInput name="description" label="Descripción"></AreaInput>
        <MyDropzone></MyDropzone>
        <SearchInput name="neighborhood" type="text" label="Barrio"></SearchInput>
        <Body className={css["map-information"]}>Haz click en el mapa para seleccionar un punto de referencia para reportar a tu mascota</Body>
        <Mapbox></Mapbox>
    </>
}