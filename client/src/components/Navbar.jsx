import React, { useContext, useEffect, useRef, useState } from 'react'
import { Link, NavLink, useLocation, useNavigate } from 'react-router-dom'
    // Contexts
import { UserContext } from '../context/userContext';
import { CartContext } from '../context/cartContext';
import { FavoriteContext } from '../context/favoriteContext';
import { SearchContext } from '../context/searchContext';
    // Custom Components
import Search from './Search';
    // React Icons
import { IoCartOutline } from "react-icons/io5";
import { HiMiniBars3CenterLeft } from "react-icons/hi2";
import { IoIosSearch } from "react-icons/io";
import { FaRegUser } from "react-icons/fa";
import { MdFavoriteBorder } from "react-icons/md";
import { MdFavorite } from "react-icons/md";
    // Images
import AvatarImg from '../assets/avatar.png'
import { useGoogleAuth } from '../context/googleAuthContext';


const Navbar = () => {
  // Breakpoints Memo
  // sm:bg-yellow-300 md:bg-green-500 lg:bg-red-400 xl:bg-teal-500 2xl:bg-purple-400'
      // Use Location Hook Def
  const location = useLocation();
      // Context Usages
  const {logout, currentUser, user} = useContext(UserContext);
  const { googleCurrentUser, googleUserData, logoutFromGoogle } = useGoogleAuth();
  const { cartItems } = useContext(CartContext);
  const { favorite } = useContext(FavoriteContext);
  const { search, setSearch } = useContext(SearchContext);
      // Dropdown Ref Hook Defenition
  const dropdownRef = useRef(null);
      // Dropdown State Defenition
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const navigate = useNavigate();

      // Method to Convert the First Letter of Username to Capital
  const toCapital = (username) => {
    const firstLetter = username?.charAt(0).toUpperCase();
    const restOfTheWords = username?.substring(1);
    
    return firstLetter + restOfTheWords;
  };


  const navigation = [
    (googleUserData || user) && {
      name: `Hi, ${toCapital( user?.username.split(" ")[0] || googleUserData?.name.split(" ")[0] )}`,
      link: false,
    },
    user && user?.role ==='admin' && {
      name: 'Dashboard',
      href: 'dashboard',
      link: true,
    },
    favorite && favorite.length > 0 &&
    {
      name: 'Favorites',
      href: 'favorite',
      link: true,
    },
    {
      name: 'Orders',
      href: 'orders',
      link: true,
    },
    {
      name: 'Cart Page',
      href: 'cart',
      link: true,
    },
    cartItems.length > 0 &&
    {
      name: 'Checkout',
      href: 'checkout',
      link: true,
    },
    {
      name: 'Logout',
      href: '/',
      link: true,
      onClick: true
    }
  ]

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

      // Handle Dropdowon
  const handleDropdownClick = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

      // Handle Logout
  const handleLogout = () => {
    logout();
    logoutFromGoogle();
  }


  return (
    <nav className='bg-white pt-11 pb-5 fixed w-full z-50'>
      <main className='flex items-center w-large 2xl:w-xLarge mx-auto justify-between gap-4'>
          {/* vissible less than 768px screen width */}
          <NavLink to='/' className='md:hidden'> 
            <HiMiniBars3CenterLeft className='size-7' />
          </NavLink>

          <div className='md:hidden flex items-center bg-searchBg w-fit rounded-md gap-3 py-1 px-3'>
            <IoIosSearch className='size-6'/>
            <input 
                type="text" 
                className='border-0 bg-transparent outline-none xxs:w-[90px] xs:w-[130px] sm:w-[200px]'
                value={search}
                placeholder='search for book, author'
                onChange={(e) => setSearch(e.target.value)}
            />

          </div>

          {/* vissible more than 768px screen width */}
          <div className='hidden md:flex items-center gap-[100px]'>
            <NavLink to={'/'}> 
              <HiMiniBars3CenterLeft className='size-7' />
            </NavLink>

            { location.pathname === '/' &&
              <div className='flex items-center bg-searchBg w-fit rounded-md gap-3 py-1 px-3'>
              <IoIosSearch className='size-6'/>
              <Search setSearch={(search) => setSearch(search)} placeholder='search for book, author'/>
            </div>}
          </div>

        <div className='md:flex items-center justify-center gap-[30px] md:ml-20 lg:ml-36'>
          {
            (currentUser || googleCurrentUser) ? 
            <div className='relative flex min-w-7'>
              <button onClick={handleDropdownClick}>  
                <img className={`size-7 rounded-full ring-2 ring-blue-500`} src={googleUserData ? googleUserData?.photo : AvatarImg} alt="avatar" />
              </button>
              {
                isDropdownOpen && 
                  <div
                    ref={dropdownRef} 
                    className='py- pl-1 absolute w-[105px] md:w-40  bg-white mt-10 shadow-lg rounded-md z-40 '>
                    {navigation.map((item, index) => (
                      <NavLink
                        className={ item?.link ? `block mb-1 hover:bg-gray-200` : `font-bold`} 
                        key={index} 
                        to={item?.href} 
                        onClick={() => {
                          handleDropdownClick();
                          item?.onClick && handleLogout();
                        }}
                        
                      > 
                            {item?.name}  
                      </NavLink>
                    ))}
                  </div>
              } 
            </div>:
            <NavLink to='login'> <FaRegUser className='size-6'/> </NavLink>
          }
          
          {
            favorite && favorite.length > 0 ?
              <button className='hidden md:block' onClick={() => navigate('/favorite')}>
                <MdFavorite className='size-7 text-red-600 '/> 
              </button>
              :
              <MdFavoriteBorder title='Favorite is Empty' className='hidden md:flex size-7'/>
          }
         
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

export default Navbar;