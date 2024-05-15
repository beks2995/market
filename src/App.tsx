import React from 'react';
import Header from './components/Header/Header'; // Importing the Header component
import Register from './pages/Register';
import Login from './pages/Login'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './pages/home';
import ProductPage from './pages/product/ProductPage';

const App: React.FC = () => {
  return (
    <Router>
      <div>
        <Header /> {/* Adding the Header to the App component */}
        <Routes>
          <Route path="*" element={<Home/>} />
          <Route path="/about" element={<div>About Page</div>} />
          <Route path="/contact" element={<div>Contact Page</div>} />
          <Route path="/cart" element={<div>Cart Page</div>} />
          <Route path="/profile" element={<>Profile</>} />
          <Route path="/product/:id" element={<ProductPage/>} />
        </Routes>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
