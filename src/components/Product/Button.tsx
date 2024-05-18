import React from 'react'
import { ButtonProps } from './types'

function Button({children, classes,type}:ButtonProps) {
  return (
    <button type={type??"button"} className={`flex items-center justify-center p-3 font-medium text-white rounded-xl bg-dark-300 ${classes}`} >{children}</button>
  )
}

export default Button