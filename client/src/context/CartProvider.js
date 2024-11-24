import { useState } from "react";
import { CartContext } from "./CartContext";
import Swal from "sweetalert2";

export const CartProvider = ({children}) => {
    const [cartItems, setCartItems] = useState([]);

    const totalPrice = cartItems.reduce((acc, item) => acc + item.newPrice, 0).toFixed();

    const AddToCart = (books, bookId,) => {
        const clickedBook = books.find(book => book._id === bookId);
        let existingBook = cartItems.find(item => item._id === clickedBook._id);
        
        if(!existingBook) {
            setCartItems([...cartItems, clickedBook]);
            Swal.fire({
                position: "center",
                icon: "success",
                title: `${clickedBook.title} is Added To Cart!`,
                showConfirmButton: false,
                timer: 1500
            });
            // alert(`${clickedBook.title} is Added to Cart!`)
        } else {
            Swal.fire({
                title: `${clickedBook.title} Already Added To Cart!`,
                icon: "warning",
                showCancelButton: false,
                confirmButtonColor: "#3085d6",
                cancelButtonColor: "#d33",
                confirmButtonText: "Ok"
                });
        }

    }
    // console.log(cartItems);

    return (
        <CartContext.Provider value={{cartItems, setCartItems, AddToCart, totalPrice}}>
            {children}
        </CartContext.Provider>
    )
}