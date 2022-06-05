import React from "react";
import { useNavigate } from "react-router-dom";
import css from "./home.css"
import { Title } from "ui/texts/title";
import { Body } from "ui/texts/body";
import {Button} from "ui/buttons"

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
    </div>
}