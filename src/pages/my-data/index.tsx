import React, { useEffect, useState } from "react";
import css from "./my-data.css"
import { Message } from "ui/texts/message";
import { Title } from "ui/texts/title";
import {Button} from "ui/buttons"
import {UserDataForm} from "components/user-data-form"
import { useUserInfo } from "hooks/userInfo";
import { useRecoilValue } from "recoil";
import { emailState, tokenValueState } from "atoms/atoms";
import {useUpdateUser} from "hooks/updateUser"


export function MyData() {
    const userInfo = useUserInfo()

    const userEmail = useRecoilValue(emailState)    
    const token = useRecoilValue(tokenValueState)

    const [updatedUser, setupdatedUser] = useState(false)
    const [errorMessage, setErrorMessage] = useState(false)

    const [userInfoToUpdate, setUserInfoToUpdate] = useState({token:"", email: "", name: "", lastName: "", password: "", password1: "",})

    const updateUser = useUpdateUser(userInfoToUpdate) as any

    useEffect(()=>{
        if (updateUser?.userUpdate || updateUser?.authUpdate || updateUser?.updatedUserAndAuth) {
            setupdatedUser(true)
        }
    }, [updateUser])

    useEffect(()=>{
        const form  = document.querySelector("form")
        form.reset()
    }, [updatedUser])

    function getInputValues() {
        const inputs = document.querySelectorAll("input") as any
        let inputValues = []

        for (const input of inputs) {
            inputValues.push([input.name, input.value])
        }
        
        const objInputValue = Object.fromEntries(inputValues) 
        objInputValue.email = userEmail
        objInputValue.token = token
        
        if (objInputValue.password !== objInputValue.password1){
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
