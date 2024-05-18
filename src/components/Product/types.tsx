export type ImageContainerProps = { images: string[] };

export type PriceTagProps = {
  newPrice: number;
  oldPrice: number;
  discount: number;
};

export type CollapseProps={
  children:React.ReactNode;
}

export type ButtonProps={
  children: React.ReactNode;
  classes?:string;
}
