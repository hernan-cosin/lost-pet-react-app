import React, {useEffect, useState} from "react"
import {SearchInput} from "ui/text-field"
import {BlueLink} from "ui/texts/blue-link"
import { Button } from "ui/buttons"
import { ErrorMessage } from "ui/error-messages"
import {useAuthToken} from "hooks/authToken"
import { emailState } from "atoms/atoms"
import { useRecoilValue } from "recoil"
import {  useNavigate, useLocation } from "react-router-dom"
import {restorePass} from "lib/api"
import css from "./login.css"

export function LoginPass() {
    const navigate = useNavigate()
    const location = useLocation()

    const [errorMessage, setErrorMessage] = useState(false)
    
    const [password, setPassword] = useState("")
    const [restoredPass, setRestoredPass] = useState(false)
    
    const email = useRecoilValue(emailState)
    const tokenHookRes = useAuthToken(email as string, password)

    useEffect(()=>{
        if (tokenHookRes == false) {
            setErrorMessage(true)
        }
        if (tokenHookRes == true) {
            setErrorMessage(false)
            
            navigate(location.state["from"], {replace:true}) // redirige hacía donde se dirigía antes de login
        }
    }, [tokenHookRes])

    function formSubmit(e) {
        e.preventDefault()    
        const pass = e.target[0].value
        
        setPassword(pass)
    }

    async function handleForgotPassClick() {
        const res = await restorePass(email) // envia mail con nueva contraseña
        const restorePassRes = await res.json()

        if (restorePassRes.passRestoreRes) {
            setRestoredPass(true) // setea true para mostrar mensaje de contraseña enviada
        }        
    }

    return <div className={css["login-container"]}>
        <form onSubmit={formSubmit}>
            <SearchInput className={css["password-form"]} type="password" label="Contraseña" name={"password"}></SearchInput>
            {errorMessage == true ? <ErrorMessage className={css["error-message"]}>Contraseña incorrecta</ErrorMessage> : ""}
            {restoredPass? <body>Te hemos enviado una contraseña provisoria a tu email</body> : null}
            <Button className={css.button} color="yellow">Siguiente</Button>
            <BlueLink className={css.recoverPassword} userClick={handleForgotPassClick}>¿Olvidaste tu contraseña?</BlueLink>
        </form>
    </div>
}