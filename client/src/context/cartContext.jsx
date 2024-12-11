import { useState, createContext } from "react";
import Swal from "sweetalert2";
    // Cart Context Created
export const CartContext = createContext([]);
    // Cart Provider 
export const CartProvider = ({children}) => {
    const [cartItems, setCartItems] = useState(localStorage.getItem('carts') ? JSON.parse(localStorage.getItem('carts')) : []);

    const totalPrice = cartItems.reduce((acc, item) => acc + (item.newPrice * item.quantity), 0).toFixed();
    const item = cartItems.reduce((acc, item) => acc + item.quantity, 0).toFixed();

    const AddToCart = (books, bookId,) => {
        const clickedBook = books.find(book => book._id === bookId);
        let existingBook = cartItems.find(item => item._id === clickedBook._id);

        
        if(!existingBook) {
            setCartItems([...cartItems, clickedBook]);
            localStorage.setItem('carts', JSON.stringify([...cartItems, clickedBook]));
            Swal.fire({
                position: "center",
                icon: "success",
                title: `${clickedBook.title} is Added To Cart!`,
                showConfirmButton: false,
                timer: 1500
            });
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
    const value = {
        cartItems, 
        setCartItems, 
        AddToCart, 
        totalPrice,
        item
    }

    return (
        <CartContext.Provider value={value}>
            {children}
        </CartContext.Provider>
    )
}