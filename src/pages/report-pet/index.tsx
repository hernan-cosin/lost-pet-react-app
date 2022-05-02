import React from "react";
import css from "./report-pet.css"
import { Texto } from "ui/text";
import {Button} from "ui/buttons"
import {ReportPetForm} from "components/report-pet-form"


export function ReportPet() {    
    return <div className={css["report-pet-container"]} id="report-pet-container">
        <div className={css.content}>
            <Texto className={css.title} title={true}>Reportar mascota perdida</Texto>
            <div className={css["form-container"]}>
                <form className={css["form"]}>
                    <ReportPetForm></ReportPetForm>
                </form>
                    <Button className={css["cancel-button"]} color="grey">Cancelar</Button>
            </div>
        </div>
    </div>
}