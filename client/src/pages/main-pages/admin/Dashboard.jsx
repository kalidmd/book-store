import React from 'react'
import AdminNav from '../../../components/admin/AdminNav'
// sections
// import Profile from '../../sections/admin/Profile'
import DashboardMain from '../../../components/admin/DashboardMain'


const Dashboard = () => {
  return (
    <div className='flex justify-between font-montserrat'>    
        <AdminNav />
        <DashboardMain />
    </div>
  )
}

export default Dashboard