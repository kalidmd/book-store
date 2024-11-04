import React from 'react'
import {AddIcon, BarChartIcon, BookIcon, ManageIcon} from '../../assets/Icons.jsx'
import { NavLink } from 'react-router-dom'


const AdminNav = () => {
    // const [isChartActive, setIsChartActive] = useState(); 
    // const [isAddActive, setIsAddActive] = useState(); 
    // const [isManageActive, setIsManageActive] = useState(); 
    // const fillClicked = '#000000'
    const fill = '#bbbbbb'

  return (  
    <div className='bg-adminNavBg flex flex-col w-fit min-h-screen gap-10 items-center'>
        <NavLink to='/' className='bg-adminHomeBg p-6'> <BookIcon /> </NavLink>
    
        <div className='flex flex-col h-[220px] justify-between items-center'>
            <NavLink 
                end to='' 
                className='admin-nav'
            > 
                <BarChartIcon fill={fill}/> 
            </NavLink>

            <NavLink 
                to='add-new-books' 
                className='admin-nav'
            > 
                <AddIcon fill={fill}/> 
            </NavLink>
            <NavLink 
                to='manage-books' 
                className='admin-nav'
            > 
                <ManageIcon fill={fill}/> 
            </NavLink>
        </div>
        
    </div>
    // <div className='bg-adminNavBg flex flex-col w-fit h-screen gap-10 items-center'>
    //     <NavLink to='/' className='bg-adminHomeBg p-6'> <BookIcon /> </NavLink>
    
    //     <div className='bg-red-500 flex flex-col h-[220px] justify-between items-center'>
    //         <NavLink 
    //             end to='' 
    //             className={
    //                 ({isActive}) => (isActive ? (setIsChartActive(true), 'admin-nav active'): (setIsChartActive(false), 'admin-nav'))
    //             }  
    //         > 
    //             <BarChartIcon fill={isChartActive ? fillClicked : fill}/> 
    //         </NavLink>

    //         <NavLink 
    //             to='add-new-books' 
    //             className={
    //                 ({isActive}) => (isActive ? (setIsAddActive(true), 'admin-nav active'): (setIsAddActive(false), 'admin-nav'))
    //             }
    //         > 
    //             <AddIcon fill={isAddActive ? fillClicked : fill}/> 
    //         </NavLink>
    //         <NavLink 
    //             to='manage-books' 
    //             className={
    //                 ({isActive}) => (isActive ? (setIsManageActive(true), 'admin-nav active'): (setIsManageActive(false), 'admin-nav'))
    //             }
    //         > 
    //             <ManageIcon fill={isManageActive ? fillClicked : fill}/> 
    //         </NavLink>
    //     </div>
        
    // </div>
  )
}

export default AdminNav