import React, { createContext, useState, useEffect } from 'react'
import axios from 'axios';

  // User Context Created
export const UserContext = createContext();
  // User Context Provider
export const UserContextProvider = ({ children }) => {
      // State Defenition
    const [currentUser, setCurrentUser] = useState(null);
    const [user, setUser] = useState([null]);
      // API Endpoints
    const localUrl = 'http://localhost:5000/api/v1';
    // const productionUrl = '';

    useEffect(() => {
        const token = localStorage.getItem('token');
        setCurrentUser(!!token);

        const fetchUser = async (id) => {
          try {
            const { data } = await axios.get(`${localUrl}/users/user/${id}`, {
              headers: {
                Authorization: `Bearer ${token}`
              }
            })

            setUser(data.user);
            setCurrentUser(true);

          } catch (error) {
            if (error.response) {
              setCurrentUser(false);
            }
          }
        }

        fetchUser();
      
    }, [currentUser]);

    const register = (token) => {
        localStorage.setItem('token', token);
        setCurrentUser(true);
    }

    const login = (token) => {
        localStorage.setItem('token', token);
        setCurrentUser(true);
    };

    const logout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('adminToken');
        setCurrentUser(false);
    };
   
    const value = {
        currentUser,
        user,
        register,
        login,
        logout
    }

    return(
        <UserContext.Provider value={value}>
            {children}
        </UserContext.Provider>
    )
}

