import React from "react";
import { ImageContainerProps } from "./types";

export default function ImageContainer({ images }: ImageContainerProps) {
  return (
    <div className="grid grid-cols-3 justify-center gap-y-3">
      {images.map((img) => (
        <img src={img} alt="product picture" className="mx-auto" />
      ))}
    </div>
  );
}
