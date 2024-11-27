import React, { useEffect, useState } from 'react'

const OrderPage = () => {
  const [orders, setOrders] = useState([]);
  const [error, setError] = useState(false);
  const localUrl = 'http://localhost:5000/api/v1';

  console.log(orders);

  useEffect(() => {
    const getOrders = async () => {
      const token = localStorage.getItem('token');
      try {
        const response = await fetch(`${localUrl}/orders`, {
          method: 'get',
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json'
          }
        });
        const data = await response.json();

        if(data.msg) {
          setError(data.msg);
        } else {
          setOrders(data.order);
          setError(false);
        }
  
        console.log(data);
        
      } catch (error) {
        console.error(error);
      }
    }

    getOrders();
  }, [])

  return (
    <div className='w-large 2xl:w-xLarge mx-auto my-8'>
      <h1 className='font-bold text-xl'>Your Orders</h1>
      
      {
        orders.length > 0 && orders.map((order, index) => {
          return (
        <div key={order._id} className='flex flex-col gap-1 my-4'>
        <h2 className='bg-text w-fit text-white rounded py-1 px-2'> 
          {`# ${index + 1}`} 
        </h2>
        <p className='font-bold'> Order Id: &nbsp;
          <span className='font-normal'> {order._id} </span> 
        </p>
        <p className='font-bold'> Name: &nbsp;
          <span className='font-normal text-gray-500'> {order.name} </span> 
        </p>
        <p className='font-bold'>Email: &nbsp;
          <span className='font-normal text-gray-500'> {order.email} </span> 
        </p>
        <p className='font-bold'>Phone: &nbsp;
          <span className='font-normal text-gray-500'> { order.phone } </span> 
        </p>
        <p className='font-bold'>Total Price: &nbsp;
          <span className='font-normal text-gray-500'> { `$${order.totalPrice}` } </span> 
        </p>
        <p className='font-bold'>Address:
          <p className='ml-4 font-normal text-gray-500'> 
          { 
            `${order.location.address}, 
              ${order.location.city}, 
              ${order.location.country} 
              ${order.location.state ? `, ${order.location.state}`: ''} 
              ${order.location.zipcode ? `, ${order.location.zipcode}`: ''}` 
          } 
          </p> 
        </p>
        <p className='font-bold'>Product Id: &nbsp;
          { order.productIds.map((id) => (
            <p key={id} className='ml-4 font-normal text-gray-500'> 
              {id}
              <br />
             </p> 
          )) } 
        </p>
        <hr className='mt-2 border-gray-400'/>
        { <p className='text-sm text-red-500 italic'> {error} </p> }
      </div>
          )
      })
      }
    </div>
  )
}

export default OrderPage;