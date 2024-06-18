import { FC, useState, SetStateAction, useEffect, Dispatch } from "react";
import './Home.css'
import Top from "./sections/top";
import Headphones from "../../pages/home/sections/Headphones";
import WirelessHP from "./sections/WirelessHeadphones";
import { Idata } from "./interfaces";
import { useSelector, useDispatch } from "react-redux";
import { changeLoadingState } from "../../store/reducers/IsLoading";
interface Props {
    setInFavorited: Dispatch<SetStateAction<Idata[]>>
    inFavorited: Array<Idata>
}

const Home: FC<Props>  = ({setInFavorited, inFavorited}) => {
    const isLoading = useSelector((s: any) => s.isLoadingContentSlice.isLoading)
    const dispatch = useDispatch()
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
        <div className="main">
            <Top/>
            <div className="main_content">
                <Headphones isLoading={isLoading} inFavorited={inFavorited} setInFavorited={setInFavorited}/> 
                <WirelessHP isLoading={isLoading} inFavorited={inFavorited} setInFavorited={setInFavorited}/>
            </div>
        </div>
    )

}


export default Home;
