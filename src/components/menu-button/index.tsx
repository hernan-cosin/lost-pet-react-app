import React, {useState, useEffect} from "react"
import { Navigate, useLocation, useNavigate } from "react-router-dom"
import {Link} from "react-router-dom"
import {Texto} from "ui/text"
import css from "./menu-button.css"
import {email, passwordAndEmailState} from "atoms/atoms"
import { useRecoilValue, useSetRecoilState } from "recoil"

export function MenuButton () {
    const location = useLocation()
    const navigate = useNavigate()
//  ### USER EMAIL INFORMATION ###
    const [userEmail, setUserEmail] =  useState("")
    const userState = useRecoilValue(email)
    
    useEffect(()=>{
        setUserEmail(userState);
    }, [userState])
//  ### ###
    
// ### MENU HAMBURGER BUTTON###
    const [menuOpen, setMenuOpen] = useState(false)
    const [toggleClassOne, setToggleClassOne] = useState("")
    const [toggleClassTwo, setToggleClassTwo] = useState("")
    const [toggleClassMenu, settoggleClassMenu] = useState("close")
    
    function handleClick() {
        setMenuOpen(!menuOpen)
    }
    
    useEffect(()=>{        
        if (menuOpen) {
            setToggleClassOne(css["one"])
            setToggleClassTwo(css["two"])
            settoggleClassMenu(css["open"])
        }
        else {
            setToggleClassOne("")
            setToggleClassTwo("")
            settoggleClassMenu(css["close"])
        }        
    }, [menuOpen])
// ### ###

// ### HANDLE LOGOUT CLICK ###
    const resetEmail = useSetRecoilState(passwordAndEmailState)
    function handleLogout() {
        localStorage.removeItem("token")
        resetEmail({email: "", password: ""})
        navigate("/")
        handleClick()
    }
// ### ###

    return <>
        <div onClick={handleClick} className={css["menu-button-container"]}>
            <div className={`${css["line"] + " " +  toggleClassOne}`}></div>
            <div className={`${css["line"] + " " +  toggleClassTwo}`}></div>
        </div>
        <ul className={`${css["menu-options-container"] + " "  + toggleClassMenu}`} id="ul">
        <div className={css["user-information"]}>
            <Texto subtitle={true}>{userEmail}</Texto>
            {!userEmail? "" : <Texto className={css["user-information_close-link"]} userClick={handleLogout} link={true}>Cerar sesión</Texto>}
        </div>
        <li key={"my-data"} className={css["li"]} onClick={handleClick}>
            <Link to="/me" state={{from: location}} className={css.link}>
                <Texto subtitle={true}>Mis datos</Texto>
            </Link>
        </li>
        <li key={"my-reports"} className={css["li"]} onClick={handleClick}>
            <Link to="/me/reports" className={css.link}>
                <Texto subtitle={true}>Mis mascotas reportadas</Texto>
            </Link>
        </li>
        <li key={"report"} className={css["li"]} onClick={handleClick}>
            <Link to="/me/report" className={css.link}>
                <Texto subtitle={true}>Reportar mascota</Texto>
            </Link>
        </li>
        </ul>
    </>
}