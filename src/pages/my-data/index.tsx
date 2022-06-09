import React, { useEffect, useState } from "react";
import { Message } from "ui/texts/message";
import { Title } from "ui/texts/title";
import {Button} from "ui/buttons"
import {UserDataForm} from "components/user-data-form"
import { useUserInfo } from "hooks/userInfo";
import {useUpdateUser} from "hooks/updateUser"
import css from "./my-data.css"

export function MyData() {
    const userInfo = useUserInfo()

    const [updatedUser, setupdatedUser] = useState(false)
    const [errorMessage, setErrorMessage] = useState(false)

    const [userInfoToUpdate, setUserInfoToUpdate] = useState({token:"", email: "", name: "", lastName: "", password: "", password1: "",})

    const updateUser = useUpdateUser(userInfoToUpdate) as any // custom hook

    useEffect(()=>{
        
        if (updateUser?.userUpdate || updateUser?.authUpdate || updateUser?.updatedUserAndAuth) {            
            // si se actualizó alguno de los datos del usuario
            // setea updatedUser true 
 
            setupdatedUser(true)
            window.location.reload() // recarga la pagina para mostrar la data actualizada en el formulario
        }
    }, [updateUser])

    useEffect(()=>{
        const form  = document.querySelector("form")
        if (updatedUser) {            
            form.reset() // se resetean las contraseñas del formulario
        }
    }, [updatedUser])

    function getInputValues() { // obtiene y retorna un objeto con la información fromateada para actualizar usuario
        const inputs = document.querySelectorAll("input") as any
        let inputValues = []

        for (const input of inputs) {
            inputValues.push([input.name, input.value])
        }
        
        const objInputValue = Object.fromEntries(inputValues) 
        objInputValue.email = localStorage.getItem("email")
        objInputValue.token = localStorage.getItem("token")
        
        if (objInputValue.password !== objInputValue.password1){ // varifica coincidencia de contraseñas
            return setErrorMessage(true)
        }

        return objInputValue as any
    }

    function handleSubmit(e) {
        e.preventDefault()
        const inputValues = getInputValues()
        
        setUserInfoToUpdate(inputValues)
    }
    
    return <div className={css["my-data-container"]} id="my-data-container">
        <div className={css.content}>
            <Title className={css.title}>Datos</Title>
            <form className={css["form"]} onSubmit={handleSubmit}>
              <UserDataForm newUser={false} {... userInfo}></UserDataForm>
              {errorMessage == true ? <Message className={css["error-message"]}>Las contraseñas deben coincidir</Message> : ""}
              <Button color={"yellow"}>Guardar</Button>
            </form>
        </div>
    </div>
}
