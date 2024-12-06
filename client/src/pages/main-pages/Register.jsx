import React, { useContext, useState } from 'react'
import Form from '../../components/Form';
import { useNavigate } from 'react-router-dom';
import { UserContext } from '../../context/userContext';

const Register = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState(false);
    const {register} = useContext(UserContext);

    // console.log(error);
    const navigate = useNavigate();
    
    // const data = { name, email, password};

    const localUrl = 'http://localhost:5000/api/v1';
    // const productionUrl =
    
    const handleRegister = async (e) => {
      e.preventDefault();
      // console.log(data);
      try {
        const res = await fetch(`${localUrl}/auth/register`, {
          method: 'post',
          body: JSON.stringify({ name, email, password }),
          headers: {
            'Content-Type': 'application/json'
          }
        })
        const data = await res.json();
        
        if(data.msg) {
          // console.log(error);
          localStorage.removeItem('token');
          setError(data.msg);
        } else { 
          // localStorage.setItem('token', data.token);
          register(data.token);
          setError(false);
          setName('');
          setEmail('');
          setPassword('');
          navigate('/')
        }
      } catch (error) {
        setError(error);
        console.error(error);
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
        NameValue={name}
        SetName={setName}
        EmailValue={email}
        SetEmail={setEmail}
        PasswordValue={password}
        SetPassword={setPassword}
        handleForm={handleRegister}
        ErrorMessage={error}
    />
   </div>
  )
}

export default Register