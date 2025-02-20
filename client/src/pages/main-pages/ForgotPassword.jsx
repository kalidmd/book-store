import axios from 'axios';
import React, { useState } from 'react'
import ScaleLoader from 'react-spinners/ScaleLoader';
import getBaseURL from '../../utils/baseURL';

const ForgotPassword = () => {
    const [email, setEmail] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(false);
    const [fetchError, setFetchError] = useState(false);
    const [successResponse, setSuccessResponse] = useState('');

    const handleForgetPassword = async (e) => {
        e.preventDefault();
        try {
          setIsLoading(true);
          const { data } = await axios.post(`${getBaseURL()}/auth/forgot-password`, {email})

          console.log(data);
          setSuccessResponse(data.response);
          setIsLoading(false);
          setError(false)
          
        } catch (error) {
          setIsLoading(false);
          if (error.response) {
              // Error from backend
            setError(error.response.data.msg);
          } else {
            setFetchError(error.message);
          }
        }

    }

  return (
    <div className='shadow-md max-w-[360px] mx-auto my-20 font-montserrat py-5 px-8 bg-white mt-'>
    <h1 className='font-bold mb-2'> Forgot Password </h1>
    <form onSubmit={handleForgetPassword} className='flex flex-col'>
        <label className='text-sm font-medium mb-1' htmlFor='email'> Email </label>
        <input 
          type="email"
          placeholder='Email Address'  
          required 
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className='mb-1 indent-2 focus:outline-none border-2 rounded py-1 '
        />


      {
        successResponse && <p> { successResponse } </p>
      }
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
                  'Send Link'
          } 
        </button>

    </form>
   
    <p className='mt-3 text-center text-xs text-bookDesc'>©️ 2025 Book Store All rights reserverd</p>
</div>
  )
}

export default ForgotPassword
