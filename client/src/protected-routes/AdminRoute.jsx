import { useEffect } from "react"
import { Outlet, useNavigate } from "react-router-dom";

const AdminRoute = () => {
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