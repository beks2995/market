import React from 'react'
import '../pages/UslovieService/UslovieService.css'
import { Link } from 'react-router-dom'

const Footer = () => {
  return (
  <div className='container'>
    <div className='UsFooter'>
      
      <h2>
        QPICK
      </h2>
      <div><p>Избранное</p>
        <p>Корзина</p>
        <Link to='/Contacts'><p>Контакты</p></Link>
      </div>
      <div>
        <p>Условия сервиса</p>
        <div className='UsFooterLanguage'><p>Каз</p>
          <p>Рус</p>
          <p>Eng</p></div>
      </div>
   
    </div>
    </div>

  )
}

export default Footer