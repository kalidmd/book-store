import React, { useContext, useEffect, useRef, useState } from 'react'
import { Link, NavLink } from 'react-router-dom'
// components
import Search from './Search';
// icons
import { IoCartOutline } from "react-icons/io5";
import { HiMiniBars3CenterLeft } from "react-icons/hi2";
import { IoIosSearch } from "react-icons/io";
import { FaRegUser } from "react-icons/fa";
import { MdFavoriteBorder } from "react-icons/md";
import AvatarImg from '../assets/avatar.png'
import { CartContext } from '../context/CartContext';
import { UserContext } from '../context/userContext';
// import { UserContext } from '../context/userContext';

const Navbar = () => {
  // breakpoints bg
  // sm:bg-yellow-300 md:bg-green-500 lg:bg-red-400 xl:bg-teal-500 2xl:bg-purple-400'
  const {cartItems} = useContext(CartContext);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);
  const {logout, currentUser} = useContext(UserContext);

  console.log(currentUser);
  
  useEffect(() => {
    const handleClickOutside = (event) => {
      if(dropdownRef.current && !dropdownRef.current.contains(event.target)){
        setIsDropdownOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [dropdownRef]);

  const handleDropdownClick = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  // const handleLogout = () => {
  //   logout
  // }
  const handleLogout = () => {
    logout();
  }

  const navigation = [
    {
      name: 'Dashboard',
      href: 'dashboard',
    },
    {
      name: 'Orders',
      href: 'orders',
    },
    {
      name: 'Cart Page',
      href: 'cart',
    },
    {
      name: 'Checkout',
      href: 'checkout',
    },
    {
      name: 'Logout',
      href: '/',
      onClick: logout
    }
  ]

  return (
    <nav className='bg-white pt-11 pb-5'>
      <main className='flex items-center w-large 2xl:w-xLarge mx-auto justify-between gap-4'>
          {/* vissible less than 768px screen width */}
          <NavLink to='/' className='md:hidden'> 
            <HiMiniBars3CenterLeft className='size-7' />
          </NavLink>
          <div className='md:hidden flex items-center bg-searchBg w-fit rounded-md gap-3 py-1 px-3'>
            <IoIosSearch className='size-6'/>
            <Search placeholder='What are you looking for ?' />
          </div>

          {/* vissible more than 768px screen width */}
          <div className='hidden md:flex items-center gap-[100px]'>
            <NavLink to={'/'}> 
              <HiMiniBars3CenterLeft className='size-7' />
            </NavLink>

            <div className='flex items-center bg-searchBg w-fit rounded-md gap-3 py-1 px-3'>
              <IoIosSearch className='size-6'/>
              <Search placeholder='What are you looking for ?'/>
            </div>
          </div>

        <div className='md:flex items-center justify-center gap-[30px] md:ml-20 lg:ml-36'>
          {
            currentUser ? 
            <div className='relative flex min-w-7'>
              <button onClick={handleDropdownClick}>  
                <img className={`size-7 rounded-full ring-2 ring-blue-500`} src={AvatarImg} alt="avatar" />
              </button>
              {
                isDropdownOpen && 
                  <div
                    ref={dropdownRef} 
                    className='py- pl-1 absolute w-[105px] md:w-40  bg-white mt-10 shadow-lg rounded-md z-40 '>
                    {navigation.map((item, index) => (
                      <NavLink
                        className='block mb-1 hover:bg-gray-200' 
                        key={index} 
                        to={item.href} 
                        onClick={() => {
                          handleDropdownClick();
                          item?.onClick && handleLogout();
                        }}
                        
                      > 
                            {item.name}  
                      </NavLink>
                    ))}
                  </div>
              } 
            </div>:
            <NavLink to='login'> <FaRegUser className='size-6'/> </NavLink>
          }
          <MdFavoriteBorder className='hidden md:flex size-7'/>
         
         <Link className='hidden md:block' to='/cart'>
            <button className='flex gap-1 bg-primary hover:bg-blue-500 hover:text-white py-2 px-3 rounded-lg'>
              <IoCartOutline className='size-6' />
              <p className=''>{cartItems.length}</p>
           </button>
         </Link>
        </div>

        <Link className='md:hidden' to='/cart'>
          <div className='relative'>
            <IoCartOutline className='size-6' />
            <p 
              className='bg-primary rounded-full text-center absolute top-[-18px] right-[-14px] min-w-6 min-h-6'>
              {cartItems.length} 
            </p>
          </div>
        </Link>
      </main>
  
    </nav>
  )
}

export default Navbar