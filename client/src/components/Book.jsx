import React from 'react'
import CartIconWhite from '../assets/icons/cart-icon-white.png';
import DefaultCartIcon from '../assets/icons/default-cart-icon-mobile.png'
import DefaultFavIcon from '../assets/icons/default-favorite-icon-mobile.png'

const Book = (props) => {
  return (
    <div className="font-nunito flex min-w-[400px] gap-5 items-end">
        <img src={props.src} alt={props.alt} />
        <div className="w-[185px]">
          <p className="md:text-[16px] font-montserrat text-[13px] font-medium mb-4"> {props.bookTitle} </p>
          <p className="md:text-[14px] text-[12px] text-bookDesc mb-4"> {props.bookDesc} </p>
          <p className="md:hidden mb-4"> {`$ ${props.newPrice}`} </p>
          
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
          <p className=""> {`$ ${props.newPrice}`} </p>
          <p className="line-through text-bookDesc"> {`$ ${props.oldPrice}`} </p>
        </div>

          <button className='hidden md:flex gap-[10px] bg-primary rounded-lg py-[7px] pl-[15px] pr-5'>
              <img src={CartIconWhite} alt="cart" />
              <p className='text-white'> Add to basket </p>
            </button>

        </div>
    </div>
  )
}

export default Book