import { FC, useState, SetStateAction, useEffect } from "react";
import './Home.css'
import Top from "./sections/top";
import Headphones from "../../pages/home/sections/Headphones";
import WirelessHP from "./sections/WirelessHeadphones";
import { Idata } from "./interfaces";


const Home: FC  = () => {
    const [inFavorited, setInFavorited] = useState<SetStateAction<Idata[]>>([])
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
    return (
        <main className="main">
            <Top/>
            <Headphones inFavorited={inFavorited} setInFavorited={setInFavorited}/> 
            <WirelessHP inFavorited={inFavorited} setInFavorited={setInFavorited}/>
        </main>
    )

}


export default Home;
