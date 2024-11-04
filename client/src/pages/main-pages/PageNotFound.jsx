import React from 'react'
import { NavLink } from 'react-router-dom'
// images
import Books from '../../assets/page-not-found-books.png'
// import Books from '../assets/page-not-found-books.png'

const PageNotFound = () => {
  return (
    <main className='w-large 2xl:w-xLarge mx-auto font-montserrat text-center flex flex-col items-center'>
      <div className=" w-[100%] justify-center flex">
        <img className='w-[30%] md:w-fit' src={Books} alt="Books" />
        <img className='w-[30%] md:w-fit' src={Books} alt="Books" />
        <img className='w-[30%] md:w-fit' src={Books} alt="Books" />
      </div>
      <p className='text-primary font-medium text-[80px] sm:text-[100px] md:text-[228px]'> 404 </p>
      <p className='text-[18px] mb-[30px] md:text-[36px]'> Looks like you've got lost... </p>
      <p className='text-discount mb-[30px] md:text-[24px]'> The page you're looking for doesn't exist or has been moved. </p>
      <NavLink className='font-nunito mb-8 text-primary font-bold md:text-[23px]' to={'/'}> Go Home </NavLink>
    </main>
  )
}

export default PageNotFound