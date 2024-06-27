
import { NavLink, useLocation } from 'react-router-dom'
import './Navigation.css'

const Navigation: React.FC = () => {
  const location = useLocation()

  return (
    <nav className='navigation__container'>
      <ul>
        <li>
          <NavLink 
            to="/admin/products" 
            className={({ isActive }) => isActive ? "active-link" : ""}>
            Товары
          </NavLink>
        </li>
        <li>
          <NavLink 
            to="/admin/add-products" 
            className={({ isActive }) => isActive ? "active-link" : ""}>
            Добавить
          </NavLink>
        </li>
        <li>
          <NavLink 
            to="/admin/orders" 
            className={({ isActive }) => isActive || location.pathname.startsWith('/admin/orders') ? "active-link" : ""}>
            Заказы
          </NavLink>
        </li>
      </ul>
    </nav>
  )
}

export default Navigation
