import React, { useEffect } from 'react'
import { Outlet, useNavigate } from 'react-router-dom';
// import { useGoogleAuth } from '../context/googleAuthContext';

const UsersRoute = () => {
    // const {googleCurrentUser} = useGoogleAuth();
    const navigate = useNavigate();

    useEffect(() => {
        const token = localStorage.getItem('token');
        // console.log(token);

        if(!token) {
            navigate('/login');
        }
    }, [navigate])
    
    return <Outlet />
}

export default UsersRoute