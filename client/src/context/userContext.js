const { createContext, useState, useEffect } = require("react");

export const UserContext = createContext();

// Context Provider

export const UserContextProvider = ({ children }) => {
    const [currentUser, setCurrentUser] = useState(null);
    const [user, setUser] = useState([null]);
    const [isAdmin, setIsAdmin] = useState(null);
    // console.log(currentUser);
    const localUrl = 'http://localhost:5000/api/v1';


    useEffect(() => {
        const token = localStorage.getItem('token');
        setCurrentUser(!!token);

        const fetchUser = async (id) => {
          try {
            const token = localStorage.getItem('token');
            const response = await fetch(`${localUrl}/users/user/${id}`, {
              method: 'get',
              headers: {
                Authorization: `Bearer ${token}`,
                'Content-Type': 'application/json'
              }
            })

            const data = await response.json();

            if (data.msg) {
              console.log(data.msg);
              setCurrentUser(false);
            } else {
              setUser(data.user);
              setCurrentUser(true);
            }

          } catch (error) {
            console.error(error);
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
        logout,
        isAdmin,
        setIsAdmin
    }

    return(
        <UserContext.Provider value={value}>
            {children}
        </UserContext.Provider>
    )
}

