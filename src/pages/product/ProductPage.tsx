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
    <section className="container mx-auto p-5 lg:p-0 max-w-[1110px] bg-blue-200">
      <ProductInfoCard
        name="BOROFONE BH32"
        brand="/images/brand-1.png"
        images={images}
        newPrice={2400}
        oldPrice={3000}
        discount={20}
        category="Автодержатель"
      />
      <div className="relative grid items-start grid-cols-1 gap-5 mt-6 lg:grid-cols-4">
        <div className="col-span-3 space-y-12">
          <Collapse title="Описание и характеристики" isOpen={true}>
            Активное шумоподавление: Нет <br />
            Вес: 10 гр <br />
            Влагозащита: Нет <br />
            Длина кабеля: 1.2 м <br />
            Комплектация: Наушники <br />
            Материал корпуса: Пластик, резина <br />
            Микрофон: Да <br />
            Назначение: Проводные наушники
            <br />
            Ответить/закончить разговор: Да <br />
            Разъем наушников: Lightning
            <br />
            Регулятор громкости: Да <br />
            Тип крепления: Без крепления <br />
            Тип наушников: Вкладыши ("таблетки") <br />
            Тип подключения: Проводное
            <br />
            Частотный диапазон: 20 Гц - 20000 Гц <br />
            Чувствительность: 109 дБ
          </Collapse>
          <Collapse title="Отзывы покупателей" isOpen={true}>
            <CommentSection />
          </Collapse>
        </div>
        <div className="sticky flex flex-row items-stretch gap-4 top-2 lg:flex-col">
          <Button classes="lg:hidden bg-[#43D854] p-4"><img className="w-10 h-auto" src="/images/whatsapp-icon.png" alt="whatsapp icon" /></Button>
          <Button classes=" w-full grow lg:p-3 p-5">Купить!</Button>
          <Button classes="lg:w-full lg:p-3 p-5">
            <ShoppingCartIcon className="h-6 lg:mr-3 " />
            <span className="hidden lg:inline">Добавить в корзину</span>
          </Button>
        </div>
      </div>
    </section>
  );
}
