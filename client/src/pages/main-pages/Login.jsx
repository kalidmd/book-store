import React, { useContext, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { UserContext } from '../../context/userContext'
import axios from 'axios'
  // Custom Components
import Form from '../../components/Form'
import getBaseURL from '../../utils/baseURL'
import { useGoogleAuth } from '../../context/googleAuthContext'

const Login = () => {
    // User Context Usage
  const {login} = useContext(UserContext);
  const { signInWithGoogle } = useGoogleAuth();
    // States Def
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState(false);
    // Error Handling States Def
  const [error, setError] = useState(false);
  const [fetchError, setFetchError] = useState(false);
    // Loading State
  const [isLoading, setIsLoading] = useState(false);
  const [isGoogleLoading, setIsGoogleLoading] = useState(false);

  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
      try {
        setIsLoading(true);
        const { data } = await axios.post(`${getBaseURL()}/auth/login`, { email, password });
        
        setError(false);
        setFetchError(false);
        
        if (data.msg) {
          setIsLoading(false);
          setMessage(data.msg);
        }

        if (data?.user?.verified) {
          if (data.user.role === 'admin') {
            localStorage.setItem('adminToken', data.token);
          } else {
            localStorage.removeItem('adminToken');
          };

          setMessage(false);
          login(data.token);
          setIsLoading(false);
          navigate('/');
      }

      } catch (error) {
          if (error.response) {
            setError(error.response.data.msg);
          } else {
            setFetchError(error.message);
          }
          setEmail('');
          setPassword('');
          setIsLoading(false);
          setMessage(false);
      }
  }

      // Signin Using Google Auth (Firebase)
    const handleGoogleSignIn = async () => {
      try {
        setIsGoogleLoading(true);
        setFetchError(false);
        await signInWithGoogle();

        setIsGoogleLoading(false);
        navigate('/');

      } catch (error) {
        // alert(error);
        setFetchError(error);
        setIsGoogleLoading(false);
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
      handleGoogleSignIn={handleGoogleSignIn}
      isLoading={isLoading}
      isGoogleLoading={isGoogleLoading}
      message={message}
    />
  )
}

export default Login