      // ProductPage.tsx
      import React from "react";
      import { ShoppingCartIcon } from "@heroicons/react/24/outline";
      import Button from "../../components/Product/Button";
      import Collapse from "../../components/Product/Collapse";
      import ProductInfoCard from "../../components/Product/ProductInfoCard";
      import CommentSection from "../../components/Product/CommentSection";
      import { db } from "../../firebase/firestore";
      import useGetItemDoc from "../../hooks/useGetItemDoc";
      import { useParams } from "react-router-dom";
      import { Item, Review } from "../../types/types";
      import useGetReviews from "../../hooks/useGetReviews";
      import useAuth from "../../hooks/useAuth";
      import AddToCartButton from "../../components/Basket/AddToCartButton";

      export default function ProductPage() {
        const { id } = useParams();
        const [documentData, isLoading, isNotFound, isError] = useGetItemDoc(
          "items",
          id ?? ""
        ) as [Item | null, boolean, boolean, boolean];

        const [reviews, reviewsLoading, reviewsError] = useGetReviews(id ?? "") as [Review[], boolean, boolean];
        const user = useAuth();
        

        return (
          <section className="container mx-auto p-5 lg:p-0 max-w-[1110px] ">
            {isLoading && <div>loading...</div>}
            {isNotFound && <div>item is not found</div>}
            {isError && <div>error occured while getting data from firebase</div>}

            {!isLoading && !isNotFound && !isError && (
              <>
                <ProductInfoCard
                  name={documentData?.name??""}
                  brand="/images/brand-1.png"
                  images={documentData?.images ?? []}
                  newPrice={documentData?.priceWithDiscount ?? 0}
                  oldPrice={documentData?.price?? 0}
                  discount={20}
                  category={documentData?.categoryName ?? ""}
                />
                <div className="relative grid items-start grid-cols-1 mt-6 lg:gap-y-0 gap-y-5 lg:grid-cols-4 lg:gap-x-5 gap-x-0">
                  <div className="col-span-3 space-y-12">
                    {documentData?.description && (
                      <Collapse title="Описание и характеристики" isOpen={true}>
                        <div dangerouslySetInnerHTML={{ __html: documentData?.description.replace(/\\n/g, '<br>')??""}} />
                      </Collapse>
                    )}
                    <Collapse title="Отзывы покупателей" isOpen={true}>
                      <CommentSection reviews={reviews} user={user}/>
                    </Collapse>
                  </div>
                  <div className="static flex flex-row-reverse items-stretch w-full gap-4 lg:sticky top-2 lg:flex-col">
                    <Button classes="lg:hidden bg-[#43d854] p-4">
                      <img
                        className="w-10 h-auto"
                        src="/images/whatsapp-icon.png"
                        alt="whatsapp icon"
                      />
                    </Button>
                    <Button classes=" w-full grow lg:p-3 p-5">Купить!</Button>
                    {id && <AddToCartButton itemId={id} />}
                  </div>
                </div>
              </>
            )}
          </section>
        );
      }
