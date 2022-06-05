import React, { useEffect, useState } from "react";
import { Title } from "ui/texts/title";
import {SearchInput} from "ui/text-field"
import {AreaInput} from "ui/text-field/text-area"
import { Message } from "ui/texts/message";
import { Button } from "ui/buttons";
import {openReportForm} from "atoms/atoms"
import { useRecoilValue, useSetRecoilState } from "recoil"
import {sendReport, sendEmail} from "lib/api"
// import {editPetInformation} from "atoms/atoms"
import css from "./index.css"

type props = {
    name:string
    id: number
    ownerEmail: string
}

export function ReportSeenPet(p:props) {    
    const openReportState = useRecoilValue(openReportForm)    
    const setOpenReportState = useSetRecoilState(openReportForm)
    const [error, setError] = useState(false)
    // const setEditPetInformationState = useSetRecoilState(editPetInformation)

    async function handleSubmit(e) {
        e.preventDefault()

        const inputs = e.target.querySelectorAll("input")
        const descriptionVal = e.target.querySelector("textarea") 

        const [name, tel] = inputs

        if (name.value.length == 0 || tel.value.length == 0 || descriptionVal.value.length == 0) {
            return setError(true)
        } else {
            const reporterInformation = {
                reporterName: name.value,
                cellphone: tel.value,
                lastSeen: descriptionVal.value,
                petId: p.id
            }

            const sendgridEmailInfo = {
                to: p.ownerEmail,
                email: process.env.EMAIL, // Use the email address or domain you verified above
                reporterNameValue: name.value,
                petName: p.name,
                lastSeenLocationValue: descriptionVal.value,
                reporterCelValue: tel.value,
              };


            const createReportRes = await sendReport(reporterInformation)
            const createReport = await createReportRes.json()

            if (createReport.reportCreated) {
                const emailRes = await sendEmail(sendgridEmailInfo)
                const emailSend = await emailRes.json()
                if (emailSend.sendEmailController) {
                    handleCloseClick()
                }
            }            
        }
    } 
    
    function handleCloseClick() {
        setOpenReportState({petId: p.id, open: !openReportState})
    } 
    
    return <div className={css["form-container"] + ` ${ openReportState.open == true && openReportState.petId == p.id? css.open : ""}`} id={"form-container"}>
        <form onSubmit={handleSubmit} className={css.form} id={"form"}>
            <Title className={css["form-report-seen-pet-close"]} onClick={handleCloseClick}>X</Title>
            <Title className={css["form-report-seen-pet-title"]}>{"Reportar información sobre " + p.name}</Title>
            <SearchInput name="name" type="text" label="Tu nombre"></SearchInput>
            <SearchInput name="name" type="tel" label="Tu celular"></SearchInput>
            <AreaInput name="description" label="¿En dondé lo viste?"></AreaInput>
            {!error? "" : <Message className={css.eroor}>Todos los campos son obligatorios</Message>}
            <Button className={css["button"]} color="yellow">Enviar</Button>
        </form>
    </div>
}