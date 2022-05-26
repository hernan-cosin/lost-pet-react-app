import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import css from "./home.css"
import { Title } from "ui/texts/title";
import { Body } from "ui/texts/body";
import {Button} from "ui/buttons"
import { PetCard } from "components/pet-card";

export function Home() {
    const navigate = useNavigate()

    function handleLocationClick() {        
        if (navigator.geolocation) {
          navigator.geolocation.getCurrentPosition(getLocation);
        }
    }
    
    function getLocation(position) {
        const location = {
          loc_lat: position.coords.latitude,
          loc_lng: position.coords.longitude,
        };        
        navigate(`/near-by/${location.loc_lat}/${location.loc_lng}`)
    }
    
    return <div className={css["home-container"]} id="home-container">
        <div className={css.content}>
            <div className={css["title-container"]}>
                <Title>Mascotas perdidas cerca tuyo</Title>
            </div>
            <div className={css["subtitle-container"]}>
                <Body>PARA VER LAS MASCOTAS REPORTADAS CERCA TUYO NECESITAMOS PERMISO PARA CONOCER TU UBICACIÓN.</Body>
            </div>
            <Button onClick={handleLocationClick} className={css.button} color={"yellow"}>Dar mi ubicación</Button>
        </div>
        <div>
        <PetCard key={3} id={100} name={"Prueba"} description={"Descripción prueba"} petZone={"Almagro"} imgUrl={"http://res.cloudinary.com/hcosin/image/upload/v1653569143/yz8z4coatuc9jfncd7in.jpg"} deleted={false} status={"lost"}></PetCard>
        </div>
    </div>
}