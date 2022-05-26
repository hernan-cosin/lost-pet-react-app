import React, { useEffect, useState } from "react";
import css from "./report-pet.css"
import {Button} from "ui/buttons"
import { Title } from "ui/texts/title";
import {Message} from "ui/texts/message"
import {ReportPetForm} from "components/report-pet-form"
import { useRecoilValue } from "recoil";
import {imgUrlState} from "atoms/atoms"
import {lostPetCoordsState} from "atoms/atoms"
import {reportPet} from "lib/api"
import {useNavigate} from "react-router-dom"

export function ReportPet() {
    const navigate = useNavigate()
    const tkn = localStorage.getItem("token")
    
    const imgUrlValue = useRecoilValue(imgUrlState)
    const lostPetCoordsStateValue = useRecoilValue(lostPetCoordsState)

    const [imgUrlValueIntState, setImgUrlValueIntState] = useState("")
    const [formErrorMessage, setFormErrorMessage] =  useState(false)

    useEffect(()=>{
        // state interno de este componente para guardar la url que viene de atoms
        setImgUrlValueIntState(imgUrlValue)
    }, [imgUrlValue])

    async function handleSubmit(e) {
        e.preventDefault()
        const name = e.target.querySelector('[name="name"]').value
        const description = e.target.querySelector('[name="description"]').value
        const neighborhood = e.target.querySelector('[name="neighborhood"]').value

        
        if (name.length == 0 || description.length == 0 || neighborhood.length == 0 || imgUrlValueIntState.length == 0 ) {
            setFormErrorMessage(!formErrorMessage)
        } else {
            const pet = {
                petName:name,
                petDescription:description,
                imgUrl:imgUrlValueIntState,
                status:"lost",
                loc_lat:lostPetCoordsStateValue[1],
                loc_lng:lostPetCoordsStateValue[0],
                petZone:neighborhood,
                deleted:false,
            }
            
            const res = await reportPet(pet,tkn)
            const response  = await res.json()
            
            if (response.response.created == true) {
                navigate("/me/reports")
            } else {return}
            
        }
        
    }
    
    return <div className={css["report-pet-container"]} id="report-pet-container">
        <div className={css.content}>
            <Title className={css.title}>Reportar mascota perdida</Title>
            <div className={css["form-container"]}>
                <form onSubmit={handleSubmit} className={css["form"]}>
                    <ReportPetForm></ReportPetForm>
                    <Button className={css["report-button"]} color="yellow">Reportar como perdido</Button>
                </form>
                    {formErrorMessage? <Message className={css["error-message"]}>Falta completar alguno de los datos obligatorios</Message> : ""}
                    <Button className={css["cancel-button"]} color="grey">Cancelar</Button>
            </div>
        </div>
    </div>
}