import React from "react";
import css from "./report-pet.css"
import { Texto } from "ui/text";
import {Button} from "ui/buttons"

export function ReportPet() {    
    return <div className={css["report-pet-container"]} id="report-pet-container">
        <div className={css.content}>
            <h1>Report pet</h1>
        </div>
    </div>
}