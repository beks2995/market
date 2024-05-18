import React from "react";
import ImageContainer from "../../components/Product/ImageContainer";
import PriceTag from "../../components/Product/PriceTag";

export default function ProductPage() {
  const images = [
    "/images/product-1-img-1.png",
    "/images/product-1-img-2.png",
    "/images/product-1-img-3.png",
    "/images/product-1-img-4.png",
    "/images/product-1-img-5.png",
  ];

  return (
    <section className="container mx-auto mt-4">
      <h1 className="text-dark-100 font-semibold text-xl mb-5">
        Автодержатель
      </h1>
      <div className="bg-white rounded-[30px] p-8">
        <div className="flex items-start justify-between">
          <i className="bi bi-heart text-dark-200 text-xl text-stroke-1"></i>
          <img src="/images/brand-1.png" alt="brand" />
        </div>
        <ImageContainer images={images} />
        <div className="flex justify-between mt-7 items-end">
          <p className="uppercase font-semibold text-dark-200 text-lg md:text-xl lg:text-2xl">
            BOROFONE BH32
          </p>
          <PriceTag newPrice={2000} oldPrice={3000} discount={20} />
        </div>
      </div>
    </section>
  );
}
