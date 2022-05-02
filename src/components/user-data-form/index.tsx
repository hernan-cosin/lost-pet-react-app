import React from "react";
import css from "./user-data-form.css"
import {SearchInput} from "ui/text-field"
import { Button } from "ui/buttons"; 

type props = {
    name?: string
    lastName?: string
    newUser: boolean
}

export function UserDataForm (p:props) {    

    return <>   
            <SearchInput required={true}type={"text"} label={"Nombre"} value={p.name? p.name : "" } name={"name"}></SearchInput>
            <SearchInput required={true}type={"text"} label={"Apellido"} value={p.lastName? p.lastName : ""} name={"lastName"}></SearchInput>
            <SearchInput required={p.newUser? true : false} type={"password"} label={"Contraseña"} name={"password"}></SearchInput>
            <SearchInput required={p.newUser? true : false} type={"password"} label={"Repetir contraseña"} name={"password1"}></SearchInput>
    </>
}