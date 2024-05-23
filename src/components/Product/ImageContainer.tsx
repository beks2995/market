import React from "react";
import { ImageContainerProps } from "./types";

export default function ImageContainer({ images }: ImageContainerProps) {
  return (
    <div className="grid justify-center grid-cols-3 gap-y-3">
      {images.map((img) => (
        <img src={img} alt="product" className="mx-auto" />
      ))}
    </div>
  );
}
