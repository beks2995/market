import React from "react";
import { ShoppingCartIcon } from "@heroicons/react/24/outline";
import Button from "../../components/Product/Button";
import Collapse from "../../components/Product/Collapse";
import ProductInfoCard from "../../components/Product/ProductInfoCard";

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
      <ProductInfoCard name="BOROFONE BH32" brand="/images/brand-1.png" images={images} newPrice={2400} oldPrice={3000} discount={20}/>
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
