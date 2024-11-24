import React, { useContext } from 'react'
import { CartContext } from '../../context/CartContext'
// Icons
import { MdArrowRightAlt } from "react-icons/md";
import { Link, useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';

const CartPage = () => {
    const {cartItems, setCartItems} = useContext(CartContext);
    const navigate = useNavigate();

    
    const totalPrice = cartItems.reduce((acc,item) => acc + item.newPrice, 0).toFixed();

    const clearCart = () => {
        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, clear my cart!"
        }).then((result) => {
            if (result.isConfirmed) {
                setCartItems([]);
              Swal.fire({
                title: "Cleared!",
                text: "Your Cart has been cleared.",
                icon: "success"
              });
            }
        })
    }

    const handleRemoveItem = (bookId) => {
        const filteredItems = cartItems.filter(item => item._id !== bookId);
        const selecedItem = cartItems.find(item => item._id === bookId);

        Swal.fire({
            title: `Are you sure? You want to remove ${selecedItem.title}`,
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, Remove Item!"
        }).then((result) => {
            if (result.isConfirmed) {
                setCartItems(filteredItems);
              Swal.fire({
                title: "Removed!",
                text: `${selecedItem.title} has been removed!`,
                icon: "success"
              });
            }
        })
    }
    const navigateToCheckout = () => {
        navigate('/checkout');
    }
    return (
        <div className='w-large mx-auto shadow-md p-4 my-10 flex flex-col gap-5'>
            <div className='flex w-full justify-between items-center mb-4'>
                <h2>Shopping cart</h2>

                {cartItems.length > 0 && <button onClick={clearCart} className='bg-[#dc3511] text-white rounded-md py-1 px-2'> Clear Cart </button>}
            </div>
       
             {
                cartItems.length > 0 ?
                    cartItems.map((item) => (
                        <div key={item._id}> 
                            <div className='flex justify-between'>
                                <div className='flex gap-4'>
                                    <div className={`h-28 w-24 rounded-md`}>
                                        <img className='h-full w-full object-cover rounded-md' src={item.coverImage} alt={item.title} />
                                    </div>
                                    <div className='flex flex-col justify-between'>
                                        <div>
                                            <p> {item.title} </p>
                                            <p> Catagory: {item.category}</p>
                                        </div>
                                        <p> Qty: </p>
                                    </div>
                                </div>
                                <div className='flex flex-col justify-between items-end'>
                                    <p> ${item.newPrice}</p>
                                    <button onClick={() => handleRemoveItem(item._id)}>Remove</button>
                                </div>
                            </div>
                            <hr className='mt-5'/>
                        </div>
                    )):
                    <p className='text-gray-500 font-medium'>No Item Found</p>

            }
            

            <div>
                <div className='flex justify-between mb-1'>
                    <h2> Subtotal </h2>
                    <p> ${totalPrice} </p>
                </div>

                <p className='text-sm text-gray-500'>
                    Shipping and taxes calculated at checkout.
                </p>

                <button onClick={navigateToCheckout} className='bg-blue-700 text-white w-full rounded py-2 my-4'> Checkout </button>

                <Link className='text-center block' to='/'> 
                    <p className='text-blue-700 font-medium text-sm'>
                    <span className='text-gray-500'> or </span>
                        Continue Shopping
                        <MdArrowRightAlt  className='inline'/> 
                    </p> 
                </Link>
            </div>

        </div>
    )
}

export default CartPage