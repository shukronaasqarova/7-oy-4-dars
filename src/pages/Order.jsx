import React, { useEffect, useState } from 'react';
import { http } from '../axios';

function Order() {
  const [orders, setOrders] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchOrders = () => {
      const token = localStorage.getItem('token');
      console.log("Token:", token);

      if (!token) {
        setError("Token topilmadi.");
        return;
      }

      http.get('orders', {
        headers: {
          Authorization: `Bearer ${token}`,
        }
      })
      .then(response => {
        setOrders(response.data.data);
      })
      .catch(err => {
        console.error(err);
        setError(err.response?.data?.message || "Xatolik bor");
      });
    };

    fetchOrders();
  }, []);

  if (error) return <div>Xatolik bor</div>;

  return (
    <div>
      <h1>Your Orders</h1>
      {orders.length === 0 ? (
        <p>No orders found.</p>
      ) : (
        <ul>
          {orders.map(order => (
            <li key={order.id}>
              <h2>Order ID: {order.id}</h2>
              <p>Status: {order.attributes.status}</p>
              <p>Total: ${order.attributes.total}</p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default Order;
