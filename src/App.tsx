
import React from 'react';
import Header from './components/Header/Header'; // Importing the Header component
import Register from './pages/Register/Register';
import Login from './pages/Login/Login'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './pages/home';
import ProductPage from './pages/Product/ProductPage';
import UslovieService from './pages/UslovieService/UslovieService'
import Contacts from './pages/Contacts/Contacts'
import Footer from './components/Footer/Footer'

const App: React.FC = () => {
  return (
    <Router>
      <div className='App'>
        <Header /> {/* Adding the Header to the App component */}
        <main className='Content'>
        <Routes>
          <Route path="/" element={<Home/>} />
          <Route path="/about" element={<div>About Page</div>} />
          <Route path='/uslovie' element={<UslovieService />}></Route>
          <Route path='/contacts' element={<Contacts />}></Route>
          <Route path='/wishlist' element={<div>Wishlist</div>}></Route>
          <Route path="/cart" element={<div>Cart Page</div>} />
          <Route path="/profile" element={<>Profile</>} />
          <Route path="/product/:id" element={<ProductPage/>} />
        </Routes>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
        </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
};

export default App
