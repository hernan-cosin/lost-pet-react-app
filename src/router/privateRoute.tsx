import { tokenValueState } from "atoms/atoms";
import React, {useEffect, useState} from "react";
import { Navigate, useLocation } from "react-router-dom";
import { useRecoilValue } from "recoil";


export function PrivateRoute({children}){    
    const location = useLocation()
    const localStorageToken = localStorage.getItem("token")
    // const tokenFromState = useRecoilValue(tokenValueState) 
    // console.log("token from state", tokenFromState);
    
    const [token, setToken] = useState("")
    
    useEffect(()=>{
        setToken(localStorageToken)        
    }, [token])    
    
    return (token !== null ? children : <Navigate to="/login" state={{from:location}}/>)
}