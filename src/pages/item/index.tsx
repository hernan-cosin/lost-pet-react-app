import React, {useState, useEffect} from "react"
import { useParams } from "react-router-dom";
import {ImageSlider} from "components/carousel"
import {useItemResult} from "hooks/hooks"
import css from "./item.css"

type ItemProps = {

}

export function Item(props: ItemProps) {
    const clase = "." + css["item-content"]
    const useItemResultRes = useItemResult()

    return <div className={clase}>
        <h3>{useItemResultRes.title}</h3>
        <h5>{useItemResultRes.price}</h5>
        <ImageSlider id={useItemResultRes.id} title={useItemResultRes.title} pictures={useItemResultRes.pictures} price={useItemResultRes.price}></ImageSlider>
    </div>
}