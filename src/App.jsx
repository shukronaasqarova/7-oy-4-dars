import React, { createContext, useEffect, useState } from 'react';
import { Routes, Route, useNavigate, useLocation, useParams } from 'react-router-dom';
import Home from './pages/Home';
import About from './pages/About';
import Checkout from './pages/Checkout';
import Details from './pages/Details';
import Login from './pages/Login';
import Register from './pages/Register';
import Products from './pages/Products';
import Errorpage from './pages/Errorpage';
import Order from './pages/Order';
import MainLayout from './layouts/MainLayout';
import Cart from './pages/Cart';

export const CartContext = createContext();
export const ThemeContext = createContext();

function App() {
  const navigate = useNavigate();
  const [token, setToken] = useState(localStorage.getItem('token'));
  const [cart, setCart] = useState([]);
  const [theme, setTheme] = useState('light');
  let location = useLocation();
  let params = useParams();

  useEffect(() => {
    if (localStorage.getItem('cart')) {
      setCart(JSON.parse(localStorage.getItem('cart')));
    }
  }, []);

  useEffect(() => {
    const storedToken = localStorage.getItem('token');
    setToken(storedToken);

    if (!storedToken && (
      location.pathname.includes('about') &&
      location.pathname.includes('cart') &&
      location.pathname.includes('products')
    )) {
      navigate('/login');
    }
  }, [navigate, location.pathname]);

  function PrivateRoute({ isAuth, children }) {
    if (!isAuth) {
      navigate('/login');
    }
    return children;
  }

  return (
    <ThemeContext.Provider value={{ theme, setTheme }}>
      <CartContext.Provider value={{ cart, setCart }}>
        <Routes>
          <Route path='/' element={<MainLayout><Home /></MainLayout>} />
          <Route path='/about' element={<MainLayout><About /></MainLayout>} />
          <Route path='/cart' element={<MainLayout><Cart /></MainLayout>} />
          <Route path='/login' element={<Login />} />
          <Route path='/register' element={<Register />} />
          <Route path='/products' element={<MainLayout><Products /></MainLayout>} />
          <Route path='/details/:id' element={<MainLayout><Details /></MainLayout>} />
          <Route path='/order' element={<MainLayout><Order /></MainLayout>} />
          <Route path='/checkout' element={<PrivateRoute isAuth={!!token}><Checkout /></PrivateRoute>} />
          <Route path='*' element={<Errorpage />} />
        </Routes>
      </CartContext.Provider>
    </ThemeContext.Provider>
  );
}

export default App;
