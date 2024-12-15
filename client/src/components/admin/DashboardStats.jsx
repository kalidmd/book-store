import React, { useEffect, useState } from 'react'
import axios from 'axios';
// React Icons
import { LuBookOpen } from "react-icons/lu";
import { IoTrendingDownSharp } from "react-icons/io5";
import { IoTrendingUpOutline } from "react-icons/io5";
import { IoPieChart } from "react-icons/io5";

const DashboardStats = () => {
  const [totalBooks, setTotalBooks] = useState('');
  const [totalSales, setTotalSales] = useState('');
  const [trendingBooks, setTrendingBooks] = useState('');
  const [totalOrders, setTotalOrders] = useState('');
    // Error Handling States
  const [error, setError] = useState(null);
  const [fetchError, setFetchError] = useState(null);
    // API URL
  const localUrl = 'http://localhost:5000/api/v1';
  // const productionUrl = '';
  
  useEffect(() => {
    const dashboardStats = async () => {
      try {
        const token = localStorage.getItem('adminToken');
        const { data } = await axios.get(`${localUrl}/admin/dashboard`, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        
        // console.log(data);
        setError(false);
        setFetchError(false);
        setTotalBooks(data.totalBooks);
        setTotalSales(data.totalSales);
        setTrendingBooks(data.trendingBooks);
        setTotalOrders(data.totalOrders);

      } catch (error) {
        if (error.response) {
            // Error from backend
          setError(error.response.data.msg);
        } else {
            // Axios Error
          setFetchError(error.message);
        }
      }
    }

    dashboardStats();
  }, [])

  return (
    <main >
      {!error && !fetchError &&
        <section className='bg-lime-100 grid grid-cols-2 gap-3 xl:gap-5 lg:grid-cols-4'>
            {/* Item 1 */}
          <div className='bg-white flex gap-2 items-center py-6 px-3 shadow sm:px-5'>
            <div className='w-fit bg-purple-100 rounded-full p-3'>
              <LuBookOpen className='size-4 text-adminHomeBg'/>
            </div>
            <div>  
              <p className='font-semibold text-sm sm:text-base'> { totalBooks } </p>
              <p className='text-[10px] sm:text-xs text-gray-500'> Books </p>
            </div>
          </div>
            {/* Item 2 */}
          <div className='bg-white flex gap-2 items-center py-6 px-3 shadow sm:px-5'> 
            <div className='w-fit bg-green-100 rounded-full p-3'>
              <IoTrendingUpOutline className='size-4 text-green-700'/>
            </div> 
            <div>  
              <p className='font-semibold text-sm sm:text-base'> ${totalSales} </p>
              <p className='text-[10px] sm:text-xs text-gray-500'> Total Sales </p>
            </div>
          </div>
            {/* Item 3 */}
          <div className='bg-white flex gap-2 items-center py-6 px-3 shadow sm:px-5'> 
            <div className='w-fit bg-red-100 rounded-full p-3'>
              <IoTrendingDownSharp className='size-4 text-red-700'/>
            </div> 
            <div>  
              <p className='font-semibold text-sm sm:text-base'> {trendingBooks} <span className='text-xs sm:text-sm text-gray-500'> (13%) </span> </p>
              <p className='text-[10px] sm:text-xs text-gray-500'> Trending Books in This Month </p>
            </div>
          </div>
            {/* Item 4 */}
          <div className='bg-white flex gap-2 items-center py-6 px-3 shadow sm:px-5'> 
            <div className='w-fit bg-blue-100 rounded-full p-3'>
              <IoPieChart className='size-4 text-blue-600'/>
            </div> 
            <div>  
              <p className='font-semibold text-sm sm:text-base'> { totalOrders } </p>
              <p className='text-[10px] sm:text-xs text-gray-500'> Total Orders </p>
            </div>
          </div>
            {/* Item 5 */}       
          <div className='bg-red-200 text-center col-start-1 col-end-3 lg:col-start-1 lg:col-end-3'> item-5 </div>
          
          <div className='bg-red-200'> item 6 </div>
          
          <div className='bg-red-200'> item 7 </div>
        </section>
      }

      { 
        fetchError ? 
        <p className='mt-4 italic text-red-500 text-center text-lg'> 
            {fetchError}
        </p> : 
        error && <p className='mt-4 italic text-red-500 text-center text-lg'> { error } </p> 
      }

    </main>
  )
}

export default DashboardStats;
