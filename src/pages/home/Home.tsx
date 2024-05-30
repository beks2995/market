
import { FC, useState, SetStateAction, useEffect } from "react";
import './Homepage.css'

import Top from "./sections/top";
import Headphones from "../../pages/home/sections/Headphones";
import WirelessHP from "./sections/WirelessHeadphones";
import { Idata } from "./interfaces";


const Home: FC  = () => {
    const [inFavorited, setInFavorited] = useState<SetStateAction<Idata[]>>([])
    useEffect(() => {
        setInFavorited(JSON.parse(localStorage.getItem('inFavorited') as any))
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

const Home: FC<HomeProps> = ({ setFavoritedCount }) => {
  return (
    <main className="main">
      <Top />
      <Headphones setFavoritedCount={setFavoritedCount} />
      <WirelessHP setFavoritedCount={setFavoritedCount}/>
    </main>
  );
}

export default Home;
