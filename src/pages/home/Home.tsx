import React from "react";
import { db } from "../../firebase/firestore";
import { useEffect } from "react";
import { collection, query, onSnapshot } from "firebase/firestore";
import './Homepage.css'

const Home: React.FC  = () => {
    useEffect (() => {
        const q = query(collection(db, "products/product_id/headphones"));
        const unsubscribe = onSnapshot (q, (querySnapshot) => {
            const arr:any = [];
            querySnapshot.forEach((doc) => {
                arr.push(doc.data());
            });
            console.log(arr);
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
        </main>
    )
}
export default Home