import React from "react";
import './Info.css'
import { Idata } from "../../../pages/home/interfaces";
interface Iprop {
    el: Idata
}

const Info: React.FC<Iprop> = ({el}) => {
    return (
        <div className="card__info">
            <b className="card__info-title">{el.name}</b>
            <div className="card__info-price">
                <p className="card__price-after">{el.priceAfterDiscount}</p>
                <p className="card__price-before">{el.priceBeforeDiscount}</p>
            </div>
        </div>
    )
}

export default Info