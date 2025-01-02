import axios from "axios";
import { createContext, useContext, useState } from "react";
import getBaseURL from "../utils/baseURL";
import { UserContext } from "./userContext";

export const FavoriteContext = createContext([]);

export const FavoriteProvider = ({ children }) => {
    const { user } = useContext(UserContext);

    const [favorite, setFavorite] = useState(localStorage.getItem('favorite') ? JSON.parse(localStorage.getItem('favorite')) : []);
    const [isFavorite, setIsFavorite] = useState(false);
    const [error, setError] = useState(null);
    const [fetchError, setFetchError] = useState(null);
    console.log('favorite', favorite);
    console.log('isFavorite:', isFavorite);
    console.log(user);

    const checkFavorite = async () => {
        try {
            
        } catch (error) {
            
        }
    }

    const addToFavorite = async (bookId) => {
        try {
            const token = localStorage.getItem('token');
            const { data } = await axios.put(`${getBaseURL()}/books/favorite`, {_id: bookId}, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })

            setFavorite(data.favorite);
            setIsFavorite(!isFavorite);
            localStorage.setItem('favorite', JSON.stringify(data.favorite));

        } catch(error) {
            if (error.response) {
                    // Error From Backend
                setError(error.response.data.msg);
                console.error(error.response.data.msg); 
            } else {
                // Axios Error
                setFetchError(error.message);
                console.error(error.message); 
            }
        }

    }

    const value = {
        favorite,
        addToFavorite,
        error,
        fetchError
    }
    return (
        <FavoriteContext.Provider value={value}>
            { children }
        </FavoriteContext.Provider>
    )
}
