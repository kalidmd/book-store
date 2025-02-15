import React, { createContext, useState, useEffect } from 'react'
import axios from 'axios';
import getBaseURL from '../utils/baseURL';

  // User Context Created
export const UserContext = createContext();
  // User Context Provider
export const UserContextProvider = ({ children }) => {
      // State Defenition
    const [currentUser, setCurrentUser] = useState(null);
    const [user, setUser] = useState(null);
    // const [loading, setLoading] = useState(false);
    
    useEffect(() => {
      const baseURL = getBaseURL();
        const token = localStorage.getItem('token');
        setCurrentUser(!!token);

        const fetchUser = async (id) => {
          try {
            const { data } = await axios.get(`${baseURL}/users/user/${id}`, {
              headers: {
                Authorization: `Bearer ${token}`
              }
            })

            setUser(data.user);
            setCurrentUser(true);

          } catch (error) {
            if (error.response) {
              setCurrentUser(false);
              setUser(null);
            }
          }
        }

        fetchUser();
      
    }, [currentUser]);

    // const register = (token) => {
    //     localStorage.setItem('token', token);
    //     setCurrentUser(true);
    // }

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
        login,
        logout
    }

    return(
        <UserContext.Provider value={value}>
            {children}
        </UserContext.Provider>
    )
}

