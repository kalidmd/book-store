import React from 'react';
import ReactDOM from 'react-dom/client';
import router from './router';
import { RouterProvider } from 'react-router-dom'
import './index.css';
import 'sweetalert2/dist/sweetalert2.js'
import App from './App';
import { UserContextProvider } from './context/userContext';
import { CartProvider } from './context/cartContext';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <UserContextProvider>
      <CartProvider>
        <RouterProvider router={router}>
          <App />
        </RouterProvider>
      </CartProvider>
    </UserContextProvider>
  </React.StrictMode>
);