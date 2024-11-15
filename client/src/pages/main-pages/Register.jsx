import React, { useState } from 'react'
import Form from '../../components/Form';

const Register = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    
    const data = { name, email, password};
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
        Data={data}
    />
   </div>
  )
}

export default Register