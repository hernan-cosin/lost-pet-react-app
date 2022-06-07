import React, {useState, useEffect} from "react"
import { useLocation, useNavigate, Link } from "react-router-dom"
import { Subtitle } from "ui/texts/subtitle"
import { LinkText } from "ui/texts/Link"
import { BlueLink } from "ui/texts/blue-link"
import {editPetInformation, email, openMenu, passwordAndEmailState, emailState} from "atoms/atoms"
import { useRecoilValue, useSetRecoilState } from "recoil"
import css from "./menu-button.css"

export function MenuButton () {
    const setOpenMenuAtom = useSetRecoilState(openMenu)
    const openMenuAtomValue = useRecoilValue(openMenu)
    const location = useLocation()
    const navigate = useNavigate()

//  ### USER EMAIL INFORMATION ###
    const emailLocalStorage = localStorage.getItem("email")
    const tokenLocalStorage = localStorage.getItem("token")
    const emailAtom = useRecoilValue(emailState)

    const [userEmail, setUserEmail] =  useState("")
    const userState = useRecoilValue(email)
    
    useEffect(()=>{
        setUserEmail(userState as any);
    }, [userState])
//  ### ###
    
// ### MENU HAMBURGER BUTTON###
    const [menuOpen, setMenuOpen] = useState(false)
    const [toggleClassOne, setToggleClassOne] = useState("")
    const [toggleClassTwo, setToggleClassTwo] = useState("")
    const [toggleClassMenu, settoggleClassMenu] = useState("close")
    
    function handleClick() {
        setMenuOpen(!menuOpen)
        setOpenMenuAtom(!openMenuAtomValue)        
    }

    useEffect(()=>{
        // cierra el menu cuando escucha click en el logo y el menu esta abierto
        setMenuOpen(openMenuAtomValue)
    }, [openMenuAtomValue])
    
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
    const useSetResetEmail = useSetRecoilState(passwordAndEmailState)
    function handleLogout() {
        localStorage.removeItem("token")
        useSetResetEmail({email: "", password: ""})
        localStorage.removeItem("email")
        handleClick()
        navigate("/")
    }

// ### HANDLE CLEANUP PET INFORMATION
const setEditPetInformation = useSetRecoilState(editPetInformation)

    function handleCleanupPet() {                
            setEditPetInformation({
                id: 0,
                name: "",
                description: "",
                petZone: "",
                imgUrl: "",
                status: "",
                deleted: false,
                latlng: { lat: 0, lng: 0 },
            })            
    }

// ### ###
    return <>
        <div onClick={handleClick} className={css["menu-button-container"]}>
            <div className={`${css["line"] + " " +  toggleClassOne}`}></div>
            <div className={`${css["line"] + " " +  toggleClassTwo}`}></div>
        </div>
        <ul className={`${css["menu-options-container"] + " "  + toggleClassMenu}`} id="ul">
        <div className={css["user-information"]}>
            <Subtitle>{emailLocalStorage}</Subtitle>
            {!tokenLocalStorage? "" : <BlueLink className={css["user-information_close-link"]} userClick={handleLogout}>Cerar sesión</BlueLink>}
        </div>
        <li key={"my-data"} className={css["li"]} onClick={handleClick}>
            <Link to="/me" state={{from: location}} className={css.link}>
                <LinkText>Mis datos</LinkText>
            </Link>
        </li>
        <li key={"my-reports"} className={css["li"]} onClick={handleClick}>
            <Link to="/me/reports" className={css.link}>
                <LinkText>Mis mascotas reportadas</LinkText>
            </Link>
        </li>
        <li key={"report"} className={css["li"]} onClick={handleClick}>
            <Link to="/me/report" className={css.link} onClick={handleCleanupPet}>
                <LinkText>Reportar mascota</LinkText>
            </Link>
        </li>
        </ul>
    </>
}