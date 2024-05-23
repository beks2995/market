import React from 'react'
import { Route, Routes } from 'react-router-dom'
import AddProductsPanel from '../adminPages/addProductsPanel/addProductsPanel'
import Orders from '../adminPages/orders/orders'
import Products from '../adminPages/products/products'
import NavBar from '../../components/Admin/Navigation/Navigation'
import HeaderAdminPanel from '../../components/Admin/HeaderAdminPanel/HeaderAdminPanel'
import './adminPanel.css'

const AdminPanel: React.FC = () => {
  return (
    <div className='adminPanel__container'>
      <HeaderAdminPanel />
      <NavBar />
      <Routes>
        <Route path="add-products" element={<AddProductsPanel />} />
        <Route path="orders" element={<Orders />} />
        <Route path="products" element={<Products />} />
        <Route path="/" element={<AddProductsPanel />} />
      </Routes>
    </div>
  )
}

export default AdminPanel
