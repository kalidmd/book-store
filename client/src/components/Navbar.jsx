import React from 'react'
import MenuIcon from '../assets/icons/menu-icon.png';
import SearchIcon from '../assets/icons/search-icon.png';
import AccountIcon from '../assets/icons/account-icon.png';
import FavoriteIcon from '../assets/icons/favorite-icon.png';
import CartIconWhite from '../assets/icons/cart-icon-white.png';
import Search from './Search';

const Navbar = () => {
  return (
    <nav className='nav-main'>
      <div className='menu-cont'>
        <img className='menu-img' src={MenuIcon} alt="menu" />

        <div className='search-cont'>
          <img className='search-img' src={SearchIcon} alt="search" />
          <Search />
        </div>
      </div>

      <div className='account-cont'>
        <img className='account-img' src={AccountIcon} alt="account" />
        <img className='favorite-img' src={FavoriteIcon} alt="favorite" />
        <button className='basket-btn'>
          <img className='cart-img' src={CartIconWhite} alt="cart" />
          <p> Basket </p>
        </button>
      </div>
    </nav>
  )
}

export default Navbar