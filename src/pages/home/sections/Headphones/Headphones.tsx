import { FC, useState, useEffect, SetStateAction, Dispatch } from "react";
import { Idata } from "../../interfaces";
import { db } from "../../../../firebase/firestore";
import { collection, query, onSnapshot } from "firebase/firestore";
import Card from "../../../../components/Card";
import './Headphones.css'
import { useDispatch } from "react-redux";
import { changeLoadingState } from "../../../../store/reducers/IsLoading";
interface Istates {
    setInFavorited: Dispatch<SetStateAction<Array<Idata>>>
    inFavorited: SetStateAction<Idata[]>
    isLoading: boolean
}

const Headphones: FC<Istates> = ({isLoading, setInFavorited, inFavorited}) => {
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
 
    return (
        <section className="headphones">
            {isLoading ? '' : <p className="title">Наушники</p>}
            <div className="cards">
                {
                    headphones && headphones.map((el, indx) => {
                        return <div className="card" key={indx}>
                            <Card el={el} indx={indx} setInFavorited={setInFavorited} inFavorited={inFavorited} />
                        </div>
                    })
                }
            </div>

        </section>
    )
}

export default Headphones
