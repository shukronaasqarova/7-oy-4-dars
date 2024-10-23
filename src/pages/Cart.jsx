import React, { useContext } from 'react';
import { CartContext } from '../App';


const Cart = () => {
  const { cart, setCart } = useContext(CartContext);

  const handleRemove = (index) => {

    const updatedCart = cart.filter((_, i) => i !== index);
    setCart(updatedCart);
    localStorage.setItem('cart', JSON.stringify(updatedCart));
  };

  const handleAmountChange = (index, amount) => {
    const updatedCart = cart.map((item, i) =>
      i === index ? { ...item, quantity: amount } : item
    );
    setCart(updatedCart);

    localStorage.setItem('cart', JSON.stringify(updatedCart));
  };

  const totalPrice = cart.reduce((total, item) =>
    total + item.attributes.price * (item.quantity || 1), 0
  );

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-6">Shopping Cart</h1>
      {cart.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        cart.map((product, index) => (
          <article key={index} className="mb-12 flex flex-col gap-y-4 sm:flex-row flex-wrap border-b border-base-300 pb-6 last:border-b-0">
            <img
              src={product.attributes.image}
              alt={product.attributes.title}
              className="h-24 w-24 rounded-lg sm:h-32 sm:w-32 object-cover"
            />
            <div className="sm:ml-16 sm:w-48">
              <h3 className="capitalize font-medium">{product.attributes.title}</h3>
              <h4 className="mt-2 capitalize text-sm text-neutral-content">{product.attributes.company}</h4>
              <p className="mt-4 text-sm capitalize flex items-center gap-x-2">
                Color:
                <span
                  className="badge badge-sm"
                  style={{ backgroundColor: product.attributes.color }}
                ></span>
              </p>
            </div>
            <div className="sm:ml-12">
              <div className="form-control max-w-xs">
                <label htmlFor={`amount-${index}`} className="label p-0">
                  <span className="label-text">Amount</span>
                </label>
                <select
                  value={product.quantity || 1}
                  onChange={(e) => handleAmountChange(index, parseInt(e.target.value))}
                  className="mt-2 select select-base select-bordered select-xs"
                >

                  {[...Array(8)].map((_, i) => (
                    <option key={i + 1} value={i + 1}>{i + 1}</option>
                  ))}
                </select>
              </div>
              <button className="mt-2 link link-primary link-hover text-sm" onClick={() => handleRemove(index)}>
                Remove
              </button>
            </div>
            <p className="font-medium sm:ml-auto">${(product.attributes.price * (product.quantity || 1)).toFixed(2)}</p>
          </article>
        ))
      )}
      {cart.length > 0 && (
        <div className="mt-4">
          <h2 className="text-xl font-bold">Total Price: ${totalPrice.toFixed(2)}</h2>
        </div>
      )}
    </div>
  );
};


export default Cart;