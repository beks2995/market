
import {FC, useState, useEffect} from 'react';
import Header from './components/Header/Header'; // Importing the Header component
import Register from './pages/Register/Register';
import Login from './pages/Login/Login'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './pages/home';
import ProductPage from './pages/product/ProductPage';
import UslovieService from './pages/UslovieService/UslovieService'
import Contacts from './pages/Contacts/Contacts'
import Footer from './components/Footer/Footer'
import { useWindowSize } from 'react-use'; // Assuming you use a library for window size

const App: FC = () => {
  const [favoritedCount, setFavoritedCount] = useState(0);
  const { width } = useWindowSize(); // Get window width
  const [isMobile, setIsMobile] = useState<boolean>(width < 429);
  useEffect(() => {
    const handleResize = () => {
        setIsMobile(window.innerWidth < 429);
        // console.log('isMobile:', isMobile)
    };

    window.addEventListener('resize', handleResize);

    // Cleanup function to remove event listener
    return () => {
        window.removeEventListener('resize', handleResize);
    };
});
  
  return (
    <Router>
      <div className='App'>
        <Header  favoritedCount={favoritedCount} isMobile={isMobile}/> {/* Adding the Header to the App component */}
        <main className='Content'>
        <Routes>
          <Route path="/" element={<Home setFavoritedCount={setFavoritedCount}/>} />
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
        <Footer isMobile={isMobile}/>
      </div>
    </Router>
  );
};

export default App
