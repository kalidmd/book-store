import React from 'react'
import CartIconWhite from '../assets/icons/cart-icon-white.png';

const Book = (props) => {
  return (
    <div className='book'>
        <img src={props.src} alt={props.alt} />
        <div className="book-contents">
          <p className="book-title"> {props.bookTitle} </p>
          <p className="book-desc"> {props.bookDesc} </p>
          <div className="book-price">
            <p className="book-new-price"> {props.newPrice} </p>
            <p className="book-old-price"> {props.oldPrice} </p>
          </div>
          <button className='basket-btn book-basket-btn'>
              <img src={CartIconWhite} alt="cart" />
              <p> Add to basket </p>
          </button>
        </div>
    </div>
  )
}

export default Book