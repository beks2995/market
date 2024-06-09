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
            const arr: any = [];
            querySnapshot.forEach((doc) => {
                arr.push({...doc.data(), id: doc.id}); 
            });

            setWirelessHeadphones(arr.filter((el: Idata) => el.categoryId.id === 'Wireless-Headphones' && {...el, isFavorited: false}))

        });
        return () => unsubscribe()
    }, [])

    return (
        <section className="wirelessHeadphones">
            <p className="title">Безпроводные</p>
            <div className="cards">
                {
                    wirelessHeadphones && wirelessHeadphones.map((el, indx) => {
                        return <Card el={el} indx={indx} setInFavorited={setInFavorited} inFavorited={inFavorited}/>

                    })
                }
            </div>

        </section>
    )
}

export default WirelessHP