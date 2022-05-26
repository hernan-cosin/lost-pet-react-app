import React, { useEffect, useState } from "react";
import css from "./new-user.css"
import { Message } from "ui/texts/message";
import { Title } from "ui/texts/title";
import {Button} from "ui/buttons"
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
   
    const createUser = useCreateUser(newUserData) as any
    
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

        const objInputValue = Object.fromEntries(inputValues) 
        objInputValue.email = userEmail
        
        if (objInputValue.password !== objInputValue.password1){
            return setErrorMessage(true)
        }

        setNewUserData(objInputValue as typeof newUserData) 
    }

    return <div className={css["my-data-container"]} id="my-data-container">
        <div className={css.content}>
            <Title className={css.title}>Datos</Title>
            <form className={css["form"]} onSubmit={handleSubmit}>
                <UserDataForm newUser={true}></UserDataForm>
                {errorMessage == true ? <Message className={css["error-message"]}>Las contraseñas deben coincidir</Message> : ""}
                <Button color={"yellow"}>Siguiente</Button>
            </form>
        </div>
    </div>
}