import React from 'react'

type ButtonProps={
    children: React.ReactNode;
    classes?:string;
}

function Button({children, classes}:ButtonProps) {
  return (
    <button className={`flex items-center justify-center w-full p-3 font-medium text-white rounded-xl bg-dark-300 ${classes}`} >{children}</button>
  )
}

export default Button