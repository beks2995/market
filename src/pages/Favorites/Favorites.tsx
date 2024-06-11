import { FC, useEffect, useState } from "react";
import { Idata } from "../home/interfaces";
import Card from "../../components/Card";
import { useSelector } from "react-redux";
import './Favorites.css'

const Favorites:FC = () => {
    const [favoriteProducts, setFavoriteProducts] = useState<Idata[]>([])
    useEffect(() => {
        setFavoriteProducts(JSON.parse(localStorage.getItem('inFavorited') as any));
        
    }, [])
    // console.log(favoriteProducts);
    const isLoading = useSelector((s: any) => s.isLoadingContentSlice.isLoading)
    // const clickHandle = (el: Idata) => {
    //     el.isFavorited = !el.isFavorited
    //     setFavoriteProducts((prev: Idata[]) => prev.filter(el => el.isFavorited ? el : ''))
    //     if(el.isFavorited){
    //         setFavoriteProducts((prev: Idata[]) => [...prev, el])
    //     }
        
    // } 

    return (
        <div className="favorite_products">
            {isLoading ? 'loading' : <h2 className="favorite_products_title">Избранные</h2> }
            <div className="cards">
                {
                    favoriteProducts && favoriteProducts.map((el, indx) => {
                        return <Card el={el} indx={indx} setInFavorited={setFavoriteProducts} inFavorited={favoriteProducts}/>
                    })
                }
            </div>
        </div>
    )
}
export default Favorites