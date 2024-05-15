import React from "react";
import './Info.css'
import { Idata } from "../../../interfaces";
interface Iprop {
    el: Idata
}

const Info: React.FC<Iprop> = ({el}) => {
    return (
        <div className="headphones__info">
            <b className="headphones__info-title">{el.name}</b>
            <div className="headphones__info-price">
                <p>{el.priceAfterDiscount}</p>
                <p>{el.priceBeforeDiscount}</p>
            </div>
        </div>
    )
}

export default Info