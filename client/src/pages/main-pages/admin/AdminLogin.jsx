import React, { useState } from 'react'
import Form from '../../../components/Form'
import { useNavigate } from 'react-router-dom'
// import { UserContext } from '../../../context/userContext'
// import { UserContext } from '../../../context/userContext'
// import { UserContext } from '../../context/userContext'

const AdminLogin = () => {
  // const [message, setMessage] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState(false);
  // const {isAdmin, setIsAdmin} = useContext(UserContext);

//   const {adminLogin} = useContext(UserContext);

  const navigate = useNavigate();
  
  // const productionUrl =
  const localUrl = 'http://localhost:5000/api/v1';

  const handleAdminLogin = async (e) => {
    e.preventDefault();

    try {
        const response = await fetch(`${localUrl}/auth/login`, {
            method: 'post',
            body: JSON.stringify({ email,  password}),
            headers: {
                'Content-Type': 'application/json',
            }
        })
    
        const data = await response.json();

        if(data.msg) {
            setError(data.msg)
            localStorage.removeItem('adminToken');
        } else {
            console.log(data);
            if(data.user.role === 'admin') {
              // setIsAdmin(true);
              navigate('/dashboard');
              localStorage.setItem('adminToken', data.token)
              setError(false)
              console.log('Login Succesfull');
            }
            console.log('Access Denied!');
            setError('Access Denied!')
        }
        
    } catch (error) {
        console.error(error);
        setError(error);
    }

  }

  return (
    <Form 
      Title={'Admin Dashboard Login'}
      Button={'Login'}
      ErrorMessage={error}
      EmailValue={email}
      SetEmail={setEmail}
      PasswordValue={password}
      SetPassword={setPassword}
      handleForm={handleAdminLogin}
    />
  )
}

export default AdminLogin