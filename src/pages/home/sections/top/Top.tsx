import React from "react";
import './Top.css'

const Top: React.FC = () => {
    return (
        <section className="top">
            <div className="top_text">
                <div className="top__text_title">
                    <h1  className="top__text_h1">Аксессуары</h1>
                    <p  className="top__text_p">для </p>
                </div>
                <p className="top__text_sub">Iphone 13 Pro Max</p>
            </div>
        </section>
    )
}
export default Top