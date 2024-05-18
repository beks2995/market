import React, { useState, MouseEvent, useEffect, SetStateAction } from "react";
import './Button.css'
import { Idata } from "../../../interfaces";
interface IProps {
    el: Idata;
    indx: number
}

const Button: React.FC<IProps> = ({el, indx}) => {
    const [inFavorited, setInFavorited] = useState<boolean>(false)
    const [favoriteProducts, setFavoriteProducts] = useState<SetStateAction<Idata[]>>([])
    const clickHandle = (e: MouseEvent<HTMLButtonElement>) => {
        setInFavorited(!inFavorited)
    } 
    useEffect(() => {
        setFavoriteProducts(JSON.parse(localStorage.getItem('favoriteProducts') || `${favoriteProducts}`))

    }, [])
    useEffect(() => {
        localStorage.setItem(`inFavorited ${indx}`, JSON.stringify(inFavorited)) 
        setFavoriteProducts((prev: Idata[]) => [...prev, el])
        localStorage.setItem("favoriteProducts", JSON.stringify(favoriteProducts))
    },[inFavorited])
    
    const value = localStorage.getItem(`inFavorited ${indx}`)
    const parse = value ? JSON.parse(value) : null
    // console.log(parse);
    

    return (
        <button className="headphones__favorite" onClick={clickHandle}>
            {
                parse  
                ?
                <>
                    <svg width="20" height="19" viewBox="0 0 20 19" xmlns="http://www.w3.org/2000/svg">
                        <path d="M10.001 1.88189C12.35 -0.227115 15.98 -0.157115 18.243 2.10989C20.505 4.37788 20.583 7.98989 18.479 10.3459L9.99901 18.8379L1.52101 10.3459C-0.582994 7.98989 -0.503994 4.37189 1.75701 2.10989C4.02201 -0.154115 7.64501 -0.230115 10.001 1.88189Z" fill="#1C1C27"/>
                    </svg>
                </>
                :
                <svg width="20" height="19" viewBox="0 0 20 19" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M10.001 1.88189C12.35 -0.227115 15.98 -0.157115 18.243 2.10989C20.505 4.37788 20.583 7.98989 18.479 10.3459L9.99901 18.8379L1.52101 10.3459C-0.582994 7.98989 -0.503994 4.37189 1.75701 2.10989C4.02201 -0.154115 7.64501 -0.230115 10.001 1.88189ZM16.827 3.52289C15.327 2.02089 12.907 1.95989 11.337 3.36989L10.002 4.56789L8.66601 3.37089C7.09101 1.95889 4.67601 2.02089 3.17201 3.52489C1.68201 5.01488 1.60701 7.39989 2.98001 8.97589L10 16.0069L17.02 8.97688C18.394 7.39988 18.319 5.01789 16.827 3.52289Z" fill="#1C1C27"/>
                </svg>
            }
        </button>
    )
}

export default Button