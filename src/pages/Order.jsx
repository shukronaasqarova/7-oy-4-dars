import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { http } from '../axios';

function Order() {
  const [orders, setOrders] = useState([]);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchOrders = async () => {
      const token = localStorage.getItem('token');
      
      if (!token) {
        setError("Authentication required. Redirecting to login...");
        setTimeout(() => navigate("/login"), 2000);
        return;
      }

      try {
        const response = await http.get('orders');
        setOrders(response.data.data);
      } catch (err) {
        console.error("Error:", err);
        const status = err.response?.status;

        if (status === 401) {
          setError("Unauthorized access. Redirecting to login...");
          setTimeout(() => navigate("/login"), 2000);
        } else {
          setError(err.response?.data?.message || "An unexpected error occurred.");
        }
      }
    };

    fetchOrders();
  }, [navigate]);

  if (error) return <div className="text-red-600 font-bold">{error}</div>;

  return (
    <div className="p-4">
      <h1 className="text-2xl font-semibold mb-4">Your Orders</h1>
      {orders.length === 0 ? (
        <p>No orders found.</p>
      ) : (
        <ul className="space-y-4">
          {orders.map(order => (
            <li key={order.id} className="p-4 border rounded-lg">
              <h2 className="font-bold">Order ID: {order.id}</h2>
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
