import React from "react";
import ImageContainer from "../../components/Product/ImageContainer";
import PriceTag from "../../components/Product/PriceTag";
import {HeartIcon} from "@heroicons/react/24/outline";

type ProductInfoCardProps={
    name:string,
    images:string[],
    brand:string,
    newPrice:number,
    oldPrice:number,
    discount:number
}

function ProductInfoCard({name, images, brand, newPrice, oldPrice, discount}:ProductInfoCardProps) {
  return (
    <div className="bg-white rounded-[30px] p-8 shadow-[0_0_20px_0_rgba(0,0,0,0.1)]">
      <div className="flex items-start justify-between">
        <HeartIcon className="h-8 text-dark-200" />
        <img src={brand} alt="brand" />
      </div>
      <ImageContainer images={images} />
      <div className="flex items-end justify-between mt-7">
        <p className="text-lg font-semibold uppercase text-dark-200 md:text-xl lg:text-2xl">
          {name}
        </p>
        <PriceTag newPrice={newPrice} oldPrice={oldPrice} discount={discount} />
      </div>
    </div>
  );
}

export default ProductInfoCard;
