const { createContext, useState, useEffect } = require("react");

export const UserContext = createContext();

// Context Provider

export const UserContextProvider = ({children}) => {
    const [currentUser, setCurrentUser] = useState(false);

    useEffect(() => {
        const token = localStorage.getItem('token');
        setCurrentUser(!!token);
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

