// src/services/categoryService.js
import api from './api';

export const getCategories = async () => {
  console.log('Calling GET /api/categories');
  const response = await api.get('/categories');
  return response.data;
};

export const getCategoryById = async (id) => {
  console.log(`Calling GET /api/categories/${id}`);
  const response = await api.get(`/categories/${id}`);
  return response.data;
};