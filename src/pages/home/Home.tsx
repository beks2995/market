import React from "react";
import './Homepage.css'
import Top from "./sections/top";
import Headphones from "./sections/headphones";

const Home: React.FC  = () => {
    return (
        <main>
            <Top/>
            <Headphones/>
        </main>
    )
}
export default Home