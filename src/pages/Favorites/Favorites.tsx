import { FC, useEffect, useState } from "react";
import { Idata } from "../home/interfaces";
import Card from "../../components/Card";
import { useSelector, useDispatch } from "react-redux";
import { changeLoadingState } from "../../store/reducers/IsLoading";
import './Favorites.css'

const Favorites:FC = () => {
    const [favoriteProducts, setFavoriteProducts] = useState<Idata[]>([])
    const dispatch = useDispatch()
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
    useEffect(() => {
        dispatch(changeLoadingState(true))
    }, [favoriteProducts])
    useEffect(() => {
        dispatch(changeLoadingState(false))
    }, [])

    return (
        <div className="favorite_products">
            {isLoading ? <h2 className="favorite_products_title">Избранные</h2> : 'loading' }
            <div className="cards">
                {
                    favoriteProducts && favoriteProducts.length > 0
                    ? 
                    favoriteProducts && favoriteProducts.map((el, indx) => {
                        return <Card el={el} indx={indx} setInFavorited={setFavoriteProducts} inFavorited={favoriteProducts}/>
                    })
                    :
                    <span className="favorite_products_null">У вас нет избранных товаров</span>
                }
            </div>
        </div>
    )
}
export default Favorites