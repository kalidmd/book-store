import React from 'react'
import { Link } from 'react-router-dom'
import ScaleLoader from 'react-spinners/ScaleLoader';
 // React Icons
// import { FaGoogle } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";

const Form = ({
    Title, 
    Username, 
    Button, 
    DirectToText, 
    HREF, 
    DirectTo, 
    error,
    fetchError, 
    message,
    NameValue, 
    SetName, 
    EmailValue, 
    SetEmail, 
    PasswordValue, 
    SetPassword, 
    handleForm,
    handleGoogleSignIn,
    isLoading,
    isGoogleLoading
}) => {

  return (
    <div className='shadow-md max-w-[360px] mx-auto my-20 font-montserrat py-5 px-8 bg-white'>
    <h1 className='font-bold mb-2'>{Title}</h1>
    <form onSubmit={handleForm} className='flex flex-col'>
        {Username && <>
            <label className='text-sm font-medium mb-1' htmlFor='name'> 
                Username
            </label>
            <input 
                type="text" 
                placeholder='Name'  
                required
                value={NameValue}
                onChange={(e) => SetName(e.target.value)}
                className='mb-1 indent-2 focus:outline-none border-2 rounded py-1 '
            />
        </>}
        <label className='text-sm font-medium mb-1' htmlFor='email'> Email </label>
        <input 
          type="email"
          placeholder='Email Address'  
          required 
          value={EmailValue}
          onChange={(e) => SetEmail(e.target.value)}
          className='mb-1 indent-2 focus:outline-none border-2 rounded py-1 '
        />

        <label className='text-sm font-medium mb-1' htmlFor="password">Password</label>
        <input 
          type="password"
          placeholder='Password' 
          required 
          value={PasswordValue}
          onChange={(e) => SetPassword(e.target.value)}
          className='mb-1 indent-2 focus:outline-none border-2 rounded py-1 ' 
        />

      { 
        fetchError ? 
        <p className='mt-4 italic text-red-500 text-center lg:text-lg'> 
            { `${fetchError}, Please Try Again.` }
        </p> : 
        error && <p className='mt-4 italic text-red-500 text-center lg:text-lg'> { `${error}` } </p> 
      }

        <button className='my-2 bg-blue-500 hover:bg-blue-700 text-white text-sm font-medium py-1 px-2 rounded  h-[30px]'> 
          {
              isLoading ? 
                  <ScaleLoader
                      color='#FFFFFF' 
                      height={16}
                      width={2}
                  /> :  
                  Button
          } 
        </button>

        {
        message && 
          <p className='text-center bg-green-600 px-2 text-white rounded-md my-2'> {message} </p>

      }
    </form>

    <p className='text-sm mb-3'> {DirectToText}
      <Link className='text-blue-500 hover:text-blue-700' to={HREF}> {DirectTo} </Link> 
    </p>

    {/* Singn in with googel */}
    <button onClick={handleGoogleSignIn} className='flex items-center gap-2 border hover:border hover:border-blue-700 text-blue-900 text-sm w-full rounded justify-center py-1'>
    {
              isGoogleLoading ? 
                  <ScaleLoader
                      color='#0394fc' 
                      height={16}
                      width={2}
                  /> :  
                  <>
                    <FcGoogle size={16}/> <p> Sign in with Google </p>
                  </>
      } 
      
    </button>

    <p className='mt-3 text-center text-xs text-bookDesc'>©️ 2025 Book Store All rights reserverd</p>
</div>
  )
}

export default Form