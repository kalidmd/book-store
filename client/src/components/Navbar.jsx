import React, { useState } from 'react'
import { NavLink } from 'react-router-dom'
// icons
import MenuIcon from '../assets/icons/menu-icon.png';
import SearchIcon from '../assets/icons/search-icon.png';
import AccountIcon from '../assets/icons/account-icon.png';
import FavoriteIcon from '../assets/icons/favorite-icon.png';
// import CartIconWhite from '../assets/icons/cart-icon-white.png';
import CartIcon from '../assets/icons/cart-icon.png';
import Search from './Search';
import AvatarImg from '../assets/avatar.png'

const navigation = [
  {
    name: 'Dashboard',
    href: 'dashboard'
  },
  {
    name: 'Orders',
    href: 'orders'
  },
  {
    name: 'Cart Page',
    href: 'cart'
  },
  {
    name: 'Checkout',
    href: 'checkout'
  }
]


const Navbar = () => {
  // breakpoints bg
  // sm:bg-yellow-300 md:bg-green-500 lg:bg-red-400 xl:bg-teal-500 2xl:bg-purple-400'
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const currentUser = true;
  console.log(isDropdownOpen);

  return (
    <nav className='bg-white  pt-11 pb-5'>
      <main className='flex items-center w-large 2xl:w-xLarge mx-auto justify-between gap-4'>
          {/* vissible less than 768px screen width */}
          <img className='md:hidden' src={MenuIcon} alt="menu" />
          <div className='md:hidden flex items-center bg-searchBg w-fit rounded-md gap-3 py-1 px-3'>
            <img className='' src={SearchIcon} alt="search" />
            <Search placeholder='What are you looking for ?' />
          </div>

          {/* vissible more than 768px screen width */}
          <div className='hidden md:flex items-center gap-[100px]'>
            <img className='' src={MenuIcon} alt="menu" />
            <div className='flex items-center bg-searchBg w-fit rounded-md gap-3 py-1 px-3'>
              <img className='' src={SearchIcon} alt="search" />
              <Search placeholder='What are you looking for ?'/>
            </div>
          </div>

        <div className='md:flex items-center justify-center gap-[30px] md:ml-20 lg:ml-36'>
          {
            currentUser ? <div className='relative flex min-w-7'>
              <button onClick={() => setIsDropdownOpen(!isDropdownOpen)}>  
                <img className={`size-7 rounded-full ring-2 ring-blue-500`} src={AvatarImg} alt="avatar" />
              </button>
              {
                isDropdownOpen && 
                  <div className='absolute w-[105px] md:w-40  bg-white mt-10 shadow-lg rounded-md z-40'>
                    <ul className='py- pl-1'>
                      {navigation.map((item) => (
                        <li className='pb-1 hover:bg-gray-200' 
                          key={item} 
                          onClick={() => setIsDropdownOpen(false)}
                        > 
                          <NavLink to={item.href} className=''>
                              {item.name} 
                          </NavLink> 
                        </li>
                      ))}
                    </ul>
                  </div>
              } 
              </div>:
            <NavLink to='login'> <img src={AccountIcon} alt="login" /> </NavLink>
          }
          {/* <img className='' src={currentUser ? AvatarImg : AccountIcon} alt="account" /> */}
          <img className='hidden md:flex' src={FavoriteIcon} alt="favorite" />
          <button className='hidden md:flex items-center gap-2 bg-primary py-[7px] pl-[15px] pr-[40px] rounded-lg'>
            <img src={CartIcon} alt="cart" />
            <p className='text-black'>basket</p>
          </button>
        </div>
        <img className='md:hidden' src={CartIcon} alt="cart" />
      </main>
  
    </nav>
  )
}

export default Navbar