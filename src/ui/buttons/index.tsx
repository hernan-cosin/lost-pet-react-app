import React ,{ useState, useEffect} from "react"
import css from "./index.css"

type props = {
    children: String;
    color: "yellow" | "grey"
    className?: any
    onClick?: (e?)=> void
}

export function Button(p: props) {
    const [className, setClassName] = useState("")

    useEffect(()=>{
        setClassName(p.className)
    }, [className])
    
    return <button onClick={p.onClick} className={`${css["button"] + " " +  css[p.color] + " " + className}`}>{p.children}</button>
}