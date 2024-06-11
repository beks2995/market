import { FC, useState, useEffect } from 'react';
import { useLocation, Route, Routes } from 'react-router-dom';
import { useWindowSize } from 'react-use';
import Header from './components/Header/Header'; // Importing the Header component
import Register from './pages/Register/Register';
import Login from './pages/Login/Login';
import Home from './pages/home';
import ProductPage from './pages/product/ProductPage';
import UslovieService from './pages/UslovieService/UslovieService';
import Contacts from './pages/Contacts/Contacts';
import Footer from './components/Footer/Footer';
import AdminPanel from './pages/adminPanel/adminPanel';
import Cart from './components/Basket/Cart/Cart';
import Checkout from './components/Basket/CheckoutPage/CheckoutPage';
import OrderConfirmation from './components/Basket/OrderConfirmation/OrderConfirmation';

const App: FC = () => {
  const [favoritedCount, setFavoritedCount] = useState(0);
  const { width } = useWindowSize(); // Get window width
  const [isMobile, setIsMobile] = useState<boolean>(width < 429);
  const location = useLocation(); // Use useLocation hook to get location object
  const isAdminRoute = location.pathname.startsWith('/admin'); // Use location.pathname correctly

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 429);
    };

    window.addEventListener('resize', handleResize);

    // Cleanup function to remove event listener
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <div>
      <Header favoritedCount={favoritedCount} isMobile={isMobile} /> {/* Adding the Header to the App component */}
      <main className='Content'>
        <Routes>
          <Route path="/" element={<Home setFavoritedCount={setFavoritedCount} />} />
          <Route path="/about" element={<div>About Page</div>} />
          <Route path='/uslovie' element={<UslovieService />} />
          <Route path='/contacts' element={<Contacts />} />
          <Route path='/wishlist' element={<div>Wishlist</div>} />
          <Route path="/product/:id" element={<ProductPage />} />
          <Route path='/admin/*' element={<AdminPanel />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/order-confirmation" element={<OrderConfirmation />} />
          <Route path="/checkout" element={<Checkout />} />
        </Routes>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
        </Routes>
      </main>
      {!isAdminRoute && <Footer isMobile={isMobile} />}
    </div>
  );
}

export default App;
  