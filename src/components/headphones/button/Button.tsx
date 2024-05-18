import React from "react";
import './Button.css'

const Button: React.FC = () => {
    
    // useEffect(() => {
    //     setFavoriteProducts(JSON.parse(localStorage.getItem('favoriteProducts') || `${favoriteProducts}`))

    // }, [])
    // useEffect(() => {
    //     localStorage.setItem(`inFavorited ${indx}`, JSON.stringify(inFavorited)) 
    //     setFavoriteProducts((prev: Idata[]) => [...prev, el])
    //     localStorage.setItem("inFavorited", JSON.stringify(inFavorited))
    // },[inFavorited])
    
    // const value = localStorage.getItem(`inFavorited ${indx}`)
    // const parse = value ? JSON.parse(value) : null
    // console.log(parse);
    

    return (
        <button className="card__favorite">
            {
                
                <>
                    <svg width="20" height="19" viewBox="0 0 20 19" xmlns="http://www.w3.org/2000/svg">
                        <path d="M10.001 1.88189C12.35 -0.227115 15.98 -0.157115 18.243 2.10989C20.505 4.37788 20.583 7.98989 18.479 10.3459L9.99901 18.8379L1.52101 10.3459C-0.582994 7.98989 -0.503994 4.37189 1.75701 2.10989C4.02201 -0.154115 7.64501 -0.230115 10.001 1.88189Z" fill="#1C1C27"/>
                    </svg>
                </>
                
                
            }
        </button>
    )
}

// export default Button