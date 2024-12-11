import React, { useEffect, useState } from 'react';
import axios from 'axios';

const OrderPage = () => {
  const [orders, setOrders] = useState([null]);
    // Error Handler States
  const [error, setError] = useState(false);
  const [fetchError, setFetchError] = useState(false);
    // Loader State
  const [isLoading, setisLoading] = useState(false);
    // API Endpoints
  const localUrl = 'http://localhost:5000/api/v1';
  // const productionUrl = '';

  useEffect(() => {
    const getOrders = async () => {
      const token = localStorage.getItem('token');

      try {
        setisLoading(true);
        const { data } = await axios.get(`${localUrl}/orders`, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        })

        setisLoading(false);
        console.log(data);
        setOrders(data.order);

      } catch (error) {
          setisLoading(false);
          if (error.response) {
            setError(error.response.data.msg);
          } else {
            setFetchError(error.message);
          }
      }
    }
    getOrders();
  }, [])

  return (
    <div className='w-large 2xl:w-xLarge mx-auto my-8'>
      <h1 className='font-bold text-xl'>Your Orders</h1>
      
      {
        orders && orders.length > 1 && orders.map((order, index) => {
          return (
             <div key={order._id} className='flex flex-col gap-1 my-4'>
                <h2 className='bg-text w-fit text-white rounded py-1 px-2'> 
                  {`# ${index + 1}`} 
                </h2>
                <p className='font-bold'> Order Id: <span className='font-normal'> {order._id} </span> </p>
                <p className='font-bold'> Name: <span className='font-normal text-gray-500'> {order.name} </span> </p>
                <p className='font-bold'>Email: <span className='font-normal text-gray-500'> {order.email} </span> </p>
                <p className='font-bold'>Phone: <span className='font-normal text-gray-500'> { order.phone } </span> </p>
                <p className='font-bold'>Total Price: <span className='font-normal text-gray-500'> { `$${order.totalPrice}` } </span> </p>
                <div className='font-bold'>Address:
                  <p className='ml-4 font-normal text-gray-500'> 
                  { 
                    `${order.location.address}, 
                      ${order.location.city}, 
                      ${order.location.country} 
                      ${order.location.state ? `, ${order.location.state}`: ''} 
                      ${order.location.zipcode ? `, ${order.location.zipcode}`: ''}` 
                  } 
                  </p> 
                </div>
                <div className='font-bold'>Product Id:
                  { order.productIds.map((id) => (
                    <p key={id} className='ml-4 font-normal text-gray-500'> 
                      {id}
                      <br />
                    </p> 
                  )) } 
                </div>
                <hr className='mt-2 border-gray-400'/>
              </div>
            )
        })
      }

      {
        isLoading && <p> Loading... </p>
      }

      {
          fetchError ? 
          <p className='mt-4 italic text-red-500 text-lg'> 
              { fetchError } 
          </p> : 
          error && <p className='mt-4 italic text-red-500 text-lg'> { error } </p>
      }
    </div>
  )
}

export default OrderPage;