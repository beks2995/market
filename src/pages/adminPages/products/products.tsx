import React, { FC, useState, SetStateAction, useEffect, Dispatch } from "react";
import Home from "../../home/Home";
import { Idata } from "../../home/interfaces";

const Products: FC = () => {
    const [inFavorited, setInFavorited] = useState<Idata[]>([]);

    return (
        <div>
            <Home setInFavorited={setInFavorited} inFavorited={inFavorited} />
        </div>
    );
}

export default Products;
