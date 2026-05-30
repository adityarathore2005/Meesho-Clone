import React, { useState, useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

const SellerDashboard = () => {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    price: '',
    category: '',
  });
  const [image, setImage] = useState(null);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');

  if (!user || !user.isSeller) {
    return <div className="text-center mt-20 text-red-500 font-bold">Unauthorized. Sellers only.</div>;
  }

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleImageChange = (e) => {
    setImage(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!image) {
      setMessage('Please select an image to upload.');
      return;
    }
    setLoading(true);
    const data = new FormData();
    data.append('title', formData.title);
    data.append('description', formData.description);
    data.append('price', formData.price);
    data.append('category', formData.category);
    data.append('image', image);

    try {
      const response = await fetch('http://localhost:5000/api/products', {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
        body: data,
      });

      if (response.ok) {
        setMessage('Product listed successfully!');
        setFormData({ title: '', description: '', price: '', category: '' });
        setImage(null);
      } else {
        const errorData = await response.json();
        setMessage(errorData.message || 'Error uploading product.');
      }
    } catch (error) {
      setMessage('Network error. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto mt-10 bg-white p-8 rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-6 text-gray-800">List an Item (Seller Dashboard)</h2>
      {message && <div className="mb-4 p-3 bg-blue-100 text-blue-800 rounded">{message}</div>}
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block text-gray-700 font-medium mb-2">Title</label>
          <input 
            type="text" 
            name="title" 
            value={formData.title} 
            onChange={handleInputChange} 
            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:border-meesho"
            required 
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 font-medium mb-2">Description</label>
          <textarea 
            name="description" 
            value={formData.description} 
            onChange={handleInputChange} 
            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:border-meesho"
            rows="3"
            required 
          ></textarea>
        </div>
        <div className="flex gap-4 mb-4">
          <div className="w-1/2">
            <label className="block text-gray-700 font-medium mb-2">Price (₹)</label>
            <input 
              type="number" 
              name="price" 
              value={formData.price} 
              onChange={handleInputChange} 
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:border-meesho"
              required 
            />
          </div>
          <div className="w-1/2">
            <label className="block text-gray-700 font-medium mb-2">Category</label>
            <input 
              type="text" 
              name="category" 
              value={formData.category} 
              onChange={handleInputChange} 
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:border-meesho"
              required 
            />
          </div>
        </div>
        <div className="mb-6">
          <label className="block text-gray-700 font-medium mb-2">Product Image (Uploads to Cloudinary)</label>
          <input 
            type="file" 
            accept="image/*"
            onChange={handleImageChange}
            className="w-full"
            required
          />
        </div>
        <button 
          type="submit" 
          disabled={loading}
          className={`w-full py-3 rounded-md text-white font-bold transition ${loading ? 'bg-gray-400' : 'bg-meesho hover:bg-pink-600'}`}
        >
          {loading ? 'Uploading...' : 'List Product'}
        </button>
      </form>
    </div>
  );
};

export default SellerDashboard;
