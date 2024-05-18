import React from "react";
import { ShoppingCartIcon } from "@heroicons/react/24/outline";
import Button from "../../components/Product/Button";
import Collapse from "../../components/Product/Collapse";
import ProductInfoCard from "../../components/Product/ProductInfoCard";
import CommentSection from "../../components/Product/CommentSection";

export default function ProductPage() {
  const images = [
    "/images/product-1-img-1.png",
    "/images/product-1-img-2.png",
    "/images/product-1-img-3.png",
    "/images/product-1-img-4.png",
    "/images/product-1-img-5.png",
  ];

  return (
    <section className="container mx-auto mt-5 max-w-[1110px]">
      <ProductInfoCard
        name="BOROFONE BH32"
        brand="/images/brand-1.png"
        images={images}
        newPrice={2400}
        oldPrice={3000}
        discount={20}
        category="Автодержатель"
      />
      <div className="relative grid items-start grid-cols-4 gap-5 mt-6">
        <div className="col-span-3 space-y-12">
          <Collapse title="Описание и характеристики" isOpen={true}>
            Активное шумоподавление: Нет <br />
            Вес: 10 гр <br />
            Влагозащита: Нет <br />
            Длина кабеля: 1.2 м <br />
            Комплектация: Наушники <br />
            Материал корпуса: Пластик, резина <br />
            Микрофон: Да <br />
            Назначение: Проводные наушники<br />
            Ответить/закончить разговор: Да <br />
            Разъем наушников: Lightning<br />
            Регулятор громкости: Да <br />
            Тип крепления: Без крепления <br />
            Тип наушников: Вкладыши ("таблетки") <br />
            Тип подключения: Проводное<br /> 
            Частотный диапазон: 20 Гц - 20000 Гц <br />
            Чувствительность: 109 дБ
          </Collapse>
          <Collapse title="Отзывы покупателей" isOpen={true}>
            <CommentSection />
          </Collapse>
        </div>
        <div className="sticky top-0">
          <Button classes="mb-4 w-full">Купить!</Button>
          <Button classes="w-full">
            <ShoppingCartIcon className="h-6 mr-3 " />
            Добавить в корзину
          </Button>
        </div>
      </div>
    </section>
  );
}
