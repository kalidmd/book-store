import React, { useState } from 'react'
import Form from '../../components/Form'

const Login = () => {
  // const [message, setMessage] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  
  const data = { email, password};

  return (
    <Form 
      Title={'Login'}
      Button={'Login'}
      DirectToText={'Don\'t have an account?'}
      HREF={'/register'}
      DirectTo={'Register'}
      // Message={message}
      EmailValue={email}
      SetEmail={setEmail}
      PasswordValue={password}
      SetPassword={setPassword}
      Data={data}
    />
  )
}

export default Login