import { FC, useState, SetStateAction, useEffect } from "react";
import './Home.css'
import { useLocation } from "react-router-dom";
import Top from "./sections/top";
import Headphones from "../../pages/home/sections/Headphones";
import WirelessHP from "./sections/WirelessHeadphones";
import { Idata } from "./interfaces";
import { useSelector, useDispatch } from "react-redux";
import { changeLoadingState } from "../../store/reducers/IsLoading";

const Home: FC  = () => {
    const [inFavorited, setInFavorited] = useState<SetStateAction<Idata[]>>([])
    const isLoading = useSelector((s: any) => s.isLoadingContentSlice.isLoading)
    const dispatch = useDispatch()
    const location = useLocation()
    useEffect(() => {
        if(JSON.parse(localStorage.getItem('inFavorited') as any) === null){
            setInFavorited([])
        } else {
            setInFavorited(JSON.parse(localStorage.getItem('inFavorited') as any))
        }
        
    }, [])

    useEffect(() => {
        localStorage.setItem("inFavorited", JSON.stringify(inFavorited))
    }, [inFavorited])
    useEffect(() => {
        dispatch(changeLoadingState(true))
        setTimeout(() => {
            dispatch(changeLoadingState(false))
        }, 500)
    }, [])
    return (
        <main className="main">
            {location.pathname !== '/admin/products' && <Top />}
            <Headphones isLoading={isLoading} inFavorited={inFavorited} setInFavorited={setInFavorited}/> 
            <WirelessHP isLoading={isLoading} inFavorited={inFavorited} setInFavorited={setInFavorited}/>
        </main>
    )

}


export default Home;
