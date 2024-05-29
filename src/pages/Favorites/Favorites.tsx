import { FC, SetStateAction, useEffect, useState } from "react";
import { Idata } from "../home/interfaces";

const Favorites:FC = () => {
    const [favoriteProducts, setFavoriteProducts] = useState<SetStateAction<Idata[]>>([])
    useEffect(() => {
        setFavoriteProducts(JSON.parse(localStorage.getItem('inFavorited') as any));
        
    }, [])
    console.log(favoriteProducts);
    // const q = localStorage.getItem('inFavorited') || Array
    // const p = JSON.parse(q)
    // console.log(p);
    

    return (
        <div>
            
        </div>
    )
}
export default Favorites