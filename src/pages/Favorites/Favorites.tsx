import { FC, SetStateAction, useEffect, useState } from "react";
import { Idata } from "../home/interfaces";
import Card from "../../components/Card";

const Favorites:FC = () => {
    const [favoriteProducts, setFavoriteProducts] = useState<SetStateAction<Idata[]>>([])
    useEffect(() => {
        setFavoriteProducts(JSON.parse(localStorage.getItem('inFavorited') as any));
        
    }, [])
    console.log(favoriteProducts);
    

    return (
        <div>
            {/* <Card /> */}
        </div>
    )
}
export default Favorites