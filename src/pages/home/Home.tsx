import React from "react";
import './Home.css'
import Top from "./sections/Top";
import Headphones from "../../components/Headphones";

const Home: React.FC  = () => {

    return (
        <main>
            <Top/>
            <Headphones/>
        </main>
    )
}
export default Home