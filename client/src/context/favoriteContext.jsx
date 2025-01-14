import axios from "axios";
import { createContext, useEffect, useState } from "react";
import getBaseURL from "../utils/baseURL";

export const FavoriteContext = createContext([]);

export const FavoriteProvider = ({ children }) => {
    const [favorite, setFavorite] = useState([]);
    const [favoriteError, setFavoriteError] = useState(null);
    const [favoriteFetchError, setFavoriteFetchError] = useState(null);
    const [isFavoriteLoading, setIsFavoriteLoading] = useState(false);
    const [isAddToFavoriteLoading, setIsAddToFavoriteLoading] = useState(false);

    useEffect(() => {
        getFavoriteBooks();
    }, [])
    
    const getFavoriteBooks = async () => {
        try {
            setIsFavoriteLoading(true);
            const token = localStorage.getItem('token');
            const { data } = await axios.get(`${getBaseURL()}/books/favorite`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })
            setIsFavoriteLoading(false);
            setFavoriteError(false);
            setFavoriteFetchError(false);
            setFavorite(data.favorite);
            
        } catch (error) {
                // Error From Backend
            if (error.response) {
                setFavoriteError(error.response.data.msg);
            } else {
                    // Axios Error
                setFavoriteFetchError(error.message)
            }
            setIsFavoriteLoading(false);
        }
    }
    
    const addToFavorite = async (bookId) => {
        try {
            setIsAddToFavoriteLoading(true);
            const token = localStorage.getItem('token');
            await axios.put(`${getBaseURL()}/books/favorite`, {_id: bookId}, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })

            setIsAddToFavoriteLoading(false);
            

        } catch(error) {
            if (error.response) {
                    // Error From Backend
                setFavoriteError(error.response.data.msg);
                console.error(error.response.data.msg); 
            } else {
                // Axios Error
                setFavoriteFetchError(error.message);
                console.error(error.message); 
            }
            setIsAddToFavoriteLoading(false);
        } finally {
            getFavoriteBooks();
        }
    }

    const value = {
        favorite,
        addToFavorite,
        favoriteError,
        favoriteFetchError,
        isFavoriteLoading,
        isAddToFavoriteLoading
    }
    return (
        <FavoriteContext.Provider value={value}>
            { children }
        </FavoriteContext.Provider>
    )
}
