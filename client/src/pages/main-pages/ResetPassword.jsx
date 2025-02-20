import axios from 'axios';
import React, { useState } from 'react'
import ScaleLoader from 'react-spinners/ScaleLoader';
import getBaseURL from '../../utils/baseURL';
import { useNavigate, useParams } from 'react-router-dom';

const ResetPassword = () => {
    const [password, setPassword] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [successResponse, setSuccessResponse] = useState(false);
    const [error, setError] = useState(false);
    const [fetchError, setFetchError] = useState(false);

    const params = useParams();
    const navigate = useNavigate();


    const handleResetPassword = async (e) => {
        e.preventDefault();

        try {
            setIsLoading(true);
            const { data } = await axios.post(`${getBaseURL()}/auth/reset-password/${params.id}/${params.token}`, {password})
            
            setSuccessResponse(data.successResponse);

            setTimeout(() => {
              navigate('/login');
            }, 2000)
            
            setIsLoading(false);
            setError(false);
            setFetchError(false);

        } catch (error) {
            if (error.response) {
                // Error from backend
              setError(error.response.data.msg);
            } else { 
                // Axios Error
              setFetchError(error.message);
            }
            setIsLoading(false);
        }
    }

  return (
    <div className='shadow-md max-w-[360px] mx-auto my-20 font-montserrat py-5 px-8 bg-white mt-'>
    <h1 className='font-bold mb-2'> Reset Password </h1>
    <form onSubmit={handleResetPassword} className='flex flex-col'>
        <label className='text-sm font-medium mb-1' htmlFor='email'> Password </label>
        <input 
          type="text"
          placeholder='Enter Password'  
          required 
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className='mb-1 indent-2 focus:outline-none border-2 rounded py-1 '
        />

      {
        successResponse && 
          <p> {successResponse} </p>
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
                  'Set New Password'
          } 
        </button>

    </form>
   
    <p className='mt-3 text-center text-xs text-bookDesc'>©️ 2025 Book Store All rights reserverd</p>
</div>
  )
}

export default ResetPassword
