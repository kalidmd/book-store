import React, { useContext, useEffect, useRef, useState } from 'react'
import { NavLink, Outlet, useLocation, useNavigate } from 'react-router-dom'
// import Loading from '../Loading';
  // React Icons
import { IoIosSearch } from "react-icons/io";
import { MdKeyboardArrowDown } from "react-icons/md";
import { RxExit } from "react-icons/rx";
import { IoMdAdd } from "react-icons/io";
  // Images
import AdminProfile from '../../assets/avatar.png'
import { UserContext } from '../../context/userContext';
import { SearchContext } from '../../context/searchContext';

const DashboardMain = () => {
      // User Context Defenition
  const { user } = useContext(UserContext);
      // Search Context Def
  const { search, setSearch } = useContext(SearchContext);
     // Dropdown Ref Hook Defenition
  const dropdownRef = useRef(null);
      // Use Location Hook Def
  const location = useLocation();
      // Use Navigate Def 
  const navigate = useNavigate();
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
        <section className='w-full bg-white'>
          <div className={`w-large mx-auto 2xl:w-xLarge flex flex-col-reverse sm:flex-row sm:items-center items-end gap-3 pt-4 md:pt-5 pb-2 ${location.pathname === '/dashboard/manage-books' ? 'sm:justify-between' : 'sm:justify-end'}`}>

            { location.pathname === '/dashboard/manage-books' &&
              <div className='w-fit mx-auto sm:mx-0 flex items-center gap-2 text-xs sm:text-base'>
                <IoIosSearch className='size-5'/>
                <input 
                    type="text" 
                    className='border-0 bg-transparent outline-none w-[200px] '
                    value={search}
                    placeholder='search for book, author'
                    onChange={(e) => setSearch(e.target.value)}
                />
              </div>
            }

            <div className='flex items-center w-fit gap-4 relative text-[12px] sm:text-base'>
              { 
                user && 
                  <div className='flex flex-col items-end'> 
                      <p className='font-medium'> 
                        { toCapital(user && user?.username) } 
                      </p> 
                        
                    <div>
                      <span className='text-gray-600'> { user && user?.role } </span>
                      |
                      <span className='text-gray-600'> { user && user?.email } </span>
                    </div>
                    
                  </div>
              }
 
              <div className='outline outline-adminHomeBg outline-offset-2 rounded-full w-8 h-8'>
              <img className='w-full h-full rounded-full' src={ AdminProfile} alt='avatar' />
              </div>

                <button onClick={ handleDropdown }>
                  <MdKeyboardArrowDown className='text-gray-500'/>
                </button>

                { isAdminDropdownOpen &&
                  <ul ref={dropdownRef} className='bg-gray-200 rounded-md py-4 absolute top-12 right-0 z-20'>
                    <li className='px-3 hover:bg-gray-100 w-full'> 
                      <button className='flex items-center gap-1' onClick={logoutAdmin}>
                        <span>Logout</span>
                        <RxExit className='inline-block size-3 text-text' />
                      </button> 
                    </li>
                  </ul>
                }
    
            </div>
          </div>
        </section>

        <section className='w-large mx-auto 2xl:w-xLarge my-10'>
          <div className='flex flex-col md:flex-row items-center md:text-left text-center justify-between my-5'>
            <div>
              <h1 className='text-xl font-medium'> Dashboard </h1>
              <p className='text-gray-600'>Book Store Inventory</p>
            </div>

            <div className='flex items-center gap-6 md:mt-0 mt-5 text-[11px] sm:text-base'>
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

export default DashboardMain;