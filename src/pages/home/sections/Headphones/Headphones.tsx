import { FC, useState, useEffect, SetStateAction, Dispatch } from "react";
import { Idata } from "../../interfaces";
import { db } from "../../../../firebase/firestore";
import { useSelector, useDispatch } from "react-redux";
import { collection, query, onSnapshot } from "firebase/firestore";
import Card from "../../../../components/Card";
import './Headphones.css'
import { changeLoadingState } from "../../../../store/reducers/IsLoading";
interface Istates {
    setInFavorited: Dispatch<SetStateAction<Array<Idata>>>
    inFavorited: SetStateAction<Idata[]>
}

const Headphones: FC<Istates> = ({setInFavorited, inFavorited}) => {
    const [headphones, setHeadphones] = useState<Array<Idata>>([])
    const isLoading = useSelector((s: any) => s.isLoadingContentSlice.isLoading)
    const dispatch = useDispatch()
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
    useEffect(() => {
        dispatch(changeLoadingState(true))
    }, [headphones])
    useEffect(() => {
        dispatch(changeLoadingState(false))
    }, [])
    

 
    return (
        <section className="headphones">
            {isLoading ? <p className="title">Наушники</p> : ''}
            <div className="cards">
                {
                    headphones && headphones.map((el, indx) => {
                        return <Card el={el} indx={indx} setInFavorited={setInFavorited} inFavorited={inFavorited} />
                    })
                }
            </div>

        </section>
    )
}

export default Headphones
