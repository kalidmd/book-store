const { createContext, useState, useEffect } = require("react");

export const UserContext = createContext();

// Context Provider

export const UserContextProvider = ({children}) => {
    const [currentUser, setCurrentUser] = useState(null);
    const [user, setUser] = useState([null]);
    // console.log(currentUser);
    const localUrl = 'http://localhost:5000/api/v1';

    useEffect(() => {
        const token = localStorage.getItem('token');
        setCurrentUser(!!token);
    
        const fetchUser = async (id) => {
            const token = localStorage.getItem('token');
            const response = await fetch(`${localUrl}/users/${id}`, {
              method: 'get',
              headers: {
                Authorization: `Bearer ${token}`,
                'Content-Type': 'application/json'
              }
            })
            const data = await response.json();
            if (data.msg) {
              console.log(data.msg);
            } else {
              console.log(data);
              setUser(data.user);
            }
          }
          fetchUser();
    }, []);

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

