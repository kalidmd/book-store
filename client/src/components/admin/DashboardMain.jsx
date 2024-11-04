import React from 'react'
import Profile from '../../pages/sections/admin/Profile'
import { NavLink, Outlet } from 'react-router-dom'

const DashboardMain = () => {
  return (
    <main className='w-large mx-auto'>
        <Profile />
        <section className='flex justify-between my-5'>
          <div>
            <h1 className='text-2xl font-medium'> Dashboard </h1>
            <p className='text-gray-600'>Book Store Inventory</p>
          </div>
          <div>
            <NavLink to={'manage-books'} className='border border-adminHomeBg p-2 rounded'> Manage Books </NavLink>
            <NavLink to={'add-new-books'} className='border bg-adminHomeBg p-2 rounded ml-4 text-white'> Add New Book </NavLink>
          </div>
        </section>
        <Outlet />
    </main>
  )
}

export default DashboardMain