import React, { useState, useContext } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

const Signup = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isSeller, setIsSeller] = useState(false);
  const [error, setError] = useState('');
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:5000/api/auth/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name, email, password, isSeller }),
      });
      const data = await response.json();
      if (response.ok) {
        login(data);
        navigate('/');
      } else {
        setError(data.message);
      }
    } catch (err) {
      setError('An error occurred. Please try again.');
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-pink-50 py-10">
      <div className="bg-white p-8 rounded-lg shadow-lg w-96">
        <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">Sign Up</h2>
        {error && <p className="text-red-500 text-sm mb-4">{error}</p>}
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-gray-700 mb-2">Name</label>
            <input 
              type="text" 
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:border-meesho"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required 
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 mb-2">Email</label>
            <input 
              type="email" 
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:border-meesho"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required 
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 mb-2">Password</label>
            <input 
              type="password" 
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:border-meesho"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required 
            />
          </div>
          <div className="mb-6 flex items-center">
            <input 
              type="checkbox" 
              id="isSeller"
              className="mr-2"
              checked={isSeller}
              onChange={(e) => setIsSeller(e.target.checked)}
            />
            <label htmlFor="isSeller" className="text-gray-700">Register as a Seller?</label>
          </div>
          <button type="submit" className="w-full bg-meesho text-white py-2 rounded-md hover:bg-pink-600 transition">
            Sign Up
          </button>
        </form>
        <p className="mt-4 text-center text-sm text-gray-600">
          Already have an account? <Link to="/login" className="text-meesho hover:underline">Login</Link>
        </p>
      </div>
    </div>
  );
};

export default Signup;
