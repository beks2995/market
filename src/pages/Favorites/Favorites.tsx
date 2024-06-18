import { Dispatch, FC, SetStateAction, useEffect, useState } from "react";
import { Idata } from "../home/interfaces";
import Card from "../../components/Card";
import { useSelector, useDispatch } from "react-redux";
import { changeLoadingState } from "../../store/reducers/IsLoading";
import './Favorites.css'
// interface Props {
//     setInFavorited: Dispatch<SetStateAction<Idata[]>>
//     inFavorited: Array<Idata>
// }

const Favorites:FC = () => {
    const [inFavorited, setInFavorited] = useState<Idata[]>([])
    const isLoading = useSelector((s: any) => s.isLoadingContentSlice.isLoading)
    const dispatch = useDispatch()
    useEffect(() => {
        setInFavorited(JSON.parse(localStorage.getItem('inFavorited') as any));
    }, [])
    useEffect(() => {
        dispatch(changeLoadingState(true))
        setTimeout(() => {
            dispatch(changeLoadingState(false))
        }, 500)
    }, [])
    useEffect(() => {
        localStorage.setItem("inFavorited", JSON.stringify(inFavorited))
    }, [inFavorited])

    return (
        <div className="favorite_products">
            {isLoading ? 'loading' : <h2 className="favorite_products_title">Избранные</h2> }
            <div className="cards">
                {
                    inFavorited && inFavorited.length > 0
                    ? 
                    inFavorited && inFavorited.map((el, indx) => {
                        return <div className="card" key={indx}>
                            <Card el={el} indx={indx} setInFavorited={setInFavorited} inFavorited={inFavorited}/>
                        </div>
                    })
                    :
                    <span className="favorite_products_null">У вас нет избранных товаров</span>
                }
            </div>
        </div>
    )
}
export default Favorites