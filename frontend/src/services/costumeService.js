// src/services/costumeService.js
import api from './api';

export const getCostumes = async () => {
  const response = await api.get('/costumes', {
    headers: { 'Cache-Control': 'no-cache' },
  });
  return response.data;
};

export const getCostumeById = async (id) => {
  const response = await api.get(`/costumes/${id}`, {
    headers: { 'Cache-Control': 'no-cache' },
  });
  return response.data;
};