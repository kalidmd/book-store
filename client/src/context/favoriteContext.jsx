// import axios from "axios";
import { createContext, useState } from "react";
// import getBaseURL from "../utils/baseURL";

export const FavoriteContext = createContext([]);

export const FavoriteProvider = ({ children }) => {
    const [favorite, setFavorite] = useState(localStorage.getItem('favorite') ? JSON.parse(localStorage.getItem('favorite')) : []);

    const addToFavorite = (books, bookId) => {
        const selectedBook = books && books.find(book => book._id === bookId);
        const existingBook = favorite && favorite.find(book => book._id === bookId);
        const filterdBooks = favorite && favorite.filter(book => book._id !== bookId);

        if (!existingBook) {
            setFavorite([...favorite, selectedBook]);
            localStorage.setItem('favorite', JSON.stringify([...favorite, selectedBook]));
        } else {
            setFavorite(filterdBooks);
            localStorage.setItem('favorite', JSON.stringify(filterdBooks));
        }
    }

    const value = {
        favorite,
        addToFavorite,
    }
    return (
        <FavoriteContext.Provider value={value}>
            { children }
        </FavoriteContext.Provider>
    )
}
