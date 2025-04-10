import React, { useState, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FaPaw } from 'react-icons/fa';
import { loginCustomer } from '../services/customerService';
import { AuthContext } from '../context/AuthContext.jsx';

function Login() {
  const [usernameOrEmail, setUsernameOrEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [validationErrors, setValidationErrors] = useState({});
  const navigate = useNavigate();
  const { login } = useContext(AuthContext);

  const handleLogin = async (e) => {
    e.preventDefault();
    const errors = {};

    if (!usernameOrEmail) {
      errors.usernameOrEmail = 'Vui lòng nhập tên tài khoản hoặc email';
    }
    if (!password) {
      errors.password = 'Vui lòng nhập mật khẩu';
    }

    if (Object.keys(errors).length > 0) {
      setValidationErrors(errors);
      return;
    }

    try {
      const response = await loginCustomer({ usernameOrEmail, password });
      console.log('Login successful:', response);
      login(response.customer, response.token); // Lưu user và token
      navigate('/');
    } catch (err) {
      setError(err.response?.data?.message || 'Đăng nhập thất bại');
    }
  };

  return (
    <div className="container mx-auto py-10 px-4">
      <h1 className="text-3xl font-bold text-center text-pink-500 mb-8">Đăng nhập</h1>
      <form onSubmit={handleLogin} className="max-w-md mx-auto bg-white p-6 rounded-lg shadow-md" noValidate>
        <div className="mb-4">
          <label className="block text-gray-700">Tên tài khoản hoặc Email</label>
          <input
            type="text"
            value={usernameOrEmail}
            onChange={(e) => {
              setUsernameOrEmail(e.target.value);
              setValidationErrors((prev) => ({ ...prev, usernameOrEmail: '' }));
            }}
            className="w-full p-2 border rounded"
          />
          {validationErrors.usernameOrEmail && (
            <p className="text-red-500 text-sm mt-1">{validationErrors.usernameOrEmail}</p>
          )}
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Mật khẩu</label>
          <input
            type="password"
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
              setValidationErrors((prev) => ({ ...prev, password: '' }));
            }}
            className="w-full p-2 border rounded"
          />
          {validationErrors.password && (
            <p className="text-red-500 text-sm mt-1">{validationErrors.password}</p>
          )}
        </div>
        {error && (
          <p className="text-red-500 mb-4 flex items-center">
            <FaPaw className="mr-2 text-2xl text-pink-400" /> {error}
          </p>
        )}
        <button type="submit" className="w-full bg-purple-500 text-white py-2 rounded hover:bg-purple-600">
          Đăng nhập
        </button>
        <p className="mt-4 text-center">
          Chưa có tài khoản? <Link to="/sign-up" className="text-purple-500 hover:underline">Đăng ký</Link>
        </p>
      </form>
    </div>
  );
}

export default Login;