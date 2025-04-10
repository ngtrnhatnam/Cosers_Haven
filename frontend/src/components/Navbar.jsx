import React, { useState, useContext, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { FaShoppingCart, FaUser } from 'react-icons/fa';
import { AuthContext } from '../context/AuthContext.jsx';
import logo from '../assets/images/logo.png';

function Navbar() {
  const { user, logout } = useContext(AuthContext);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const toggleDropdown = (e) => {
    e.stopPropagation(); // Ngăn sự kiện click lan ra ngoài
    setIsDropdownOpen((prev) => !prev);
  };

  const handleLogout = (e) => {
    e.stopPropagation(); // Ngăn dropdown đóng ngay lập tức
    logout();
    setIsDropdownOpen(false);
  };

  return (
    <nav className="bg-purple-500 text-white py-4 shadow-md">
      <div className="container mx-auto flex justify-between items-center px-4">
        <Link to="/">
          <img src={logo} alt="Coser's Haven" className="h-10" />
        </Link>
        <div className="flex space-x-6 items-center">
          <Link to="/" className="hover:text-pink-200">
            Trang chủ
          </Link>
          <Link to="/shop" className="hover:text-pink-200">
            Sản phẩm
          </Link>
          {user && (
            <Link to="/cart" className="hover:text-pink-200">
              <FaShoppingCart size={24} />
            </Link>
          )}
          <div className="relative" ref={dropdownRef}>
            <button
              onClick={toggleDropdown}
              className="flex items-center hover:text-pink-200 focus:outline-none"
            >
              <FaUser className="mr-2" />
              {user ? `Chào bạn, ${user.username || user.email}` : 'Tài khoản'}
            </button>
            {isDropdownOpen && (
              <div className="absolute right-0 mt-2 w-48 bg-white text-gray-700 rounded-lg shadow-lg z-10">
                {user ? (
                  <>
                    <Link
                      to="/profile"
                      className="block px-4 py-2 hover:bg-purple-100"
                      onClick={() => setIsDropdownOpen(false)}
                    >
                      Thông tin cá nhân
                    </Link>
                    <Link
                      to="/rental-history"
                      className="block px-4 py-2 hover:bg-purple-100"
                      onClick={() => setIsDropdownOpen(false)}
                    >
                      Xem lịch sử thuê
                    </Link>
                    <button
                      onClick={handleLogout}
                      className="block w-full text-left px-4 py-2 hover:bg-purple-100 text-red-500 font-semibold"
                    >
                      Đăng xuất
                    </button>
                  </>
                ) : (
                  <>
                    <Link
                      to="/login"
                      className="block px-4 py-2 hover:bg-purple-100"
                      onClick={() => setIsDropdownOpen(false)}
                    >
                      Đăng nhập
                    </Link>
                    <Link
                      to="/sign-up"
                      className="block px-4 py-2 hover:bg-purple-100"
                      onClick={() => setIsDropdownOpen(false)}
                    >
                      Đăng ký
                    </Link>
                  </>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;