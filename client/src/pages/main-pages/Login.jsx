import React, { useContext, useState } from 'react'
import Form from '../../components/Form'
import { useNavigate } from 'react-router-dom'
import { UserContext } from '../../context/userContext'

const Login = () => {
  // const [message, setMessage] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState(false);
  const {login} = useContext(UserContext);

  const navigate = useNavigate();
  
  // const productionUrl =
  const localUrl = 'http://localhost:5000/api/v1';

  const handleLogin = async (e) => {
    e.preventDefault();
    const res = await fetch(`${localUrl}/users/login`, {
      method: 'post',
      body: JSON.stringify({ email, password }),
      headers: {
        'Content-Type': 'application/json'
      }
    })

    const data = await res.json();

    if(data.msg) {
      localStorage.removeItem('token');
      setError(data.msg);
      setEmail('');
      setPassword('');

    } else {
      login(data.token);
      setError(false);
      setEmail('');
      setPassword('');
      navigate('/');
    }

  }

  return (
    <Form 
      Title={'Login'}
      Button={'Login'}
      DirectToText={'Don\'t have an account?'}
      HREF={'/register'}
      DirectTo={'Register'}
      ErrorMessage={error}
      EmailValue={email}
      SetEmail={setEmail}
      PasswordValue={password}
      SetPassword={setPassword}
      handleForm={handleLogin}
    />
  )
}

export default Login