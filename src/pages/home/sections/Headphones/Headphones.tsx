import { FC, useState, useEffect, SetStateAction, Dispatch } from "react";
import { Idata } from "../../interfaces";
import { db } from "../../../../firebase/firestore";
import { collection, query, onSnapshot } from "firebase/firestore";
import Card from "../../../../components/Card";
import './Headphones.css'
interface Istates {
    setInFavorited: Dispatch<SetStateAction<Array<Idata>>>
    inFavorited: SetStateAction<Idata[]>
}

const Headphones: FC<Istates> = ({setInFavorited, inFavorited}) => {
    const [headphones, setHeadphones] = useState<Array<Idata>>([])
    useEffect (() => {
        const q = query(collection(db, "items"));

        const unsubscribe = onSnapshot(q, (querySnapshot) => {
            const arr: any = [];
            querySnapshot.forEach((doc) => {
                arr.push({...doc.data(), id: doc.id});
            });            
            setHeadphones(arr.filter((el: Idata) =>  el.categoryId.id === 'Headphones' && {...el, isFavorited: false}))
        });
        return () => unsubscribe()
    }, []) 
    console.log(headphones);
    

    const clickHandle = (el: Idata) => {
        el.isFavorited = !el.isFavorited
        setInFavorited((prev: Idata[]) => prev.filter(el => el.isFavorited ? el : ''))
        if (el.isFavorited) {
            setInFavorited((prev: Idata[]) => [...prev, el])
        }

        
    } 
    return (
        <section className="headphones">
            <p className="title">Наушники</p>
            <Card data={headphones} clickHandle={clickHandle} inFavorited={inFavorited}/>

        </section>
    )
}

export default Headphones
