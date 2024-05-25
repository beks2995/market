import { firebase } from '../firebase/firebase'; 

export type Item = {
  id: string;
  name: string;
  description: string;
  price: number;
  priceWithDiscount: number;
  images: string[];
  categoryId: string;
  categoryName: string;
  stock: number;
};

export type Category = {
  name: string;
};

export type Review = {
  id?: string;
  comment: string;
  rating: number;
  username: string;
};

export type User = firebase.User | null;