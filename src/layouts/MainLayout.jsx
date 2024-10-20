import React, { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faShoppingCart } from '@fortawesome/free-solid-svg-icons';
import Theme from '../components/theme';
import { ThemeContext } from '../App';

function MainLayout({ children }) {
  const { theme } = useContext(ThemeContext);
  const navigate = useNavigate();

  function handleC(e) {
    e.preventDefault();
    navigate('/');
  }

  return (
    <div className={`flex flex-col min-h-screen ${theme === 'light' ? 'bg-gray-100' : 'bg-gray-800'}`}>
      <div className='bg-gray-800'>
        <Link to="/login" className="hover:underline ml-[1100px] text-gray-400 rounded">Sign in / Guest</Link>
        <Link to="/register" className='hover:underline ml-5 text-gray-400 rounded'>Create Account</Link>
      </div>
      <header className="flex justify-around items-center bg-blue-100 p-4">
        <div>
          <button onClick={handleC} className="btn btn-primary rounded py-4 px-5">C</button>
        </div>
        <div className="flex space-x-4">
          <Link to='/' className="text-gray-600 hover:bg-gray-800 hover:text-white p-2 rounded-btn">Home</Link>
          <Link to='/about' className="text-gray-600 hover:bg-gray-800 hover:text-white p-2 rounded-btn">About</Link>
          <Link to='/products' className="text-gray-600 hover:bg-gray-800 hover:text-white p-2 rounded-btn">Products</Link>
          <Link to='/cart' className="text-gray-600 hover:bg-gray-800 hover:text-white p-2 rounded-btn">Cart</Link>
        </div>
        <div className="flex items-center space-x-4">
          <Theme />
          <FontAwesomeIcon icon={faShoppingCart} className="text-gray-800" />
        </div>
      </header>
      <main className="flex-grow container mx-auto px-4 py-6">
        {children}
      </main>
     
    </div>
  );
}

export default MainLayout;
