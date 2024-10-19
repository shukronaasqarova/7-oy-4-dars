// src/layouts/MainLayout.js
import React from 'react';
import { Link } from 'react-router-dom';

function MainLayout({ children }) {
  return (
    <div className="flex flex-col min-h-screen bg-gray-100"> {/* Fonda yengil kulrang */}
      <header className="bg-white shadow"> {/* Sarlavha */}
        <nav className="container mx-auto px-4 py-4 flex justify-between items-center">
          <Link to="/" className="text-2xl font-bold text-gray-800">My Application</Link>
          <ul className="flex space-x-4">
            <li><Link to="/" className="text-gray-600 hover:text-gray-800">Home</Link></li>
            <li><Link to="/about" className="text-gray-600 hover:text-gray-800">About</Link></li>
            <li><Link to="/products" className="text-gray-600 hover:text-gray-800">Products</Link></li>
            <li><Link to="/cart" className="text-gray-600 hover:text-gray-800">Cart</Link></li>
            {/* <li><Link to="/login" className="text-gray-600 hover:text-gray-800">Login</Link></li> */}
            {/* <li><Link to="/register" className="text-gray-600 hover:text-gray-800">Register</Link></li> */}
            {/* <li><Link to="/checkout" className="text-gray-600 hover:text-gray-800">Checkout</Link></li> */}
            {/* <li><Link to="/order" className="text-gray-600 hover:text-gray-800">Order</Link></li> */}
          </ul>
        </nav>
      </header>
      <main className="flex-grow container mx-auto px-4 py-6"> {/* Asosiy kontent */}
        {children}
      </main>
      <footer className="bg-gray-800 text-white py-4"> {/* Footer */}
        <div className="container mx-auto text-center">
          <p>© 2023 My Application</p>
        </div>
      </footer>
    </div>
  );
}

export default MainLayout;
