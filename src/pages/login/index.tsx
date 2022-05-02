import React, {useState, useEffect} from "react"
import { useNavigate, useLocation } from "react-router-dom"
import css from "./login.css"
import {SearchInput} from "ui/text-field"
import { Button } from "ui/buttons"
import { useEmailCheck } from "hooks/emailCheck"

export function Login() {
    const location = useLocation()
    
    const navigate = useNavigate()
    
    const [email, setEmail] = useState("")
    const response = useEmailCheck(email)
    

    useEffect(()=>{        
        if (response === true) {
            navigate("/login-pass", {state:{from: location.state["from"]}})
        } 
        if (response === false) {
            navigate("/me/new")
        }
    }, [response])

    async function handleFormSubmit(e) {
        e.preventDefault()
        
        const inputEmail = e.target[0].value
        setEmail(inputEmail)        
    }

    return <div className={css["login-container"]}>
        <form onSubmit={handleFormSubmit}>
            <SearchInput className={css["email-form"]} type="email" label="Email" name={"email"}></SearchInput>
            <Button className={css.button} color="yellow">Siguiente</Button>
        </form>
    </div>
}