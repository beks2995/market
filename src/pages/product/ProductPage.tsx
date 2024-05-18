import React from "react";
import ImageContainer from "../../components/Product/ImageContainer";
import PriceTag from "../../components/Product/PriceTag";
import { HeartIcon, ShoppingCartIcon } from "@heroicons/react/24/outline";
import Button from "../../components/Product/Button";
import Collapse from "../../components/Product/Collapse";
// import {  Collapse, Divider  } from "antd";

export default function ProductPage() {
  const images = [
    "/images/product-1-img-1.png",
    "/images/product-1-img-2.png",
    "/images/product-1-img-3.png",
    "/images/product-1-img-4.png",
    "/images/product-1-img-5.png",
  ];

  return (
    <section className="container mx-auto mt-4 max-w-[1110px]">
      <h1 className="mb-5 text-xl font-semibold text-dark-100">
        Автодержатель
      </h1>
      <div className="bg-white rounded-[30px] p-8 shadow-[0_0_20px_0_rgba(0,0,0,0.1)]">
        <div className="flex items-start justify-between">
          <HeartIcon className="h-8 text-dark-200" />
          <img src="/images/brand-1.png" alt="brand" />
        </div>
        <ImageContainer images={images} />
        <div className="flex items-end justify-between mt-7">
          <p className="text-lg font-semibold uppercase text-dark-200 md:text-xl lg:text-2xl">
            BOROFONE BH32
          </p>
          <PriceTag newPrice={2000} oldPrice={3000} discount={20} />
        </div>
      </div>
      <div className="relative grid items-start grid-cols-4 gap-5 mt-6">
        <div className="col-span-3 ">
         <Collapse>hello world</Collapse>
        </div>
        <div className="sticky top-0">
          <Button classes="mb-4">Купить!</Button>
          <Button>
            <ShoppingCartIcon className="h-6 mr-3 " />
            Добавить в корзину
          </Button>
        </div>
      </div>
    </section>
  );
}
