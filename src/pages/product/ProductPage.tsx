import React from "react";

export default function ProductPage() {
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
        <div className="grid grid-cols-3 justify-center gap-y-3">
          <img
            src="/images/product-1-img-1.png"
            alt="product picture"
            className="mx-auto"
          />
          <img
            src="/images/product-1-img-2.png"
            alt="product picture"
            className="mx-auto"
          />
          <img
            src="/images/product-1-img-3.png"
            alt="product picture"
            className="mx-auto"
          />
          <img
            src="/images/product-1-img-4.png"
            alt="product picture"
            className="mx-auto"
          />
          <img
            src="/images/product-1-img-5.png"
            alt="product picture"
            className="mx-auto"
          />
        </div>
        <div className="flex justify-between mt-7 items-end">
          <p className="uppercase font-semibold text-dark-200 text-2xl">
            BOROFONE BH32
          </p>
          <div className="flex items-center gap-x-4 font-semibold">
            <div className="flex flex-col justify-center items-center">
              <span className="text-primary-200 text-lg md:text-xl lg:text-3xl">
                2 927 сом
              </span>
              <span className="text-sm md:text-lg lg:text-xl text-dark-50 line-through">
                3 527 сом
              </span>
            </div>
            <span className="text-primary-200 text-base md:text-lg lg:text-xl">
              -20%
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
