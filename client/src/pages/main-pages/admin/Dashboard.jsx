import React, { } from 'react'
import AdminNav from '../../../components/admin/AdminNav'
// sections
// import Profile from '../../sections/admin/Profile'
import DashboardMain from '../../../components/admin/DashboardMain'
import { useContext } from 'react'
import { UserContext } from '../../../context/userContext'
// import { UserContext } from '../../../context/userContext'


const Dashboard = () => {
  const {isAdmin} =useContext(UserContext);

  return (
    <div className='flex justify-between font-montserrat'>    
        <AdminNav />
        <DashboardMain />
    </div>
  )
}

export default Dashboard