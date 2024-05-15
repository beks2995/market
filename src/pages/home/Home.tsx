import React, { useState } from "react";
import { db } from "../../firebase/firestore";
import { useEffect } from "react";
import { collection, query, onSnapshot } from "firebase/firestore";
import './Homepage.css'

interface Idata {
    category: string;
    description: string;
    estimation: string;
    img: string;
    inBasket: boolean;
    inFavorite: boolean;
    name: string;
    priceAfterDiscount: string;
    priceBeforeDiscount: string;
}

const Home: React.FC  = () => {
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
        <main>
            <section>
                <div className="top">
                    <div className="top__text">
                        <div className="top__text-title">
                            <h1  className="top__text-h1">Аксессуары</h1>
                            <p  className="top__text-p">для </p>
                        </div>
                        <p className="top__text-sub">Iphone 13 Pro Max</p>
                    </div>
                    {/* <img src="../../../images/iPhone-13-Pro-Max-silver-1000x1000 1.jpg" alt="phone" /> */}
                </div>
            </section>

            <section>
                {
                    data.map(el => (
                        <div className="headphones">
                            <div className="headphones__card">
                                <img src="./images/Vector (2).svg" alt="favorite" />
                                <img src={el.img} alt="" />
                                <div className="headphones__info">
                                    <b className="headphones__info-title">{el.name}</b>
                                    <div className="headphones__info-price">
                                        <p>{el.priceAfterDiscount}</p>
                                        <p>{el.priceBeforeDiscount}</p>
                                    </div>
                                </div>
                                <div className="headphones__estimation">
                                    <img src="./images/Vector (3).svg" alt="estimation" />
                                    <p>{el.estimation}</p>
                                </div>
                            </div>
                        </div>
                    ))
                }
            </section>
        </main>
    )
}
export default Home