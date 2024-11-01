import React from 'react'
import MenuIcon from '../assets/icons/menu-icon.png';
import SearchIcon from '../assets/icons/search-icon.png';
import AccountIcon from '../assets/icons/account-icon.png';
import FavoriteIcon from '../assets/icons/favorite-icon.png';
import CartIconWhite from '../assets/icons/cart-icon-white.png';
import CartIcon from '../assets/icons/cart-icon.png';
import Search from './Search';

const Navbar = () => {
  // breakpoints bg
  // sm:bg-yellow-300 md:bg-green-500 lg:bg-red-400 xl:bg-teal-500 2xl:bg-purple-400'

  return (
    <nav className='bg-white  pt-11 pb-5'>
      <main className='flex items-center w-large 2xl:w-xLarge mx-auto justify-between gap-4'>
          {/* vissible less than 768px screen width */}
          <img className='md:hidden' src={MenuIcon} alt="menu" />
          <div className='md:hidden flex items-center bg-searchBg w-fit rounded-md gap-3 py-1 px-3'>
            <img className='' src={SearchIcon} alt="search" />
            <Search />
          </div>
          {/* vissible more than 768px screen width */}
          <div className='hidden md:flex items-center gap-[100px]'>
            <img className='' src={MenuIcon} alt="menu" />
            <div className='flex items-center bg-searchBg w-fit rounded-md gap-3 py-1 px-3'>
              <img className='' src={SearchIcon} alt="search" />
              <Search />
            </div>
          </div>

        <img className='md:hidden' src={CartIcon} alt="cart" />

        <div className='hidden md:flex items-center gap-[30px] md:ml-20 lg:ml-36'>
          <img className='' src={AccountIcon} alt="account" />
          <img className='' src={FavoriteIcon} alt="favorite" />
          <button className='flex items-center gap-2 bg-primary py-[7px] pl-[15px] pr-[40px] rounded-lg'>
            <img src={CartIconWhite} alt="cart" />
            <p className='text-white'>basket</p>
          </button>

        </div>
      </main>
  
    </nav>
  )
}

export default Navbar