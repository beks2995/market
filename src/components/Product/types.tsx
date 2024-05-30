import {Review} from "../../types/types"

export type ImageContainerProps = { images: string[] };

export type PriceTagProps = {
  newPrice: number;
  oldPrice: number;
  discount: number;
};

export type CollapseProps={
  children:React.ReactNode;
  title:string;
  isOpen?:boolean;
}

export type ButtonProps={
  children: React.ReactNode;
  classes?:string;
  type?:"button" | "submit" | "reset" | undefined;
  bgColor?:string;
  isLink?:boolean;
}

export type CommentProps = {
  username: string;
  comment: string;
  rating:number;
};

export type Comment = {
  username: string;
  comment: string;
};

export type CommentTextAreaProps = {
  setComments: React.Dispatch<React.SetStateAction<Review[] | null>>;
  username:string;
};