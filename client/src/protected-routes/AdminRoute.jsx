import { useContext, useEffect } from "react"
import { Navigate, Outlet, useNavigate } from "react-router-dom";
import { UserContext } from "../context/userContext";

const AdminRoute = () => {
    const {user} = useContext(UserContext); 
     // const { currentUser } = useContext(UserContext);
     const navigate = useNavigate();
     useEffect(() => {
         const token = localStorage.getItem('adminToken');
         if(!token) {
             navigate('/admin');
         }
     }, [navigate])
     
     return <Outlet />
}

export default AdminRoute;