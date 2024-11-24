import { useContext } from "react"
import { UserContext } from "../context/userContext"
import { Navigate } from "react-router-dom";

const PrivateRoute = ({Component}) => {
    const {currentUser} = useContext(UserContext);
    
    return currentUser ? <Component /> : <Navigate to='/login' />
}

export default PrivateRoute;