import React from 'react'
import Search from '../../../components/Search'
import SearchIcon from '../../../assets/icons/search-icon.png'
// image 
import Teddy from '../../../assets/grace.jpg'
const Profile = () => {
  return (
    <section className='bg-white flex items-center py-3 justify-between'>
        <div className='flex items-center gap-3 py-1 px-3'>
            <img className='' src={SearchIcon} alt="search" />
            <Search placeholder='search'/>
        </div>

        <div className='flex items-center gap-3'>
            <div className=''> 
              <p className='font-medium'>Teddy Jeff</p>
              <p className='text-gray-600'>Lecturer</p>
            </div>
            <img className='w-12 h-12 rounded-full' src={Teddy} alt="Teddy Jeff" />
        </div>
    </section>
  )
}

export default Profile