import { FC, useEffect, useState } from "react";
import { Idata } from "../home/interfaces";
import Card from "../../components/Card";
import './Favorites.css'

const Favorites:FC = () => {
    const [favoriteProducts, setFavoriteProducts] = useState<Idata[]>([])
    useEffect(() => {
        setFavoriteProducts(JSON.parse(localStorage.getItem('inFavorited') as any));
        
    }, [])
    console.log(favoriteProducts);
    
    const clickHandle = (el: Idata) => {
        el.isFavorited = !el.isFavorited
        setFavoriteProducts((prev: Idata[]) => prev.filter(el => el.isFavorited ? el : ''))
        if(el.isFavorited){
            setFavoriteProducts((prev: Idata[]) => [...prev, el])
        }
        
    } 

    return (
        <div className="favorite_products">
            <h2 className="favorite_products_title">Избранные</h2>
            <Card data={favoriteProducts} clickHandle={clickHandle} inFavorited={favoriteProducts}/>
        </div>
    )
}
export default Favorites