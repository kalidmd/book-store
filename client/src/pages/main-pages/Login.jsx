import React, { useContext, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { UserContext } from '../../context/userContext'
import axios from 'axios'
  // Custom Components
import Form from '../../components/Form'
import getBaseURL from '../../utils/baseURL'

const Login = () => {
    // User Context Usage
  const {login} = useContext(UserContext);
    // States Def
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
    // Error Handling States Def
  const [error, setError] = useState(false);
  const [fetchError, setFetchError] = useState(false);
    // Loading State
  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
      try {
        setIsLoading(true);
        const { data } = await axios.post(`${getBaseURL()}/auth/login`, { email, password });
        
        setError(false);
        setFetchError(false);
        if (data.user.role === 'admin') {
          localStorage.setItem('adminToken', data.token);
        } else {
          localStorage.removeItem('adminToken');
        };

        login(data.token);
        navigate('/');
        setIsLoading(false);

      } catch (error) {
          if (error.response) {
            setError(error.response.data.msg);
          } else {
            setFetchError(error.message);
          }
          setEmail('');
          setPassword('');
          setIsLoading(false);
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
      isLoading={isLoading}
    />
  )
}

export default Login