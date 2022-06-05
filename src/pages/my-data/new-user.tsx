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
   
    const createUser = useCreateUser(newUserData) as any //custom hook
    
    useEffect(()=>{
        if (createUser?.response) { // cuando se crea un usuario te redirige a la pagina de login para acceder
            navigate("/login")
        }
        
    }, [createUser])

    function getInputValues () {// obtiene y retorna un objeto con la información fromateada para crear usuario
        const inputs = document.querySelectorAll("input") as any
    
        let inputValues = []
    
        for (const input of inputs) {            
            inputValues.push([input.name, input.value])
        }
    
        const objInputValue = Object.fromEntries(inputValues) 
        objInputValue.email = userEmail
        
        if (objInputValue.password !== objInputValue.password1){ // varifica coincidencia de contraseñas
            return setErrorMessage(true)
        }
        return objInputValue as any
    }
    
    function handleSubmit(e) {
        e.preventDefault()

        const objInputValue = getInputValues()

        setNewUserData(objInputValue) 
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