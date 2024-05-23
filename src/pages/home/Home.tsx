// Home.tsx
import React from "react";
import './Home.css'
import Top from "./sections/Top";
import Headphones from "../../pages/home/sections/Headphones";
import WirelessHP from "./sections/WirelessHeadphones";

interface HomeProps {
  setFavoritedCount: React.Dispatch<React.SetStateAction<number>>;
}

const Home: React.FC<HomeProps> = ({ setFavoritedCount }) => {
  return (
    <main className="main">
      <Top />
      <Headphones setFavoritedCount={setFavoritedCount} />
      <WirelessHP setFavoritedCount={setFavoritedCount}/>
    </main>
  );
}

export default Home;
