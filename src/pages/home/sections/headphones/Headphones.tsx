import React, { useState, useEffect } from "react";
import { Idata } from "../../interfaces";
import { db } from "../../../../firebase/firestore"; 
import { collection, query, onSnapshot } from "firebase/firestore";
import './Headphones.css'
import Button from "./button";
import Info from "./info";

const Headphones: React.FC = () => {
    const [data, setData] = useState<Array<Idata>>([])
    useEffect (() => {
        const q = query(collection(db, "products/product_id/headphones"));
        const unsubscribe = onSnapshot (q, (querySnapshot) => {
            const arr:any = [];
            querySnapshot.forEach((doc) => {
                arr.push(doc.data());
            });
            console.log(arr);
            setData(arr)
        });
        return () => unsubscribe()
    }, []) 

    return (
        <section>
            <p className="title">Наушники</p>
            <div className="headphones">
                {
                    data.map(el => (
                        <div className="headphone">
                            <div className="headphones__card">
                                <div className="headphones__card-top">
                                    <Button/>
                                    <div  className="headphones__card-img"><img src={el.img} alt="" /></div>
                                </div>
                                <Info el={el}/>
                                <div className="headphones__estimation">
                                    <svg width="25" height="22" viewBox="0 0 25 22" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M12.6268 17.6026L5.41618 21.9608L7.37647 13.8272L0.960754 8.38856L9.38215 7.72087L12.6268 0L15.8715 7.72087L24.2941 8.38856L17.8771 13.8272L19.8374 21.9608L12.6268 17.6026Z" fill="#FFCE7F"/>
                                    </svg>
                                    <p className="headphones__estimation-text">{el.estimation}</p>
                                </div>
                            </div>
                        </div>
                    ))
                }
            </div>
        </section>
    )
}
export default Headphones