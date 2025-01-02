import React, { useContext, useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { CartContext } from '../../context/cartContext'
import Swal from 'sweetalert2'
import axios from 'axios';
import ScaleLoader from 'react-spinners/ScaleLoader';
  // Custom Components
import getBaseURL from '../../utils/baseURL';
import Loading from '../../components/Loading';

const CheckoutPage = () => {
  const {cartItems, setCartItems, totalPrice, item} = useContext(CartContext);
  // const [error, setError] = useState(null);
  const navigate = useNavigate();

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [address, setAddress] = useState('');
  const [city, setCity] = useState('');
  const [country, setCountry] = useState('');
  const [state, setState] = useState('');
  const [zipcode, setZipcode] = useState('');
  const [isChecked, setIsChecked] = useState(false);
    // Error Handling States
  const [error, setError] = useState(null);
  const [fetchError, setFetchError] = useState(null);
    // Loading State
  const [isLoading, setIsLoading] = useState(false);
  const [isCreateOrderLoading, setIsCreateOrderLoading] = useState(false);


  useEffect(() => {

    const fetchUser = async (id) => {
      try {
        setIsLoading(true);
        const token = localStorage.getItem('token');
        const { data } = await axios.get(`${getBaseURL()}/users/user/${id}`, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        })

        setError(false);
        setFetchError(false);
        setName(data.user.username);
        setEmail(data.user.email);
        setIsLoading(false);

      } catch (error) {
        if (error.response) {
            // Custom Error from Backend
          setError(error.response.data.msg);
        } else {
            // Axios Error
          setFetchError(error.message);
        }
        setIsLoading(false);
      }
    }

    fetchUser();

  }, [])

    
  const createAnOrder = async (e) => {
    e.preventDefault();

    const newOrder = {
        name: name,
        email: email,
        location: {
          address: address,
          city: city,
          country: country,
          state: state,
          zipcode: zipcode
        },
        phone: phone,
        productIds: cartItems.map(item => item?._id),
        totalPrice: totalPrice
    }


      Swal.fire({
        title: "Confirm Order",
        text: "Would You Like To Confirm Your Order?",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, Confirm Order!"
      }).then(async (result) => {
        if (result.isConfirmed) {
          try {
            setIsCreateOrderLoading(true);
            const token = localStorage.getItem('token');
            await axios.post(`${getBaseURL()}/orders`, (newOrder) , {
              headers: {
                Authorization: `Bearer ${token}`
              }
            } )

            setError(false);
            setFetchError(false);
            localStorage.removeItem('carts');
            setCartItems([]);
            navigate('/orders');
            setIsCreateOrderLoading(false);

          } catch (error) {
            if (error.response) {
                // Custom Error from Backend
              setError(error.response.data.msg);
            } else {
                // Axios Error
              setFetchError(error.message)
            }
            setIsCreateOrderLoading(false);
          }
        }
      });
  }

  return (
    <div className='bg-gray-100 w-large 2xl:w-xLarge mx-auto py-10 lg:bg-searchBg lg:p-20'>
      <div className='mb-3'>
        <h2 className='font-bold'> Cash On Delivery </h2>
        <p className='text-gray-500 font-medium'> Total Price : ${totalPrice} </p>
        <p className='text-gray-500 font-medium'> Items: { item } </p>
      </div>

      { !isLoading &&
        <div className='bg-white p-3 lg:flex justify-between py-10 px-4'>
          <div className=' mb-3'>
            <h2 className='font-semibold'> Personal Details </h2>
            <p className='text-sm'> Please fill out all the fields. </p>
          </div>

          <div>
            <form onSubmit={createAnOrder} className='checkout-form'>
              <label >Full Name</label>
              <input 
                className=''
                type="text"
                placeholder='Full Name' 
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
              <label >Email Address</label>
              <input 
                className=''
                type="email"
                placeholder='Email Address'
                required 
                value={email}
                onChange={(e) => setEmail(e.target.value)}

              />
              <label >Phone Number</label>
              <input 
                className=''
                type="tel"
                placeholder='+251'
                required 
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
              />
              <div className='flex flex-col lg:flex-row justify-between'>
                <div className='flex flex-col'>
                  <label >Address / Street</label>
                  <input 
                    className='lg:w-[300px]'
                    type="text"
                    placeholder='Address / Street'
                    required 
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                  />
                </div>
                
                <div className='flex flex-col '>
                  <label >City</label>
                  <input 
                    className=''
                    type="text"
                    placeholder='City'
                    required 
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                  />
                </div>
              </div>

              <div className='flex flex-col lg:flex-row gap-2'>
                <div className='flex flex-col'>
                  <label >Country / region</label>
                  <input 
                    className=''
                    type="text"
                    placeholder='Country'
                    required 
                    value={country}
                    onChange={(e) => setCountry(e.target.value)}
                  />
                </div>

                <div className='flex flex-col'>
                  <label >State/ province</label>
                  <input 
                    className=''
                    type="text"
                    placeholder='State'
                    value={state}
                    onChange={(e) => setState(e.target.value)}
                  />
                </div>

                <div className='flex flex-col'>
                  <label >Zipcode</label>
                  <input 
                    className='lg:w-[90px]'
                    type="text"
                    placeholder='Zipcode'
                    value={zipcode}
                    onChange={(e) => setZipcode(e.target.value)}
                  />
                </div>
              </div>

              {
                fetchError ? 
                <p className='mt-4 italic text-red-500 text-center lg:text-lg'> 
                    { `${fetchError}, Please try again.` }
                </p> : 
                error && <p className='mt-4 italic text-red-500 text-center lg:text-lg'> { error } </p>
              }

              <div className='text-center mt-4 lg:text-start'>
                <input 
                  type="checkbox"
                  className='cursor-pointer' 
                  checked={isChecked}
                  onChange={() => setIsChecked(!isChecked)}
                  
                />
                <label onClick={() => setIsChecked(!isChecked)} className='select-none cursor-pointer text-sm ml-1'> 
                  I aggree to the 
                  <Link className='text-blue-600 underline' to='/terms-and-conditions'> Terms & Conditions </Link> and
                  <Link className='text-blue-600 underline' to='/shopping-policy'> Shopping Policy </Link> 
                </label>
              </div>

              <div className='flex justify-center lg:justify-end'>
                {
                  isChecked ? 
                    <button
                      className='bg-blue-600 rounded-md text-white text-sm font-semibold py-2 px-3 w-[132px] h-[36px] mt-3'> 
                      {
                          isCreateOrderLoading ? 
                            <ScaleLoader
                              color='#FFFFFF' 
                              height={14}
                              width={3}
                            /> :
                            'Place an Order'
                        }  
                    </button> :
                    <button 
                      disabled
                      title='You have to aggree to our terms and conditions and shopping policy before placing an order'
                      className='bg-gray-400 rounded-md text-white text-sm font-semibold py-2 px-3 w-fit mt-3'> 
                         Place an Order 
                    </button>
                  }
              </div>
            </form>
          </div>

        </div>
      }

      {
        isLoading &&  
          <Loading />
      }
    </div>
  )
}

export default CheckoutPage