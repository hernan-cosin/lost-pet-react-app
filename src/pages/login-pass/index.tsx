import React, {useEffect, useState} from "react"
import css from "./login.css"
import {SearchInput} from "ui/text-field"
import { Button } from "ui/buttons"
import { ErrorMessage } from "ui/error-messages"
import {useAuthToken} from "hooks/authToken"
import { emailState } from "atoms/atoms"
import { useRecoilValue } from "recoil"
import {  useNavigate, useLocation } from "react-router-dom"

export function LoginPass() {
    const navigate = useNavigate()
    const location = useLocation()

    const [errorMessage, setErrorMessage] = useState(false)
    
    const [password, setPassword] = useState("")
    
    const email = useRecoilValue(emailState)
    const tokenHookRes = useAuthToken(email as string, password)

    useEffect(()=>{
        if (tokenHookRes == false) {
            setErrorMessage(true)
        }
        if (tokenHookRes == true) {
            setErrorMessage(false)
            
            navigate(location.state["from"], {replace:true})
        }
    }, [tokenHookRes])

    function formSubmit(e) {
        e.preventDefault()    
        const pass = e.target[0].value
        
        setPassword(pass)
    }

    return <div className={css["login-container"]}>
        <form onSubmit={formSubmit}>
            <SearchInput className={css["password-form"]} type="password" label="Contraseña" name={"password"}></SearchInput>
            {errorMessage == true ? <ErrorMessage className={css["error-message"]}>Contraseña incorrecta</ErrorMessage> : ""}
            <Button className={css.button} color="yellow">Siguiente</Button>
        </form>
    </div>
}