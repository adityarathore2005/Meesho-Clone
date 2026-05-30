import React, { useEffect, useState, useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import { Trash2 } from 'lucide-react';

const API_URL = import.meta.env.VITE_API_URL;

const Cart = () => {
  const { user } = useContext(AuthContext);
  const [cart, setCart] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchCart = async () => {
    try {
      const response = await fetch(`${API_URL}/api/cart`, {
        headers: { Authorization: `Bearer ${user.token}` }
      });

      const data = await response.json();
      setCart(data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (user) fetchCart();
  }, [user]);

  const removeItem = async (productId) => {
    try {
      const response = await fetch(`${API_URL}/api/cart/${productId}`, {
        method: 'DELETE',
        headers: { Authorization: `Bearer ${user.token}` }
      });

      if (response.ok) {
        const data = await response.json();
        setCart(data);
      }
    } catch (error) {
      console.error(error);
    }
  };

  if (!user)
    return (
      <div className="text-center mt-20 font-bold">
        Please log in to view cart.
      </div>
    );

  if (loading)
    return (
      <div className="text-center mt-20 font-bold">
        Loading cart...
      </div>
    );

  return (
    <div className="max-w-4xl mx-auto mt-10 p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-6 border-b pb-2">
        Your Cart
      </h2>

      {!cart || cart.items.length === 0 ? (
        <p className="text-gray-500">Your cart is empty.</p>
      ) : (
        <div>
          <div className="space-y-4">
            {cart.items.map((item) => (
              <div
                key={item.product._id}
                className="flex justify-between items-center bg-gray-50 p-4 rounded-md shadow-sm border"
              >
                <div className="flex gap-4 items-center">
                  <img
                    src={item.product.imageUrl}
                    alt={item.product.title}
                    className="w-16 h-16 object-cover rounded"
                  />

                  <div>
                    <h3 className="font-bold text-gray-800">
                      {item.product.title}
                    </h3>

                    <p className="text-gray-600">
                      Qty: {item.quantity}
                    </p>

                    <p className="text-meesho font-semibold">
                      ₹{item.price * item.quantity}
                    </p>
                  </div>
                </div>

                <button
                  onClick={() => removeItem(item.product._id)}
                  className="text-red-500 hover:text-red-700 bg-red-100 p-2 rounded-full"
                >
                  <Trash2 size={20} />
                </button>
              </div>
            ))}
          </div>

          <div className="mt-8 border-t pt-4 flex justify-between items-center">
            <span className="text-xl font-bold text-gray-800">
              Total:
            </span>

            <span className="text-2xl font-bold text-meesho">
              ₹{cart.totalPrice}
            </span>
          </div>

          <button className="w-full mt-6 bg-green-500 text-white font-bold py-3 rounded-md hover:bg-green-600 transition">
            Proceed to Checkout
          </button>
        </div>
      )}
    </div>
  );
};

export default Cart;