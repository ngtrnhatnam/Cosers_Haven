// src/components/ProductCard.jsx
import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext.jsx';
import { addToCart } from '../services/cartService';

function ProductCard({ costume, customerId }) {
  const { user } = useContext(AuthContext);
  const isLoggedIn = !!user;

  const handleAddToCart = async () => {
    try {
      const response = await addToCart(customerId, costume._id);
      console.log('Added to cart:', response);
      alert('Đã thêm vào giỏ hàng!');
    } catch (err) {
      console.error('Error adding to cart:', err);
      alert('Không thể thêm vào giỏ hàng!');
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-4 min-w-0">
      <Link to={`/costumes/${costume.slug}`}>
        <img
          src={costume.images[0] || 'https://via.placeholder.com/150'}
          alt={costume.name}
          className="w-full h-48 object-cover rounded-t-lg"
        />
        <h3 className="mt-2 text-lg font-semibold text-gray-800">{costume.name}</h3>
        <p className="text-gray-600">{costume.character} - {costume.series}</p>
        <p className="text-pink-500 font-bold">{costume.pricePerDay.toLocaleString()} VNĐ/ngày</p>
      </Link>
      <div className="mt-4">
        {!isLoggedIn ? (
          <button
            className="w-full px-6 py-3 bg-blue-400 text-white rounded-lg hover:bg-blue-500 transition duration-300"
            onClick={() => alert('Đăng nhập trước để thuê đồ nha bạn iuuuuu!')}
          >
            Đăng nhập để thuê đồ
          </button>
        ) : (
          <button
            onClick={handleAddToCart}
            className="w-full px-6 py-3 bg-pink-400 text-white rounded-lg hover:bg-pink-500 transition duration-300"
          >
            Thêm vào giỏ
          </button>
        )}
      </div>
    </div>
  );
}

export default ProductCard;