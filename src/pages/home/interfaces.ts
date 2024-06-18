export interface Idata {
    id?: string;
    category: string;
    description: string;
    stock: string;
    images: string;
    inBasket: boolean;
    inFavorite: boolean;
    name: string;
    priceWithDiscount: string;
    price: string;
    isFavorited: boolean;
    categoryId: {id : string}

}