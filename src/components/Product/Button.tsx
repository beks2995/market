import React from "react";
import { ButtonProps } from "./types";

function Button({
  children,
  classes,
  type,
  bgColor = "bg-dark-300",
  isLink = false,
}: ButtonProps) {
  return (
    <button
      type={type ?? "button"}
      className={`flex items-center justify-center font-medium text-white rounded-xl ${bgColor} ${classes}`}
    >
      {children}
    </button>
  );
}

export default Button;
