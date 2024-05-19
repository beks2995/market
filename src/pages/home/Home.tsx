// import React from "react";
// import './Home.css'
// import Top from "./sections/Top";
// import Headphones from "../../components/Headphones";

// const Home: React.FC  = () => {

//     return (
//         <main>
//             <Top/>
//             <Headphones />
//         </main>
//     )
// }
// export default Home

// Home.tsx
import React from "react";
import './Home.css'
import Top from "./sections/Top";
import Headphones from "../../components/Headphones";

interface HomeProps {
  setFavoritedCount: React.Dispatch<React.SetStateAction<number>>;
}

const Home: React.FC<HomeProps> = ({ setFavoritedCount }) => {
  return (
    <main>
      <Top />
      <Headphones setFavoritedCount={setFavoritedCount} />
    </main>
  );
}

export default Home;
