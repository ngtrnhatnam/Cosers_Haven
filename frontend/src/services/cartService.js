// src/services/cartService.js
import api from './api';

export const addToCart = async (customerId, costumeId, quantity) => {
  const response = await api.post(`/carts/${customerId}`, { costumeId, quantity }, {
    headers: {
      'Cache-Control': 'no-cache',
      Authorization: `Bearer ${localStorage.getItem('token')}`,
    },
  });
  return response.data;
};

export const getCart = async (customerId) => {
  const response = await api.get(`/carts/${customerId}`, {
    headers: {
      'Cache-Control': 'no-cache',
      Authorization: `Bearer ${localStorage.getItem('token')}`,
    },
  });
  return response.data;
};

export const updateCartItem = async (customerId, costumeId, quantity) => {
  const response = await api.put(`/carts/${customerId}/items/${costumeId}`, { quantity }, {
    headers: {
      'Cache-Control': 'no-cache',
      Authorization: `Bearer ${localStorage.getItem('token')}`,
    },
  });
  return response.data;
};

export const removeCartItem = async (customerId, costumeId) => {
  const response = await api.delete(`/carts/${customerId}/items/${costumeId}`, {
    headers: {
      'Cache-Control': 'no-cache',
      Authorization: `Bearer ${localStorage.getItem('token')}`,
    },
  });
  return response.data;
};

export const checkoutCart = async (customerId) => {
  const response = await api.post(`/carts/${customerId}/checkout`, {}, {
    headers: {
      'Cache-Control': 'no-cache',
      Authorization: `Bearer ${localStorage.getItem('token')}`,
    },
  });
  return response.data;
};