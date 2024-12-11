import React from 'react'
import { NavLink } from 'react-router-dom'
    // React Icons 
import { MdOutlineMenuBook } from "react-icons/md";
import { TbChartBar } from "react-icons/tb";
import { IoAddCircleSharp } from "react-icons/io5";
import { AiFillEdit } from "react-icons/ai";

const AdminNav = () => {

  return (  
    <div className='bg-adminNavBg flex flex-col w-fit min-h-screen gap-10 items-center'>
        <div className=' bg-adminHomeBg flex p-5'>
            <NavLink to='/' className=''> 
                <MdOutlineMenuBook className='size-6 text-white hover:scale-110'/> 
            </NavLink>

        </div>
    
        <div className='flex flex-col h-[220px] justify-between items-center text-white'>
            <NavLink 
                end to='' 
                className={({isActive}) => 
                `${isActive ? 'bg-white p-1 rounded text-adminHomeBg' : 'p-1 hover:text-adminHomeBg'}  `
                }
            > 
                <TbChartBar className='size-5'/> 
            </NavLink>

            <NavLink 
                to='add-new-books' 
                className={({ isActive }) => 
                    `${isActive ? 'bg-white p-1 rounded text-adminHomeBg': 'p-1 hover:text-adminHomeBg'}`
                }
            > 
                <IoAddCircleSharp className='size-5'/>
            </NavLink>
            <NavLink 
                to='manage-books' 
                className={({ isActive }) => 
                    `${isActive ? 'bg-white p-1 rounded text-adminHomeBg': 'p-1 hover:text-adminHomeBg'}`
                }
            > 
                <AiFillEdit className='size-5' />
            </NavLink>
        </div>
        
    </div>
  )
}

export default AdminNav;