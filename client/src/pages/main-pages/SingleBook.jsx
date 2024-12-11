import React, { useContext, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
// icons
import { IoCartOutline } from "react-icons/io5";
import { CartContext } from '../../context/cartContext';


const SingleBook = () => {
  const { AddToCart } = useContext(CartContext);
  const params = useParams();
  const [books, setBooks] = useState([]);
  const [error, setError] = useState(false);
  // const dateObj = new Date(books.createdAt);

  const capitalLetter = (word) => {
    const firstLetter = word.charAt(0);
    const remainingletters = word.substring(1);

    return `${firstLetter.toUpperCase()}${remainingletters}` 
  }

  
  const handleCart = (bookId) => {
    AddToCart(books, bookId);
  }
  
  useEffect(()=> {
      const {id: bookId} = params;
      const localUrl = 'http://localhost:5000/api/v1/books'

      const fetchSingleBook = async (req, res) => {
        try {
          const response = await fetch(`${localUrl}/${bookId}`);
          const data = await response.json();

          if(data.msg) {
            setError(data.msg);
          } else {
            setBooks([data.book]);
            setError(false);
          }
        } catch (error) {
          setError(error);
          console.error(error);
        }
      }

      fetchSingleBook();
    }, [params])

  return (
    <main className='w-large mx-auto 2xl:w-xLarge'>
      {
         books.map((book) => (
          <div key={book._id} className='w-fit my-10 shadow bg-white p-4'>
            <h1 className='text-xl font-bold'> {book.title} </h1>
            <div className='w-[150px] h-[200px] rounded my-4 '>
              <img className='object-cover w-full h-full rounded' src={book.coverImage.url} alt={book.title} />
            </div>

            <p className='font-semibold'> Author: &nbsp; 
              <span className='font-normal text-gray-700'> { book.author } </span>
            </p>
            <p className='font-semibold my-2'> Published: &nbsp; 
              <span className='font-normal text-gray-700'> {  book.published } </span>
            </p>
            <p className='font-semibold'> Category: &nbsp; 
              <span className='font-normal text-gray-700'> { capitalLetter(book.category) } </span>
            </p>
            <p className='font-semibold my-2'> Description: &nbsp; 
              <span className='font-normal text-gray-700'> {book.description} </span>
            </p>

            <button onClick={() => handleCart(book._id)} className='mt-4 flex items-center gap-[10px] bg-primary hover:bg-blue-700 hover:text-white rounded-lg py-[7px] pl-[15px] pr-5'>
                <IoCartOutline  className='size-6'/>
                <p className=''> Add to Cart </p>
              </button>

              {
              error && 
                <p className='mt-4 text-sm italic text-red-500'> {error} </p>
            }
          </div>
         ))
      }
    </main>
  )
}

export default SingleBook