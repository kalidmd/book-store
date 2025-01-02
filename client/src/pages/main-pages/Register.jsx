import React, { useContext, useState } from 'react'
import Form from '../../components/Form';
import { useNavigate } from 'react-router-dom';
import { UserContext } from '../../context/userContext';
import axios from 'axios';
import getBaseURL from '../../utils/baseURL';

const Register = () => {
        // User Context Usage
    const { register } = useContext(UserContext);
        // Use Navigate Hook Defenition
    const navigate = useNavigate();
        // State Defenition
    const [username, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
        // Error Handling State Defenition
    const [error, setError] = useState(false);
    const [fetchError, setFetchError] = useState(false);
        // Loading State
    const [isLoading, setIsLoading] = useState(false);
    
    const handleRegister = async (e) => {
      e.preventDefault();
      try {
        setIsLoading(true);
        const { data } = await axios.post(`${getBaseURL()}/auth/register`, { username, email, password });

        setError(false);
        setFetchError(false);
        register(data.token);
        navigate('/');
        setIsLoading(false);

      } catch (error) {
        if (error.response) {
          localStorage.removeItem('token')
          setError(error.response.data.msg);
        } else {
          setFetchError(error.message);
        }
        setIsLoading(false);
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
        isLoading={isLoading}
      />
   </div>
  )
}

export default Register;