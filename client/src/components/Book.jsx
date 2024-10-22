import React from 'react'
import CartIconWhite from '../assets/icons/cart-icon-white.png';

const Book = (props) => {
  return (
    <div className='book'>
        <img src={props.src} alt={props.alt} />
        <p className="book-title"> {props.bookTitle} </p>
        <p className="book-desc"> {props.bookDesc} </p>
        <p className="book-new-price"> {props.newPrice} </p>
        <p className="book-old-price"> {props.oldPrice} </p>
        <button className='basket-btn'>
            <img src={CartIconWhite} alt="cart" />
            <p> Add to basket </p>
        </button>

    </div>
  )
}

export default Book