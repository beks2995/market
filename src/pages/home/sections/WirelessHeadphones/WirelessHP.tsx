import { FC, useState, useEffect, SetStateAction } from "react";
import { Idata } from "../../interfaces";
import { db } from "../../../../firebase/firestore";
import { collection, query, onSnapshot } from "firebase/firestore";
import Card from "../../../../components/Card";
import './WirelessHP.css'

const WirelessHP: FC = () => {
    const [wirelessHeadphones, setWirelessHeadphones] = useState<Array<Idata>>([])
    const [inFavorited, setInFavorited] = useState<SetStateAction<Idata[]>>([])
    useEffect (() => {
        const q = query(collection(db, "products/product_id/Wireless-Headphones"));
        const unsubscribe = onSnapshot(q, (querySnapshot) => {
            const arr:any = [];
            querySnapshot.forEach((doc) => {
                arr.push(doc.data());
            });
            setWirelessHeadphones(arr.map((el: Idata) =>  ({...el, isFavorited: false})))
        });
        return () => unsubscribe()
    }, []) 
    const clickHandle = (el: Idata) => {
        el.isFavorited = !el.isFavorited
        setInFavorited((prev: Idata[]) => prev.filter(el => el.isFavorited ? el : ''))
        if(el.isFavorited){
            setInFavorited((prev: Idata[]) => [...prev, el])
        }
        
    } 
    useEffect(() => {
        localStorage.setItem("inFavorited", JSON.stringify(inFavorited))
    }, [inFavorited])
    return (
        <section className="wirelessHeadphones">
            <p className="title">Безпроводные</p>
            <Card data={wirelessHeadphones} clickHandle={clickHandle}/>
        </section>
    )
}

export default WirelessHP