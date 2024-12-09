import React, { useContext, useEffect, useRef, useState } from 'react'
import { NavLink, Outlet, useNavigate } from 'react-router-dom'
  // Components
import Search from '../Search'
  // Icons
import { IoIosSearch } from "react-icons/io";
import { MdKeyboardArrowDown } from "react-icons/md";
import { IoIosNotificationsOutline } from "react-icons/io";
import { RxExit } from "react-icons/rx";
import { IoMdAdd } from "react-icons/io";
  // Images
import AdminProfile from '../../assets/avatar.png'
import { UserContext } from '../../context/userContext';


const DashboardMain = () => {
    // User Context Defenition
  const { user } = useContext(UserContext);
    // Dropdown Ref Hook Defenition
  const dropdownRef = useRef(null);
    // Dropdown State Defenition
  const [isAdminDropdownOpen, setisAdminDropdownOpen] = useState(false);
  
    // Method to Convert the First Letter of Username to Capital
  const toCapital = (username) => {
      const firstLetter = username?.charAt(0).toUpperCase();
      const restOfTheWords = username?.substring(1);
      
      return firstLetter + restOfTheWords;
  };
  
  useEffect(() => {
    const handleClickOutside = (e) => {
      if(dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setisAdminDropdownOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };

  }, [dropdownRef])

  const navigate = useNavigate();


  const handleDropdown = (e) => {
    if(dropdownRef.current && dropdownRef.current.contains(e.target)) {
      return;
    }
    setisAdminDropdownOpen(!isAdminDropdownOpen);
  }

  const logoutAdmin = () => {
    localStorage.removeItem('adminToken');
    navigate('/');
  }

  return (
    <main className='w-full'>
      {/* // Profile  */}
        <section className='w-full 2xl:w-xLarge bg-white'>
          <div className='w-large mx-auto 2xl:w-xLarge flex items-center py-3 justify-between'>
            <div className='flex items-center gap-3 py-1 px-3'>
                <IoIosSearch className='size-6'/>
                <Search placeholder='search'/>
            </div>

            <div className='flex items-center gap-4 relative'>
                <div className='flex flex-col items-end'> 
                { user && user?.username && <p className='font-medium'> { toCapital(user?.username) } </p> }
                  { user && user?.role &&
                    <div>
                      <span className='text-gray-600'> { user?.role } </span>
                      |
                      <span className='text-gray-600'> { user?.email } </span>
                    </div>
                  }
                </div>

                <div className='outline outline-adminHomeBg outline-offset-2 rounded-full w-10 h-10'>
                  <img className='w-full h-full rounded-full' src={AdminProfile} alt="Teddy Jeff" />
                </div>

                <button onClick={ handleDropdown }>
                  <MdKeyboardArrowDown className='text-gray-500'/>
                </button>

                { isAdminDropdownOpen &&
                  <ul ref={dropdownRef} className='bg-gray-200 rounded-md py-2 px-4 absolute top-14 right-20 z-20'>
                    <li> item </li>
                    <li> item </li>
                    <li> item </li>
                    <li> item </li>
                  </ul>
                }

                <div className='border-l-2 h-8 '></div>

                <IoIosNotificationsOutline className='size-6 text-gray-500'/>
                <button onClick={logoutAdmin}>
                  <RxExit className='size-5 text-gray-500' />

                </button>
            </div>
          </div>
        </section>

        <section className='w-large mx-auto 2xl:w-xLarge'>
          <div className='flex justify-between my-5 bg-blue-70'>
            <div>
              <h1 className='text-2xl font-medium'> Dashboard </h1>
              <p className='text-gray-600'>Book Store Inventory</p>
            </div>

            <div className='flex items-center gap-6'>
              <NavLink 
                to={'manage-books'} 
                className='border border-adminHomeBg p-2 rounded-md'> 
                  Manage Books 
              </NavLink>

              <NavLink 
                to={'add-new-books'} 
                className='flex items-center gap-1 border bg-adminHomeBg p-2 rounded-md text-white'> 
                 <IoMdAdd /> Add New Book 
              </NavLink>
            </div>
          </div>

          <Outlet />
        </section>
    </main>
  )
}

export default DashboardMain