import React, { useContext } from 'react'
// import { FavoriteContext } from '../../context/favoriteContext';
    // React Icons
import { IoCartOutline } from "react-icons/io5";
import { MdFavorite } from "react-icons/md";
// import getBaseURL from '../../utils/baseURL';
import { CartContext } from '../../context/cartContext';
import { FavoriteContext } from '../../context/favoriteContext';

const FavoritePage = () => {
  const { addToFavorite, favorite, error, fetchError } = useContext(FavoriteContext);

    const { AddToCart } = useContext(CartContext);
    // const {favorite, addToFavorite } = useContext(FavoriteContext);

    const capitalLetter = (word) => {
        const firstLetter = word.charAt(0);
        const remainingletters = word.substring(1);
    
        return `${firstLetter.toUpperCase()}${remainingletters}` 
      }

    const handleCart = (bookId) => {
        AddToCart(favorite, bookId);
    }

    const handleFavorite = (bookId) => {
        addToFavorite(bookId);
    }



  return (
    <main className='w-large mx-auto my-10 2xl:w-xLarge'>
        <h1 className='font-bold text-2xl italic'>Favorites ({favorite && favorite.length})</h1>
      {
         !error && !fetchError && favorite && favorite.map((book) => (
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

            <div className='mt-4 flex items-center w-fit gap-4'>
              <button onClick={() => handleCart(book._id)} className=' flex items-center gap-[10px] bg-primary hover:bg-blue-700 hover:text-white rounded-lg py-[7px] pl-[15px] pr-5'>
                <IoCartOutline  className='size-6'/>
                <p className=''> Add to Cart </p>
              </button>

              <button onClick={() => handleFavorite(book._id)}>
                <MdFavorite className={`size-8 text-gray-500 hover:text-red-600`}/>
              </button>
            </div>
          </div>
         ))
      }

      {
          fetchError ? 
              <p className=' my-10 shadow bg-white py-20 flex items-center justify-center italic text-red-500 lg:text-lg'> 
                  { `${fetchError}, Please try again.` } 
              </p> : 
          error && <p className='my-10 shadow bg-white py-20 flex items-center justify-center italic text-red-500 lg:text-lg'> { error } </p>
      }
    </main>
  )
}

export default FavoritePage
