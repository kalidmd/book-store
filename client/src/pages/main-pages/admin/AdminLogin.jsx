import React, { useState } from 'react'
import Form from '../../../components/Form'
import { useNavigate } from 'react-router-dom'
import axios from 'axios';

const AdminLogin = () => {
      // Use Navigate Hook Defenition
  const navigate = useNavigate();
      // States Defenition
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
      // Errro Handling States
  const [error, setError] = useState(false);
  const [fetchError, setFetchError] = useState(false);
      // API Endpoinst Defenition
  const localUrl = 'http://localhost:5000/api/v1';
  // const productionUrl =

  const handleAdminLogin = async (e) => {
    e.preventDefault();

    try {
      const { data } = await axios.post(`${localUrl}/auth/login`, { email, password })

      console.log(data);
      setError(false);
      setFetchError(false);

      if (data.user.role === 'admin') {
        localStorage.setItem('adminToken', data.token);
        navigate('/dashboard');
      } else {
        setError('Access Denied!');
      }

    } catch (error) {
      if (error.response) {
        setError(error.response.data.msg);
      } else {
        setFetchError(error.message);
      }
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
    />
  )
}

export default AdminLogin;