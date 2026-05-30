import React, { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import { ShoppingCart, LogOut, User as UserIcon } from 'lucide-react';

const Navbar = () => {
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <nav className="bg-white shadow-md px-6 py-4 flex justify-between items-center sticky top-0 z-50">
      <Link to="/" className="text-2xl font-bold text-meesho">Meesho Clone</Link>
      <div className="flex gap-4 items-center">
        {user ? (
          <>
            <div className="flex items-center gap-2 text-gray-700">
              <UserIcon size={20} />
              <span>{user.name}</span>
            </div>
            {user.isSeller && (
              <Link to="/seller" className="text-meesho font-semibold hover:underline">Seller Dashboard</Link>
            )}
            <Link to="/cart" className="text-gray-700 hover:text-black">
              <ShoppingCart size={24} />
            </Link>
            <button onClick={handleLogout} className="text-red-500 hover:text-red-700 flex items-center gap-1">
              <LogOut size={20} /> Logout
            </button>
          </>
        ) : (
          <div className="flex gap-4">
            <Link to="/login" className="text-gray-700 hover:text-black font-medium">Login</Link>
            <Link to="/signup" className="bg-meesho text-white px-4 py-2 rounded font-medium hover:bg-pink-600 transition">Sign Up</Link>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
