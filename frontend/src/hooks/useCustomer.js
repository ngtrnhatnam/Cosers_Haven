// useCustomer.js (ví dụ)
import { useState, useEffect } from 'react';

export const useCustomer = () => {
  const [customer, setCustomer] = useState(null);

  useEffect(() => {
    const user = localStorage.getItem('user'); // Hoặc lấy từ API
    if (user) {
      setCustomer(JSON.parse(user));
    }
  }, []);

  return customer;
};