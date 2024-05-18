import React from "react";
import './Homepage.css'
import Top from "./sections/top";
import Headphones from "../../components/headphones";

const Home: React.FC  = () => {

    const [data, setData] = useState<Array<Idata>>([])
    useEffect (() => {
        const q = query(collection(db, "products/product_id/Headphones"));
        const unsubscribe = onSnapshot (q, (querySnapshot) => {
            const arr:any = [];
            querySnapshot.forEach((doc) => {
                arr.push(doc.data());
            });
            console.log(arr);
            setData(arr)
        });
        return () => unsubscribe()
        
    }, []) 

    return (
        <main>
            <Top/>
            <Headphones/>
        </main>
    )
}
export default Home