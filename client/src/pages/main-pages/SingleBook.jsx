import React, {} from 'react'
// import { useParams } from 'react-router-dom'
// icons
import { IoCartOutline } from "react-icons/io5";


const SingleBook = () => {
    // const param = useParams();
    // console.log(param.id);


    const handleCart = () => {
      console.log('book Clicked');
    }
  return (
    <main className='w-large mx-auto 2xl:w-xLarge'>
      <div className='w-fit my-10 shadow bg-white p-4'>
        <h1 className='text-xl font-bold'>Top 10 Fiction Books This Year</h1>
        <div className='w-[150px] h-[200px] bg-green-400 rounded my-4'></div>
        <p className='font-semibold'> Author: &nbsp; 
          <span className='font-normal text-gray-700'> admin </span>
        </p>
        <p className='font-semibold my-2'> Published: &nbsp; 
          <span className='font-normal text-gray-700'> admin </span>
        </p>
        <p className='font-semibold'> Category: &nbsp; 
          <span className='font-normal text-gray-700'> admin </span>
        </p>
        <p className='font-semibold my-2'> Description: &nbsp; 
          <span className='font-normal text-gray-700'> admin </span>
        </p>

        <button onClick={() => handleCart()} className='mt-4 flex items-center gap-[10px] bg-primary hover:bg-blue-700 hover:text-white rounded-lg py-[7px] pl-[15px] pr-5'>
            <IoCartOutline  className='size-6'/>
            <p className=''> Add to Cart </p>
          </button>
      </div>
    </main>
  )
}

export default SingleBook