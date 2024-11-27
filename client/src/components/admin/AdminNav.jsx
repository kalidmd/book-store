import React from 'react'
import { NavLink } from 'react-router-dom'
// icons 
// import { IoBook } from "react-icons/io5";
import { MdOutlineMenuBook } from "react-icons/md";
import { TbChartBar } from "react-icons/tb";
import { IoAddCircleSharp } from "react-icons/io5";
import { IoMdSettings } from "react-icons/io";


const AdminNav = () => {

  return (  
    <div className='bg-adminNavBg flex flex-col w-fit min-h-screen gap-10 items-center'>
        <div className=' bg-adminHomeBg flex p-6'>
            <NavLink to='/' className=''> 
                <MdOutlineMenuBook className='size-8 text-white hover:scale-110'/> 
            </NavLink>

        </div>
    
        <div className='flex flex-col h-[220px] justify-between items-center text-white'>
            <NavLink 
                end to='' 
                className={({isActive}) => 
                `${isActive ? 'bg-white p-2 rounded text-adminHomeBg' : 'p-2 hover:text-adminHomeBg'}  `
                }
            > 
                <TbChartBar className='size-7'/> 
            </NavLink>

            <NavLink 
                to='add-new-books' 
                className={({ isActive }) => 
                    `${isActive ? 'bg-white p-2 rounded text-adminHomeBg': 'p-2 hover:text-adminHomeBg'}`
                }
            > 
                <IoAddCircleSharp className='size-7'/>
            </NavLink>
            <NavLink 
                to='manage-books' 
                className={({ isActive }) => 
                    `${isActive ? 'bg-white p-2 rounded text-adminHomeBg': 'p-2 hover:text-adminHomeBg'}`
                }
            > 
                <IoMdSettings className='size-7'/>
            </NavLink>
        </div>
        
    </div>
  )
}

export default AdminNav