// src/router/router.jsx
import { createBrowserRouter } from 'react-router-dom';
import MainLayout from '../layouts/MainLayout';
import Home from '../pages/Home';
import Shop from '../pages/Shop';
import Cart from '../pages/Cart';
import CostumeDetail from '../pages/CostumeDetail';
import Login from '../pages/Login';
import Signup from '../pages/Signup';
// import Profile from '../pages/Profile';
// import RentalHistory from '../pages/RentalHistory';

const router = createBrowserRouter([
  {
    element: <MainLayout />,
    children: [
      { path: '/', element: <Home /> },
      { path: '/shop', element: <Shop /> },
      { path: '/cart', element: <Cart /> },
      { path: '/costumes/:slug', element: <CostumeDetail /> }, // Đổi thành :slug cho rõ ràng
      { path: '/login', element: <Login /> },
      { path: '/sign-up', element: <Signup /> },
      // { path: '/profile', element: <Profile /> },
      // { path: '/rental-history', element: <RentalHistory /> },
    ],
  },
]);

export default router;