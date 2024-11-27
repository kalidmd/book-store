import { useEffect } from "react"
// import { UserContext } from "../context/userContext"
import { useLocation, useNavigate } from "react-router-dom";

const PrivateRoute = ({ children }) => {
    // const {currentUser} = useContext(UserContext);
    const navigate = useNavigate();
    const location = useLocation();

    useEffect(() => {
        const token = localStorage.getItem('token');

        if(!token) {
            navigate('/login', { state: { from: location } });
        }
    }, [navigate, location]);
    
    return children
}

export default PrivateRoute;