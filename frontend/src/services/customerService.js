import api from './api';

export const loginCustomer = async (credentials) => {
  console.log('Calling POST /api/customers/login');
  const response = await api.post('/customers/login', credentials, {
    headers: { 'Cache-Control': 'no-cache' },
  });
  return response.data;
};