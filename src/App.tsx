
import {FC, useState, useEffect} from 'react';
import Header from './components/Header/Header'; // Importing the Header component
import Register from './pages/Register/Register';
import Login from './pages/Login/Login'
import { BrowserRouter as Router, Route, Routes, useLocation } from 'react-router-dom';
import Home from './pages/home';
import ProductPage from './pages/product/ProductPage';
import UslovieService from './pages/UslovieService/UslovieService'
import Contacts from './pages/Contacts/Contacts'
import Footer from './components/Footer/Footer';
import AdminPanel from './pages/adminPanel/adminPanel'
import Favorites from './pages/Favorites'
import { useWindowSize } from 'react-use';


const App: FC = () => {
  const [favoritedCount, setFavoritedCount] = useState(0);
  const { width } = useWindowSize(); // Get window width
  const [isMobile, setIsMobile] = useState<boolean>(width < 429);
  const location = useLocation()
  const isAdminRoute = location.pathname.startsWith('/Admin')
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 429);
      // console.log('isMobile:', isMobile)
      window.addEventListener('resize', handleResize);
      return () => {
          window.removeEventListener('resize', handleResize);
      };
    }
  });

  return (
    <div>
      {!isAdminRoute && <Header favoritedCount={favoritedCount} isMobile={isMobile}/>}
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
        <Route path="/favorites" element={<Favorites />} />
      </Routes>
      <Footer isMobile={isMobile}/>
    </div>
  )



}

export default App
