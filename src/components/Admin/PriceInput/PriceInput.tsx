import React from 'react'
import './PriceInput.css'

interface PriceInputProps {
  price: any
  priceWithDiscount: any
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
}

const PriceInput: React.FC<PriceInputProps> = ({ price, priceWithDiscount, onChange }) => {
  return (
    <>
    <div className='container__priceInput'>
      <div className="input-container-small">
        <input
          className='PriceInput'
          type="text"
          name="price"
          placeholder="Цена до скидки"
          value={price}
          onChange={onChange}
        />
        <span className="icon"><svg width="19" height="19" viewBox="0 0 19 19" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M13.3378 6.93706L11.9521 5.52306L2.82438 14.8371V16.2511H4.2101L13.3378 6.93706ZM14.7235 5.52306L16.1093 4.10906L14.7235 2.69506L13.3378 4.10906L14.7235 5.52306ZM5.02154 18.2511H0.86438V14.0081L14.0307 0.57306C14.2145 0.385589 14.4637 0.280273 14.7235 0.280273C14.9834 0.280273 15.2326 0.385589 15.4164 0.57306L18.1888 3.40206C18.3725 3.58959 18.4758 3.8439 18.4758 4.10906C18.4758 4.37422 18.3725 4.62853 18.1888 4.81606L5.02252 18.2511H5.02154Z" fill="#8E8E8E"/>
</svg></span>
      </div>
      <div className="input-container-small">
        <input
          className='PriceInput'
          type="text"
          name="priceWithDiscount"
          placeholder="Цена со скидкой"
          value={priceWithDiscount}
          onChange={onChange}
        />
        <span className="icon"><svg width="19" height="19" viewBox="0 0 19 19" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M13.3378 6.93706L11.9521 5.52306L2.82438 14.8371V16.2511H4.2101L13.3378 6.93706ZM14.7235 5.52306L16.1093 4.10906L14.7235 2.69506L13.3378 4.10906L14.7235 5.52306ZM5.02154 18.2511H0.86438V14.0081L14.0307 0.57306C14.2145 0.385589 14.4637 0.280273 14.7235 0.280273C14.9834 0.280273 15.2326 0.385589 15.4164 0.57306L18.1888 3.40206C18.3725 3.58959 18.4758 3.8439 18.4758 4.10906C18.4758 4.37422 18.3725 4.62853 18.1888 4.81606L5.02252 18.2511H5.02154Z" fill="#8E8E8E"/>
</svg></span> 
      </div>
      </div>
    </>
  )
}

export default PriceInput
