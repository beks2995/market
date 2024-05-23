import React from 'react'
import { NavLink, useLocation } from 'react-router-dom'
import './Navigation.css'

const Navigation: React.FC = () => {
  const location = useLocation()

  return (
    <nav className='navigation__container'>
      <ul>
        <li>
          <NavLink to="products" className={location.pathname.endsWith("/products") ? "active-link" : ""}>Товары</NavLink>
        </li>
        <li>
          <NavLink to="add-products" className={location.pathname.endsWith("/add-products") ? "active-link" : ""}>Добавить</NavLink>
        </li>
        <li>
          <NavLink to="orders" className={location.pathname.endsWith("/orders") ? "active-link" : ""}>Заказы</NavLink>
        </li>
      </ul>
    </nav>
  )
}

export default Navigation
