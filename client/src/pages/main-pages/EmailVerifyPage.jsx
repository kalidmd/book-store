import React, { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { GoVerified } from "react-icons/go";
import axios from 'axios';
import getBaseURL from '../../utils/baseURL';

const EmailVerifyPage = () => {
    // const [verifyEmail, setVerifyEmail] = useState(false);
    const [error, setError] = useState(false);
    const [fetchError, setFetchError] = useState(false);
    const params = useParams();
    
    useEffect(() => {

        const verifyEmail = async () => {
            try {
                await axios.get(`${getBaseURL()}/users/${params.id}/verify/${params.mailToken}`);

                // console.log(data);
            } catch (error) {
                if (error.response) {
                        // Error from backend
                    setError(error.response.data.msg);
                } else {
                        // Axios Error
                    setFetchError(error.message)
                }
            }
        }
        
        verifyEmail();

    }, [params])
  return (
    <>
        { !fetchError && !error ?
            <div className='w-fit mx-auto mt-[100px] text-center lg:bg-websiteMobileBg lg:p-20'>
                <div className='flex items-center gap-1'>
                    <GoVerified className='text-green-600' size={22}/>
                    <h1 className='text-xl font-semibold'>Email Verified Successfully!</h1>
                </div>
            <button className='bg-blue-600 rounded-md px-3 py-1 mt-4 text-white'> <Link to='/login'> Login </Link> </button>
            </div> :
            <> 
                {
                    fetchError ? 
                        <p className='w-fit mx-auto mt-[100px] text-center lg:bg-websiteMobileBg lg:p-20'> 
                            { `${fetchError}, Please try again.` } 
                        </p> : 
                    error && 
                        <p className='w-fit mx-auto mt-[100px] text-center lg:bg-websiteMobileBg lg:p-20'> { error } </p>
                }
            </>
        }
    </>
  )
}

export default EmailVerifyPage
