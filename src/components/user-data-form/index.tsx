import React from "react";
import {SearchInput} from "ui/text-field"
import css from "./user-data-form.css"

type props = {
    name?: string
    lastName?: string
    newUser: boolean // si el usuario es nuevo setea required true, debe poner las contraseñas
                     // si no es nuevo usuario setea required false, las contraseñas no son obligatorias
}

export function UserDataForm (p:props) {    

    return <>   
            <SearchInput required={true}type={"text"} label={"Nombre"} value={p.name? p.name : "" } name={"name"}></SearchInput>
            <SearchInput required={true}type={"text"} label={"Apellido"} value={p.lastName? p.lastName : ""} name={"lastName"}></SearchInput>
            <SearchInput required={p.newUser? true : false} type={"password"} label={"Contraseña"} name={"password"}></SearchInput>
            <SearchInput required={p.newUser? true : false} type={"password"} label={"Repetir contraseña"} name={"password1"}></SearchInput>
    </>
}