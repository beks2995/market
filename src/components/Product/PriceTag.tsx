import React from "react";
import { PriceTagProps } from "./types";

export default function PriceTag({
  newPrice,
  oldPrice,
  discount,
}: PriceTagProps) {
  return (
    <div className="flex items-center gap-x-4 font-semibold">
      <div className="flex flex-col justify-center items-center">
        <span className="text-primary-200 text-lg md:text-xl lg:text-3xl">
          {`${newPrice} сом`}
        </span>
        <span className="text-sm md:text-lg lg:text-xl text-dark-50 line-through">
          {`${oldPrice} сом`}
        </span>
      </div>
      <span className="text-primary-200 text-base md:text-lg lg:text-xl">
        {`-${discount}%`}
      </span>
    </div>
  );
}
