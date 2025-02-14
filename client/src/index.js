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
import { FavoriteProvider } from './context/favoriteContext';
import { GoogleAuthContextProvider } from './context/googleAuthContext';

const root = ReactDOM.createRoot(document.getElementById('root'));


root.render(
  <React.StrictMode>
    <GoogleAuthContextProvider>
      <UserContextProvider>
        <SearchContextProvider>
          <FavoriteProvider>
            <CartProvider>
              <RouterProvider router={router}>
                <App />
              </RouterProvider>
            </CartProvider>
          </FavoriteProvider>
        </SearchContextProvider>
      </UserContextProvider>
    </GoogleAuthContextProvider>
  </React.StrictMode>
);