import React from 'react'
import AddDataForm from '../../../components/Admin/AddDataForm/AddDataForm'
import './addProductsPanel.css'

const AddProductsPanel: React.FC = () => {
  return (
    <div className='addProductsPanel'>
      <div className="container">
      <h1 className='addProductsPanel__title'>Добавление товара</h1>
      <div className="addproductspanel__container">
      <AddDataForm />
      </div>
      </div>
    </div>
  )
}

export default AddProductsPanel
