import React from "react"
import { useNavigate  } from "react-router-dom";
import {Logo} from "ui/logo"
import {MenuButton} from "components/menu-button"
import { LogoText } from "ui/texts/logo";
import {useSetRecoilState, useRecoilValue} from "recoil"
import {openMenu} from "atoms/atoms"
import css from "./header.css"


export function Header(){
    let navigate = useNavigate();
    const setOpenMenuAtom = useSetRecoilState(openMenu)
    const openMenuAtomValue = useRecoilValue(openMenu)
    
    function handleLogoClick() {
        if (openMenuAtomValue) {
            // cierra el menu si esta abierto
            setOpenMenuAtom(false)
        }
        navigate("/", {replace:true})
    }

    return <div className={css["header-container"]} id="header-container">
        <div className={css["header-content"]} id="header-content">
            <div onClick={handleLogoClick} className={css["logo-content"]} id="logo-content">
                <Logo></Logo>
                <LogoText>Mascotas Perdidas</LogoText>
            </div>
            <MenuButton/>
        </div>
    </div>
}