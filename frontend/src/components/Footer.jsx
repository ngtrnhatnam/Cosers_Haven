// src/components/Footer.jsx
import React from 'react';

function Footer() {
  return (
    <footer className="bg-gray-800 py-6 text-white">
      <div className="container mx-auto text-center">
        <h3 className="text-xl font-bold">Coser's Haven</h3>
        <p className="mt-2">Cửa hàng cho thuê đồ cosplay dễ thương nhất!</p>
        <div className="mt-4 flex justify-center space-x-4">
          <a href="#" className="hover:text-pink-300">Facebook</a>
          <a href="#" className="hover:text-pink-300">Instagram</a>
          <a href="#" className="hover:text-pink-300">Email</a>
        </div>
        <p className="mt-2 text-sm">© 2025 Coser's Haven. All rights reserved.</p>
      </div>
    </footer>
  );
}

export default Footer;