import React, { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';

const ProductCard = ({ product }) => {
  const { user } = useContext(AuthContext);

  const addToCart = async () => {
    if (!user) {
      alert('You must be logged in to add items to the cart');
      return;
    }

    try {
      const response = await fetch('http://localhost:5000/api/cart/add', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${user.token}`,
        },
        body: JSON.stringify({
          productId: product._id,
          quantity: 1,
          price: product.price
        }),
      });

      if (response.ok) {
        alert('Added to cart!');
      } else {
        alert('Failed to add to cart.');
      }
    } catch (error) {
      console.error(error);
      alert('Error adding to cart.');
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition">
      <img 
        src={product.imageUrl} 
        alt={product.title} 
        className="w-full h-48 object-cover"
      />
      <div className="p-4">
        <h3 className="text-lg font-bold text-gray-800">{product.title}</h3>
        <p className="text-sm text-gray-600 mb-2">{product.category}</p>
        <p className="text-meesho font-bold text-xl mb-4">₹{product.price}</p>
        <button 
          onClick={addToCart}
          className="w-full bg-white border border-meesho text-meesho py-2 rounded font-semibold hover:bg-meesho hover:text-white transition"
        >
          Add to Cart
        </button>
      </div>
    </div>
  );
};

export default ProductCard;
