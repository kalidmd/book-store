import React from 'react'
import { IoCartOutline } from "react-icons/io5";

import DefaultCartIcon from '../assets/icons/default-cart-icon-mobile.png'
import DefaultFavIcon from '../assets/icons/default-favorite-icon-mobile.png'

const Book = ({ src, alt, bookTitle, bookDesc, newPrice, oldPrice  }) => {
  return (
    <div className="font-nunito flex min-w-[400px] gap-5 items-end">
        <img src={src} alt={alt} />
        <div className="w-[185px]">
          <p className="md:text-[16px] font-montserrat text-[13px] font-medium mb-4"> {bookTitle} </p>
          <p className=" md:text-[14px] text-[12px] text-bookDesc mb-4"> {bookDesc.length > 80 ? `${bookDesc.slice(0, 80)}...` : bookDesc} </p>
          <p className="md:hidden mb-4"> {`$ ${newPrice}`} </p>
          
          <div className='md:hidden flex gap-[10px] items-center'>
            <button>
              <img src={DefaultCartIcon} alt="Cart" />
            </button>
            <button>
              <img src={DefaultFavIcon} alt="Favorite" />
            </button>
          </div>
        {/* above medium devices */}
        <div className="hidden md:flex gap-5 mb-[33px]">
          <p className=""> {`$ ${newPrice}`} </p>
          <p className="line-through text-bookDesc"> {`$ ${oldPrice}`} </p>
        </div>

          <button className='hidden md:flex items-center gap-[10px] bg-primary hover:bg-blue-700 hover:text-white rounded-lg py-[7px] pl-[15px] pr-5'>
              <IoCartOutline  className='size-6'/>
              <p className=''> Add to Cart </p>
            </button>

        </div>
    </div>
  )
}

export default Book