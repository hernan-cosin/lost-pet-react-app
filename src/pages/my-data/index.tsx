import React, { useEffect, useState } from "react";
import { Message } from "ui/texts/message";
import { Title } from "ui/texts/title";
import {Button} from "ui/buttons"
import {UserDataForm} from "components/user-data-form"
import { useUserInfo } from "hooks/userInfo";
import { useRecoilValue } from "recoil";
import { emailState, tokenValueState } from "atoms/atoms";
import {useUpdateUser} from "hooks/updateUser"
import css from "./my-data.css"

export function MyData() {
    const userInfo = useUserInfo()

    const userEmail = useRecoilValue(emailState)    
    const token = useRecoilValue(tokenValueState)

    const [updatedUser, setupdatedUser] = useState(false)
    const [errorMessage, setErrorMessage] = useState(false)

    const [userInfoToUpdate, setUserInfoToUpdate] = useState({token:"", email: "", name: "", lastName: "", password: "", password1: "",})

    const updateUser = useUpdateUser(userInfoToUpdate) as any // custom hook

    useEffect(()=>{
        console.log(userInfoToUpdate);
        
    }, [userInfoToUpdate])

    useEffect(()=>{
        if (updateUser?.userUpdate || updateUser?.authUpdate || updateUser?.updatedUserAndAuth) {
            // si se actualizó alguno de los datos del usuario
            // setea updatedUser true 
            setupdatedUser(true)
        }
    }, [updateUser])

    useEffect(()=>{
        const form  = document.querySelector("form")
        form.reset() // se resetean las contraseñas del formulario
    }, [updatedUser])

    function getInputValues() { // obtiene y retorna un objeto con la información fromateada para actualizar usuario
        const inputs = document.querySelectorAll("input") as any
        let inputValues = []

        for (const input of inputs) {
            inputValues.push([input.name, input.value])
        }
        
        const objInputValue = Object.fromEntries(inputValues) 
        objInputValue.email = userEmail
        objInputValue.token = token
        
        if (objInputValue.password !== objInputValue.password1){ // varifica coincidencia de contraseñas
            return setErrorMessage(true)
        }

        return objInputValue as any
    }

    function handleSubmit(e) {
        e.preventDefault()
        const inputValues = getInputValues()
        // console.log(inputValues);
        
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
