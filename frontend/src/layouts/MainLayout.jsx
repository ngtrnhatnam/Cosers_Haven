// src/layouts/MainLayout.jsx
import React from 'react';
import { Outlet } from 'react-router-dom'; // Thêm Outlet
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

function MainLayout() { // Xóa { children }
  console.log('MainLayout is rendering');
  return (
    <div className="min-h-screen bg-gray-100 flex flex-col">
      <Navbar />
      <main className="flex-grow">
        <Outlet /> {/* Thay {children} bằng Outlet */}
      </main>
      <Footer />
    </div>
  );
}

export default MainLayout;