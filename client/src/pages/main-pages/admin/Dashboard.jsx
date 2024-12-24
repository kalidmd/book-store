import React, { } from 'react'
import AdminNav from '../../../components/admin/AdminNav'
// sections
// import Profile from '../../sections/admin/Profile'
import DashboardMain from '../../../components/admin/DashboardMain'


const Dashboard = () => {
  return (
    <main>
      <div className='lg:bg-websiteMobileBg flex justify-between font-montserrat'>    
          <AdminNav />
          <DashboardMain />
      </div>
    </main>
  )
}

export default Dashboard