import React, { useContext, useState } from 'react'
import Form from '../../components/Form';
import { useNavigate } from 'react-router-dom';
import { UserContext } from '../../context/userContext';
import axios from 'axios';

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
        // API Endpoints
    const localUrl = 'http://localhost:5000/api/v1';
    // const productionUrl =
    
    const handleRegister = async (e) => {
      e.preventDefault();
      try {
        const { data } = await axios.post(`${localUrl}/auth/register`, { username, email, password });

        setError(false);
        setFetchError(false);
        register(data.token);
        navigate('/');

      } catch (error) {
        if (error.response) {
          localStorage.removeItem('token')
          setError(error.response.data.msg);
        } else {
          setFetchError(error.message);
        }
      }
    }

  return (
   <div>
     <Form 
        Title={'Register'}
        Name
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
    />
   </div>
  )
}

export default Register;