import React from "react";
import { PriceTagProps } from "./types";

export default function PriceTag({
  newPrice,
  oldPrice,
  discount,
}: PriceTagProps) {
  return (
    <div className="flex items-center font-semibold gap-x-4">
      <div className="flex flex-col items-center justify-center">
        <span className="text-lg text-primary-200 md:text-xl lg:text-3xl">
          {`${newPrice} сом`}
        </span>
        <span className="text-sm line-through md:text-lg lg:text-xl text-dark-50">
          {`${oldPrice} сом`}
        </span>
      </div>
      <span className="text-base text-primary-200 md:text-lg lg:text-xl">
        {`-${discount}%`}
      </span>
    </div>
  );
}
