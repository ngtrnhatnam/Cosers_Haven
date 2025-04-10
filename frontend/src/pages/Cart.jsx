// src/pages/Cart.jsx
import React, { useState, useEffect, useContext } from 'react';
import { AuthContext } from '../context/AuthContext.jsx';
import { getCart, updateCartItem, removeCartItem, checkoutCart } from '../services/cartService';

function Cart() {
  const { user } = useContext(AuthContext);
  const customerId = user?.id;
  const [cart, setCart] = useState(null);

  useEffect(() => {
    console.log('Customer ID in Cart:', customerId);
    const fetchCart = async () => {
      if (!customerId) {
        console.log('No customerId, user not logged in');
        setCart({ items: [] });
        return;
      }
      try {
        const data = await getCart(customerId);
        setCart(data);
      } catch (error) {
        console.error('Error fetching cart:', error);
        setCart({ items: [] });
      }
    };
    fetchCart();
  }, [customerId]);

  const handleUpdateQuantity = async (costumeId, newQuantity) => {
    try {
      const updatedCart = await updateCartItem(customerId, costumeId, newQuantity);
      setCart(updatedCart);
    } catch (error) {
      console.error('Error updating quantity:', error);
    }
  };

  const handleRemoveItem = async (costumeId) => {
    try {
      const response = await removeCartItem(customerId, costumeId);
      setCart(response.cart);
    } catch (error) {
      console.error('Error removing item:', error);
    }
  };

  const handleCheckout = async () => {
    if (cart.items.length === 0) {
      alert('Giỏ hàng trống, thêm đồ trước nha bạn iuuuuu!');
      return;
    }
    try {
      const response = await checkoutCart(customerId);
      setCart({ items: [] }); // Làm trống giỏ hàng sau checkout
      alert('Thanh toán thành công, đơn hàng đã chuyển sang Rental!');
      // Có thể redirect sang trang Rental nếu muốn
    } catch (error) {
      console.error('Error checking out:', error);
      alert('Có lỗi khi thanh toán, thử lại nha!');
    }
  };

  if (!cart) return <div className="container mx-auto py-10 text-center">Đang tải...</div>;

  const totalPrice = cart.items.reduce(
    (sum, item) => sum + item.quantity * (item.costumeID?.pricePerDay || 0),
    0
  );

  return (
    <div className="container mx-auto py-10 px-4">
      <h1 className="text-3xl font-bold text-purple-600 mb-6">Giỏ hàng của bạn</h1>
      {cart.items.length === 0 ? (
        <p className="text-gray-600 text-center">Giỏ hàng trống, thêm đồ đi nha bạn iuuuuu!</p>
      ) : (
        <div>
          <div className="grid gap-6">
            {cart.items.map((item) => (
              <div
                key={item._id}
                className="flex items-center bg-white rounded-lg shadow-md p-4"
              >
                <img
                  src={item.costumeID?.images?.[0] || 'https://via.placeholder.com/100'}
                  alt={item.costumeID?.name || 'Costume'}
                  className="w-24 h-24 object-cover rounded-lg mr-4"
                />
                <div className="flex-1">
                  <h3 className="text-lg font-semibold text-gray-800">
                    {item.costumeID?.name || 'Unknown Costume'}
                  </h3>
                  <p className="text-gray-600">
                    Giá thuê: {(item.costumeID?.pricePerDay || 0).toLocaleString()} VNĐ/ngày
                  </p>
                  <div className="flex items-center mt-2">
                    <span className="mr-2">Số lượng:</span>
                    <input
                      type="number"
                      min="1"
                      value={item.quantity}
                      onChange={(e) =>
                        handleUpdateQuantity(item.costumeID._id, parseInt(e.target.value))
                      }
                      className="w-16 p-1 border rounded"
                    />
                  </div>
                  <p className="text-pink-500 font-bold mt-1">
                    Tổng: {(item.quantity * (item.costumeID?.pricePerDay || 0)).toLocaleString()} VNĐ
                  </p>
                </div>
                <button
                  onClick={() => handleRemoveItem(item.costumeID._id)}
                  className="ml-4 px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600 transition"
                >
                  Xóa
                </button>
              </div>
            ))}
          </div>
          <div className="mt-6 text-right">
            <p className="text-xl font-semibold text-gray-800">
              Tổng cộng: {totalPrice.toLocaleString()} VNĐ
            </p>
            <button
              className="mt-4 px-6 py-3 bg-pink-500 text-white rounded-lg hover:bg-pink-600 transition"
              onClick={handleCheckout}
            >
              Thanh toán
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default Cart;