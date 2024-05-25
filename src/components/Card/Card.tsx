import { FC, MouseEvent } from "react";
import { Idata } from "../../pages/home/interfaces";
import './Card.css'
import Info from "../Card/info";
interface IProps {
    data? : Idata[];
    clickHandle?: (el: Idata) => void
}


const Card: FC<IProps> = ({data, clickHandle}) => {
    // const [data, setData] = useState<Array<Idata>>([])
    // const [inFavorited, setInFavorited] = useState<SetStateAction<Idata[]>>([])
    // useEffect (() => {
    //     const q = query(collection(db, "products/product_id/Headphones"));
    //     const unsubscribe = onSnapshot(q, (querySnapshot) => {
    //         const arr:any = [];
    //         querySnapshot.forEach((doc) => {
    //             arr.push(doc.data());
    //         });
    //         setData(arr.map((el: Idata) =>  ({...el, isFavorited: false})))
    //         // setData(arr)
    //     });
    //     return () => unsubscribe()
    // }, []) 
    // console.log(data);
    // const clickHandle = (el: Idata) => {
    //     el.isFavorited = !el.isFavorited
    //     setInFavorited((prev: Idata[]) => prev.filter(el => el.isFavorited ? el : ''))
    //     if(el.isFavorited){
    //         setInFavorited((prev: Idata[]) => [...prev, el])
    //     }
        
    // } 
    // useEffect(() => {
    //     localStorage.setItem("inFavorited", JSON.stringify(inFavorited))
    // }, [inFavorited])
    // const getProductsSubcollections = async () => {
    //     const productsRef = db.collection("products");
    //     const subcollections = await productsRef.listCollections();
      
    //     subcollections.forEach((subcollection) => {
    //       console.log(subcollection.id);
    //     });
    // };
    // getProductsSubcollections();

    return (
        <div className="products">
            <div className="cards">
                {
                    data && data.map((el, indx) => (
                        <div key={indx} className="card">
                            <div className="card__top">
                                <div onClick={(e: MouseEvent<HTMLDivElement>) => clickHandle && clickHandle(el)}>
                                    {
                                        el.isFavorited
                                        ?
                                        <svg width="20" height="19" viewBox="0 0 20 19" xmlns="http://www.w3.org/2000/svg">
                                            <path d="M10.001 1.88189C12.35 -0.227115 15.98 -0.157115 18.243 2.10989C20.505 4.37788 20.583 7.98989 18.479 10.3459L9.99901 18.8379L1.52101 10.3459C-0.582994 7.98989 -0.503994 4.37189 1.75701 2.10989C4.02201 -0.154115 7.64501 -0.230115 10.001 1.88189Z" fill="#1C1C27"/>
                                        </svg>
                                        :
                                        <svg width="20" height="19" viewBox="0 0 20 19" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path d="M10.001 1.88189C12.35 -0.227115 15.98 -0.157115 18.243 2.10989C20.505 4.37788 20.583 7.98989 18.479 10.3459L9.99901 18.8379L1.52101 10.3459C-0.582994 7.98989 -0.503994 4.37189 1.75701 2.10989C4.02201 -0.154115 7.64501 -0.230115 10.001 1.88189ZM16.827 3.52289C15.327 2.02089 12.907 1.95989 11.337 3.36989L10.002 4.56789L8.66601 3.37089C7.09101 1.95889 4.67601 2.02089 3.17201 3.52489C1.68201 5.01488 1.60701 7.39989 2.98001 8.97589L10 16.0069L17.02 8.97688C18.394 7.39988 18.319 5.01789 16.827 3.52289Z" fill="#1C1C27"/>
                                        </svg>
                                    }
                                </div>
                                <div  className="card__top-img"><img src={el.img} alt="" /></div>
                            </div>
                            <Info el={el}/>
                            <div className="card__estimation">
                                <svg width="25" height="22" viewBox="0 0 25 22" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M12.6268 17.6026L5.41618 21.9608L7.37647 13.8272L0.960754 8.38856L9.38215 7.72087L12.6268 0L15.8715 7.72087L24.2941 8.38856L17.8771 13.8272L19.8374 21.9608L12.6268 17.6026Z" fill="#FFCE7F"/>
                                </svg>
                                <p className="card__estimation-text">{el.estimation}</p>
                            </div>
                        </div>
                    ))
                }
            </div>
        </div>
    )
}
export default Card