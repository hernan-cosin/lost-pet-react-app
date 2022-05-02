import React, { useEffect, useState } from "react";
import css from "./new-user.css"
import { Texto } from "ui/text";
import {Button} from "ui/buttons"
import {ErrorMessage} from "ui/error-messages"
import {UserDataForm} from "components/user-data-form"
import { useRecoilValue } from "recoil";
import { useCreateUser } from "hooks/createUser";
import { emailState} from "atoms/atoms"
import { useNavigate } from "react-router-dom";

export function NewUser() {
    const navigate = useNavigate()
    const userEmail = useRecoilValue(emailState)

    const [errorMessage, setErrorMessage] = useState(false)
    
    const [newUserData, setNewUserData] = useState({email:"", name:"", lastName: "", password: "", password1:""}) 
   
    const createUser = useCreateUser(newUserData)
    
    useEffect(()=>{
        if (createUser?.response) {
            navigate("/login")
        }
        
    }, [createUser])
    
    function handleSubmit(e) {
        e.preventDefault()
        const inputs = e.target.querySelectorAll("input")

        let inputValues = []

        for (const input of inputs) {            
            inputValues.push([input.name, input.value])
        }

        const objInputValue = Object.fromEntries(inputValues) as typeof newUserData
        objInputValue.email = userEmail
        
        if (objInputValue.password !== objInputValue.password1){
            return setErrorMessage(true)
        }

        setNewUserData(objInputValue)
    }

    return <div className={css["my-data-container"]} id="my-data-container">
        <div className={css.content}>
            <Texto title={true} className={css.title}>Datos</Texto>
            <form className={css["form"]} onSubmit={handleSubmit}>
                <UserDataForm newUser={true}></UserDataForm>
                {errorMessage == true ? <ErrorMessage className={css["error-message"]}>Las contraseñas deben coincidir</ErrorMessage> : ""}
                <Button color={"yellow"}>Siguiente</Button>
            </form>
        </div>
    </div>
}