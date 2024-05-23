import { FC } from "react";
import './Homepage.css'
import Top from "./sections/top";
import Headphones from "./sections/Headphones";
import WirelessHP from "./sections/WirelessHeadphones";

const Home: FC  = () => {
    return (
        <main className="main">
            <Top/>
            <Headphones/> 
            <WirelessHP/>
        </main>
    )
}
export default Home