import { FC, useState, useEffect, SetStateAction, Dispatch } from "react";
import { Idata } from "../../interfaces";
import { db } from "../../../../firebase/firestore";
import { collection, query, onSnapshot } from "firebase/firestore";
import Card from "../../../../components/Card";
import './WirelessHP.css'
interface Istates {
    setInFavorited: Dispatch<SetStateAction<Array<Idata>>>;
    inFavorited: SetStateAction<Idata[]>
}

const WirelessHP: FC<Istates> = ({setInFavorited, inFavorited}) => {
    const [wirelessHeadphones, setWirelessHeadphones] = useState<Array<Idata>>([])
    useEffect (() => {
        const q = query(collection(db, "items"));
        const unsubscribe = onSnapshot(q, (querySnapshot) => {
            const arr:any = [];
            querySnapshot.forEach((doc) => {
                arr.push(doc.data()); 
            });
            setWirelessHeadphones(arr.filter((el: Idata) => el.categoryId === '/categories/Wireless-Headphones' && {...el, isFavorited: false}))
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
    return (
        <section className="wirelessHeadphones">
            <p className="title">Безпроводные</p>
            <Card data={wirelessHeadphones} clickHandle={clickHandle} inFavorited={inFavorited}/>
        </section>
    )
}

export default WirelessHP