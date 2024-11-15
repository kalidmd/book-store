import React, { useState } from 'react'
import { NavLink } from 'react-router-dom'
// components
import Search from './Search';
// icons
import { IoCartOutline } from "react-icons/io5";
import { HiMiniBars3CenterLeft } from "react-icons/hi2";
import { IoIosSearch } from "react-icons/io";
import { FaRegUser } from "react-icons/fa";
import { MdFavoriteBorder } from "react-icons/md";
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
  const currentUser = false;
  console.log(isDropdownOpen);

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
            <NavLink to='login'> <FaRegUser className='size-6'/> </NavLink>
          }
          <MdFavoriteBorder className='hidden md:flex size-7'/>
         
          <button className='hidden md:flex gap-1 bg-primary hover:bg-blue-500 hover:text-white py-2 px-3 rounded-lg'>
            <IoCartOutline className='size-6' />
            <p className=''>cart</p>
          </button>
        </div>
        <IoCartOutline className='md:hidden size-6' />
      </main>
  
    </nav>
  )
}

export default Navbar