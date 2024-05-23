import React from 'react'
import Header from './components/Header/Header'
import Register from './pages/Register'
import Login from './pages/Login'
import { BrowserRouter as Router, Route, Routes, useLocation } from 'react-router-dom'
import Home from './pages/home';
import ProductPage from './pages/product/ProductPage'
import UslovieService from './pages/UslovieService/UslovieService'
import Contacts from './pages/Contacts/Contacts'
import Footer from './components/Footer'
import AdminPanel from './pages/adminPanel/adminPanel'

const App: React.FC = () => {
  const location = useLocation()
  const isAdminRoute = location.pathname.startsWith('/admin')

  return (
    <div>
      {!isAdminRoute && <Header />}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<div>About Page</div>} />
        <Route path="/uslovie" element={<UslovieService />} />
        <Route path="/contacts" element={<Contacts />} />
        <Route path="/cart" element={<div>Cart Page</div>} />
        <Route path="/profile" element={<div>Profile</div>} />
        <Route path="/product/:id" element={<ProductPage />} />
        <Route path="/admin/*" element={<AdminPanel />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Routes>
      <Footer />
    </div>
  )
}

const AppWrapper: React.FC = () => {
  return (
    <Router>
      <App />
    </Router>
  )
}

export default AppWrapper
