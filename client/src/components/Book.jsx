import React from 'react'
import {Link} from 'react-router-dom';
// icons
import { IoCartOutline } from "react-icons/io5";
import { MdFavorite } from "react-icons/md";

const Book = ({ 
  src, alt, bookID, bookTitle, bookDesc, newPrice, oldPrice, handleCart
}) => {

  return (
    <div className="font-nunito flex min-w-[400px] gap-5 items-end">
        <Link className='w-[180px] h-[250px] rounded-md' to={`books/${bookID}`}>
          <img className='w-full h-full object-cover rounded-md hover:scale-105 transition-all duration-200' src={src} alt={alt} />
        </Link>

        <div className="w-[185px]">
          <Link to={`books/${bookID}`} className="md:text-[16px] font-montserrat text-[13px] font-medium mb-4 hover:text-blue-600"> {bookTitle} </Link>
          <p className=" md:text-[14px] text-[12px] text-bookDesc mb-4"> {bookDesc.length > 80 ? `${bookDesc.slice(0, 80)}...` : bookDesc} </p>
          <p className="md:hidden mb-4"> {`$ ${newPrice}`} </p>
          
          <div className='md:hidden flex gap-[10px] items-center'>
            <button onClick={() => handleCart()}>
              <div className='rounded-full bg-white border w-10 h-10 flex items-center justify-center'>
                <IoCartOutline className='size-7 text-gray-500'/>
              </div>
            </button>
            <button>
              <div className='rounded-full bg-white border w-10 h-10 flex items-center justify-center'>
                <MdFavorite className='size-7 text-gray-500'/>
              </div>
            </button>
          </div>

        {/* above medium devices */}
        <div className="hidden md:flex gap-5 mb-[33px]">
          <p className=""> {`$ ${newPrice}`} </p>
          <p className="line-through text-bookDesc"> {`$ ${oldPrice}`} </p>
        </div>

        <button onClick={() => handleCart()} className='
          hidden md:flex items-center gap-[10px] bg-primary hover:bg-blue-700 hover:text-white rounded-lg py-[7px] pl-[15px] pr-5'>
          <IoCartOutline  className='size-6'/>
          <p className=''> Add to Cart </p>
        </button>

      </div>
    </div>
  )
}

export default Book