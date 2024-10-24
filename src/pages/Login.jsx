import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { http } from '../axios'; 

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    http.post('auth/local', {
      identifier: email,
      password: password,
    })
    .then((response) => {
      console.log('Muvaffaqiyat:', response.data);
      navigate('/'); 
    })
    .catch((err) => {
      setError(err.response.data.message || 'Login muvaffaqiyatsiz bo‘ldi.');
    });
  };

  const handleGuestLogin = () => {
    navigate('/'); 
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 rounded shadow-md w-96">
        <h2 className="text-2xl font-bold mb-4 text-gray-600 text-center">Login</h2>
        {error && <div className="text-red-500 mb-4">{error}</div>}
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block mb-2" htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              className="w-full p-2 border rounded"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="mb-4">
            <label className="block mb-2" htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              className="w-full p-2 border rounded"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <button type="submit" className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600">LOGIN</button>
          <button 
            type="button"
            className="w-full bg-purple-900 text-white p-2 rounded hover:bg-purple-600 mt-4" 
            onClick={handleGuestLogin}
          >
            GUEST USER
          </button>
        </form>
        <p className="mt-4 text-center">
          Not a member yet? 
          <span 
            className="text-blue-500 cursor-pointer hover:underline"
            onClick={() => navigate('/register')}
          >
            Register
          </span>
        </p>
      </div>
    </div>
  );
}

export default Login;
