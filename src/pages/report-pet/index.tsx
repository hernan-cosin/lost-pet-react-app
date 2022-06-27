import React, { useEffect, useState } from "react";
import {useNavigate} from "react-router-dom"
import {Button} from "ui/buttons"
import { Title } from "ui/texts/title";
import {Message} from "ui/texts/message"
import { BlueLink } from "ui/texts/blue-link";
import {ReportPetForm} from "components/report-pet-form"
import { useRecoilValue, useRecoilState } from "recoil";
import { flagCreatePet,lostPetCoordsState, imgUrlState, editPetInformation, cordsUpdate} from "atoms/atoms"
import {reportPet, updatePetInfo, reportAsFound, unpublishPet} from "lib/api"
import css from "./report-pet.css"

export function ReportPet() {
    const navigate = useNavigate()
    const tkn = localStorage.getItem("token")
    const [imgUrlValueIntState, setImgUrlValueIntState] = useState("")
    const [noDataToUpdateMessage, setNoDataToUpdateMessage] = useState(false)
    const [formErrorMessage, setFormErrorMessage] =  useState(false)
    const petInformationStateValue = useRecoilValue(editPetInformation)
    const petId = useRecoilValue(editPetInformation).id
    const imgUrlValue = useRecoilValue(imgUrlState)
    const lostPetCoordsStateValue = useRecoilValue(lostPetCoordsState)
    const cordsUpdateAtom = useRecoilValue(cordsUpdate)
    const flagCreatePetVal = useRecoilValue(flagCreatePet) // flag para saber si hay que crear una mascota o actualizarla
    const [imgUrl, setImgUrl] = useRecoilState(imgUrlState)
    const [prevInformation, setPrevInformation] = useState(null)

    useEffect(()=>{
        // state interno de este componente para guardar la url que viene de atoms
        setImgUrlValueIntState(imgUrlValue)
    }, [imgUrlValue])

    useEffect(()=>{
        setPrevInformation(petInformationStateValue)
    }, [])

    // useEffect(()=>{
    //     console.log(prevInformation);
        
    // }, [prevInformation])
    
    async function handleSubmit(e) {
        e.preventDefault()
        const name = e.target.querySelector('[name="name"]').value
        const description = e.target.querySelector('[name="description"]').value
        const neighborhood = e.target.querySelector('[name="neighborhood"]').value
        
        if (name.length == 0 || description.length == 0 || neighborhood.length == 0 || imgUrl.length == 0 ) {
            setFormErrorMessage(!formErrorMessage)       
        } else {            
            if (flagCreatePetVal) {
                const pet = {
                    petName:name,
                    petDescription:description,
                    imgUrl:imgUrl,
                    status:"lost",
                    loc_lat:lostPetCoordsStateValue[1],
                    loc_lng:lostPetCoordsStateValue[0],
                    petZone:neighborhood,
                    deleted:false,
                    petId: undefined
                }
                
                const res = await reportPet(pet,tkn)
                const response  = await res.json()
                
                if (response.response.created == true) {
                    navigate("/me/reports")
                } else {
                    return
                }
            } if (!flagCreatePetVal) {
                
                const petUpdate = {
                    name:name,
                    description:description,
                    imgUrl:imgUrl,
                    status:"lost",
                    loc_lat:lostPetCoordsStateValue[1],
                    loc_lng:lostPetCoordsStateValue[0],
                    petZone:neighborhood,
                    petId: petId
                }
                
                if (prevInformation.name == petUpdate.name && prevInformation.description == petUpdate.description && prevInformation.imgUrl == petUpdate.imgUrl && prevInformation.petZone == petUpdate.petZone &&  prevInformation.latlng.lat == petUpdate.loc_lat && prevInformation.latlng.lng == petUpdate.loc_lng && prevInformation.status == "lost"){
                    setNoDataToUpdateMessage(true)
                    return 
                } else {
                    setNoDataToUpdateMessage(false)
                    const res = await updatePetInfo(petUpdate, tkn)
                    const response  = await res.json()
                    if (response.updated) {
                        navigate("/me/reports")
                    }
                }
            }   
        }
    }
    
    async function handleFoundClick(e) { // reportar mascota como encontrada
        e.preventDefault()
            const reportAsFoundPetInformation = {
                deleted: false,
                description: petInformationStateValue.description, 
                id: petInformationStateValue.id,
                imgUrl:petInformationStateValue.imgUrl,
                loc_lat: petInformationStateValue.latlng.lat,
                loc_lng: petInformationStateValue.latlng.lng,
                name: petInformationStateValue.name,
                petZone:petInformationStateValue.petZone,
                status: "found"
            }
        
        const res = await reportAsFound(reportAsFoundPetInformation, tkn)
        const reportAsFoundRes = await res.json()

        if (reportAsFoundRes) {
            navigate("/me/reports")
        }
    }

    async function handleUnpublishClick() { // despublicar/eliminar mascota
        const reportAsFoundPetInformation = {
            deleted: true,
            description: petInformationStateValue.description, 
            id: petInformationStateValue.id,
            imgUrl:petInformationStateValue.imgUrl,
            loc_lat: petInformationStateValue.latlng.lat,
            loc_lng: petInformationStateValue.latlng.lng,
            name: petInformationStateValue.name,
            petZone:petInformationStateValue.petZone,
            status: "lost"
        }

        const res = await unpublishPet(reportAsFoundPetInformation, tkn)
        const unpublishPetRes = await res.json()

        if (unpublishPetRes.unpublished) {
            navigate("/me/reports")
        }
    }
    
    return <div className={css["report-pet-container"]} id="report-pet-container">
        <div className={css.content}>
            <Title className={css.title}>Reportar mascota perdida</Title>
            <div className={css["form-container"]}>
                <form onSubmit={handleSubmit} className={css["form"]}>
                    <ReportPetForm></ReportPetForm>
                    {flagCreatePetVal? <Button className={css["report-button"]} color="yellow">Reportar como perdido</Button> : <Button className={css["report-button"]} color="yellow">Guardar</Button>}
                </form>
                    {noDataToUpdateMessage? <Message className={css["error-message"]}>No hay datos nuevos para actualizar</Message> : ""}
                    {formErrorMessage? <Message className={css["error-message"]}>Falta completar alguno de los datos obligatorios</Message> : ""}
                    {petInformationStateValue.status == "found" || flagCreatePetVal? null : <Button onClick={handleFoundClick} className={css["cancel-button"]} color="grey">Reportar como encontrado</Button>}
                    {petId?<BlueLink userClick={handleUnpublishClick} className={css.unpublishButton}>Despublicar</BlueLink> : null}
            </div>
        </div>
    </div>
}