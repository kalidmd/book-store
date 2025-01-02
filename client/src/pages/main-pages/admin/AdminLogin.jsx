import React, { useState } from 'react'
import Form from '../../../components/Form'
import { useNavigate } from 'react-router-dom'
import axios from 'axios';
import getBaseURL from '../../../utils/baseURL';

const AdminLogin = () => {
      // Use Navigate Hook Defenition
  const navigate = useNavigate();
      // States Defenition
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
      // Errro Handling States
  const [error, setError] = useState(false);
  const [fetchError, setFetchError] = useState(false);
      // Loading State
  const [isLoading, setIsLoading] = useState(false);

  const handleAdminLogin = async (e) => {
    e.preventDefault();

    try {
      setIsLoading(true);
      const { data } = await axios.post(`${getBaseURL()}/auth/login`, { email, password })

      setError(false);
      setFetchError(false);

      if (data.user.role === 'admin') {
        localStorage.setItem('adminToken', data.token);
        navigate('/dashboard');
      } else {
        setError('Access Denied!');
      }
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
      Title={'Admin Dashboard Login'}
      Button={'Login'}
      error={error}
      fetchError={fetchError}
      EmailValue={email}
      SetEmail={setEmail}
      PasswordValue={password}
      SetPassword={setPassword}
      handleForm={handleAdminLogin}
      isLoading={isLoading}
    />
  )
}

export default AdminLogin;