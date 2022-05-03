import React from "react";
import css from "./index.css"
import {Button} from "ui/buttons"
import {SearchInput} from "ui/text-field"
import {AreaInput} from "ui/text-field/text-area"
import {MapboxSearch} from "components/mapbox-search-form"

export function ReportPetForm() {
    return <>
        <SearchInput name="name" type="text" label="Nombre"></SearchInput>
        <AreaInput name="description" label="Descripción"></AreaInput>
        <MapboxSearch/>
        <Button color="yellow">Reportar como perdido</Button>
    </>
}