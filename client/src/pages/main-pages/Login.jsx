import React, { useContext, useState } from 'react'
import Form from '../../components/Form'
import { useNavigate } from 'react-router-dom'
import { UserContext } from '../../context/userContext'
import axios from 'axios'

const Login = () => {
    // User Context Usage
  const {login} = useContext(UserContext);
    // States Def
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
    // Error Handling States Def
  const [error, setError] = useState(false);
  const [fetchError, setFetchError] = useState(false);
  

  const navigate = useNavigate();
  
  // const productionUrl =
  const localUrl = 'http://localhost:5000/api/v1';

  const handleLogin = async (e) => {
    e.preventDefault();
      try {
        const { data } = await axios.post(`${localUrl}/auth/login`, { email, password });

        console.log(data);
        setError(false);
        setFetchError(false);
        
        if (data.user.role === 'admin') {
          localStorage.setItem('adminToken', data.token);
        } else {
          localStorage.removeItem('adminToken');
        };

        login(data.token);
        navigate('/');

      } catch (error) {
          if (error.response) {
            setError(error.response.data.msg);
          } else {
            setFetchError(error.message);
          }
          setEmail('');
          setPassword('');
      }
  }

  return (
    <Form 
      Title={'Login'}
      Button={'Login'}
      DirectToText={'Don\'t have an account?'}
      HREF={'/register'}
      DirectTo={'Register'}
      error={error}
      fetchError={fetchError}
      EmailValue={email}
      SetEmail={setEmail}
      PasswordValue={password}
      SetPassword={setPassword}
      handleForm={handleLogin}
    />
  )
}

export default Login