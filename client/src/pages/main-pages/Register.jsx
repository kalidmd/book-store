import React, { useState } from 'react'
import Form from '../../components/Form';
import axios from 'axios';
import getBaseURL from '../../utils/baseURL';
import { useGoogleAuth } from '../../context/googleAuthContext';
import { useNavigate } from 'react-router-dom';

const Register = () => {
    const { signInWithGoogle } = useGoogleAuth()
    const [username, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [message, setMessage] = useState(false);
    const navigate = useNavigate();
        // Error Handling State Defenition
    const [error, setError] = useState(false);
    const [fetchError, setFetchError] = useState(false);
        // Loading State
    const [isLoading, setIsLoading] = useState(false);
    const [isGoogleLoading, setIsGoogleLoading] = useState(false);
    
        // Register a New User to DB
    const handleRegister = async (e) => {
      e.preventDefault();
      try {
        setIsLoading(true);
        const { data } = await axios.post(`${getBaseURL()}/auth/register`, { username, email, password });

        setError(false);
        setFetchError(false);
        setMessage(data.msg);
        setIsLoading(false);

      } catch (error) {
        if (error.response) {
          setError(error.response.data.msg);
        } else {
          setFetchError(error.message);
        }
        setIsLoading(false);
        setMessage(false);
      }
    }

    // Register a New User Using Google Auth (Firebase)
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
   <div>
     <Form 
        Title={'Register'}
        Username
        Button={'Signup'}
        DirectToText={'Already have an accont?'}
        HREF={'/login'}
        DirectTo={'Login'}
        NameValue={username}
        SetName={setName}
        EmailValue={email}
        SetEmail={setEmail}
        PasswordValue={password}
        SetPassword={setPassword}
        handleForm={handleRegister}
        error={error}
        fetchError={fetchError}
        message={message}
        isLoading={isLoading}
        isGoogleLoading={isGoogleLoading}
        handleGoogleSignIn={handleGoogleSignIn}
      />
   </div>
  )
}

export default Register;