import React, { useContext, useState } from 'react';
import { CartContext } from '../App';

const Checkout = () => {
  const { cart } = useContext(CartContext); 
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [address, setAddress] = useState('');
  const [paymentMethod, setPaymentMethod] = useState('credit'); 

  const totalPrice = cart.reduce((total, item) => total + item.attributes.price * (item.quantity || 1), 0);

  const handleSubmit = (e) => {
    e.preventDefault();

    console.log('Order submitted:', { name, email, address, paymentMethod, totalPrice });

    setName('');
    setEmail('');
    setAddress('');
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-6">Checkout</h1>
      {cart.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="name" className="block text-sm font-medium">Name</label>
            <input 
              type="text" 
              id="name" 
              value={name} 
              onChange={(e) => setName(e.target.value)} 
              required 
              className="mt-1 p-2 border rounded w-full"
            />
          </div>
          <div>
            <label htmlFor="email" className="block text-sm font-medium">Email</label>
            <input 
              type="email" 
              id="email" 
              value={email} 
              onChange={(e) => setEmail(e.target.value)} 
              required 
              className="mt-1 p-2 border rounded w-full"
            />
          </div>
          <div>
            <label htmlFor="address" className="block text-sm font-medium">Address</label>
            <input 
              type="text" 
              id="address" 
              value={address} 
              onChange={(e) => setAddress(e.target.value)} 
              required 
              className="mt-1 p-2 border rounded w-full"
            />
          </div>
          <div>
            <label htmlFor="payment" className="block text-sm font-medium">Payment Method</label>
            <select 
              id="payment" 
              value={paymentMethod} 
              onChange={(e) => setPaymentMethod(e.target.value)} 
              className="mt-1 p-2 border rounded w-full"
            >
              <option value="credit">Credit Card</option>
              <option value="paypal">PayPal</option>
            </select>
          </div>
          <div className="mt-4">
            <h2 className="text-xl font-bold">Total Price: ${totalPrice.toFixed(2)}</h2>
          </div>
          <button 
            type="submit" 
            className="mt-4 bg-blue-500 text-white py-2 px-4 rounded"
          >
            Place Order
          </button>
        </form>
      )}
    </div>
  );
};


export default Checkout;
