import React, { useState, useEffect } from "react"
import { useNavigate, useLocation } from "react-router-dom"
import { SearchInput } from "ui/text-field"
import { Button } from "ui/buttons"
// import { useEmailCheck } from "hooks/emailCheck"
import { emailState } from "atoms/atoms"
import { useRecoilState } from "recoil"
import { emailCheck } from "lib/api"
import css from "./login.css"

export function Login() {    
    const navigate = useNavigate()
    const location = useLocation()
    const [email, setEmail] = useState("")
    const [response, setResponse] = useState({userFound:null})    
    
    // setear mail en state general
    const [emailAtom, setEmailAtom] = useRecoilState(emailState)

    useEffect(()=>{        
        if (response.userFound === true) {
            setEmailAtom(email)
            navigate("/login-pass", {state:{from: location.state["from"]}})
        } 
        if (response.userFound === false) {
            setEmailAtom(email)
            navigate("/me/new", {state:{from: location.state["from"]}})
        }
    }, [response])

    useEffect(()=>{
        if (email) {
            localStorage.setItem("email", email)
        }
    }, [email])

    async function handleFormSubmit(e) {
        e.preventDefault()
        
        const inputEmail = e.target[0].value
        
        if (inputEmail.length > 0) {
            setEmail(inputEmail)
            const res = await emailCheck(inputEmail)
            const response = await res.json()
            setResponse(response)
        }   
    }

    return <div className={css["login-container"]}>
        <form onSubmit={handleFormSubmit}>
            <SearchInput className={css["email-form"]} type="email" label="Email" name={"email"}></SearchInput>
            <Button className={css.button} color="yellow">Siguiente</Button>
        </form>
    </div>
}