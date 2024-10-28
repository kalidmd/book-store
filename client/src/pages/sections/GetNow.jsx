import React from 'react'
import Book1 from '../../assets/get-now-book-1.png'
import Book2 from '../../assets/get-now-book-2.png'
import Book3 from '../../assets/get-now-book-3.png'
import Book4 from '../../assets/get-now-book-4.png'
const GetNow = () => {
  return (
    <section className='w-[90%] mx-auto flex flex-col items-center text-center font-montserrat mt-20 lg:hidden'>
        <div className=''>
            <h1 className='font-medium mb-[15px]'>Create an account and get a 15% discount</h1>
            <p className='text-[12px] mb-5'>Create an account with our online bookstore today and start enjoying amazing discounts on all your book purchases! By signing up, you will receive a 15% discount on all your payments. making it more affordable than ever to get your hands on your favorite books.</p>
            <button className='bg-primary text-white mb-5 px-[45px] py-[5px] rounded-[5px]'>Get now!</button>
        </div>
        <div className='flex items-center justify-center'>
            <img  src={Book1} alt="book" />
            <img  src={Book2} alt="book" />
            <img  src={Book3} alt="book" />
            <img  src={Book4} alt="book" />
        </div>
    </section>
  )
}

export default GetNow