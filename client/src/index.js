import React from 'react';
import ReactDOM from 'react-dom/client';
import { RouterProvider } from 'react-router-dom'

import App from './App';
import router from './router';
import './index.css';

import 'sweetalert2/dist/sweetalert2.js'

// Context Providers
import { UserContextProvider } from './context/userContext';
import { CartProvider } from './context/cartContext';
import { SearchContextProvider } from './context/searchContext';

const root = ReactDOM.createRoot(document.getElementById('root'));


root.render(
  <React.StrictMode>
    <UserContextProvider>
      <SearchContextProvider>
        <CartProvider>
          <RouterProvider router={router}>
            <App />
          </RouterProvider>
        </CartProvider>
      </SearchContextProvider>
    </UserContextProvider>
  </React.StrictMode>
);