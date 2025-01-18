import React, { useContext, useEffect, useState } from 'react'
    // Custom Components
import Book from '../../components/Book'
    // Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';
    // Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
    // import required modules
import { Navigation, Pagination } from 'swiper/modules'
import { CartContext } from '../../context/cartContext';
import axios from 'axios';
import { SearchContext } from '../../context/searchContext';
import Loading from '../../components/Loading';
import getBaseURL from '../../utils/baseURL';
import { FavoriteContext } from '../../context/favoriteContext';


const TopSellers = () => {
        // Context Usages
    const { AddToCart } = useContext(CartContext);
    const { favorite, addToFavorite } = useContext(FavoriteContext);
    const { search } = useContext(SearchContext);
        // States Def
    const [books, setBooks] = useState([]);
        // Error Handling States
    const [error, setError] = useState(null);
    const [fetchError, setFetchError] = useState(null);
        // Loader State
    const [isloading, setIsLoading] = useState(false);

    const categories = ['Choose a genre', 'Fiction', 'Romance', 'Fantasy', 'Horror', 'Business', 'Adventure', 'Non-fictional'];
    const [selectedCategory, setSelectedCategory] = useState('Choose a genre');
    

    const filterdBooks = selectedCategory === 'Choose a genre' ? books && books.length > 0 && books : books && books.length > 0 && books.filter(book => book.category === selectedCategory);


    const favoriteIds = favorite && favorite.map(book => book._id);

    const handleCart = (bookId) => {
        AddToCart(books, bookId);
    }

    const handleFavorite = (bookId) => {
       addToFavorite(books, bookId);
    }


    useEffect(() => {
        const fetchBooks = async () => {
            try {
                setIsLoading(true);
                const { data } = await axios.get(`${getBaseURL()}/books?search=${search}`)

                setBooks(data.book);
                setError(false);
                setFetchError(false);
                setIsLoading(false);

            } catch (error) {
                setIsLoading(false);
                if (error.response) {
                        // Error From Backend
                    setError(error.response.data.msg);
                } else {
                        // Axios Error
                    setFetchError(error.message);
                }
            }
        }
        fetchBooks();
    }, [search])
 

    return (
        <section className='section-cont'>
            <h1 className='title'>Top Sellers</h1>
            <select onChange={(e) => setSelectedCategory(e.target.value)} className='select'>
                {
                    categories.map((item,index) => (
                        <option key={index} value={item}> {item} </option>
                    ))
                }
            </select>
            <Swiper
                slidesPerView={1}
                spaceBetween={50}
                pagination={{
                    dynamicBullets: true,
                    clickable: true
                }}
                navigation={true}
                breakpoints={{
                    640: {
                        slidesPerView: 1,
                        spaceBetween: 50,
                    },
                    768: {
                        slidesPerView: 2,
                        spaceBetween: 100,
                    },
                    1024: {
                        slidesPerView: 2,
                        spaceBetween: 50,
                    },
                    1180: {
                        slidesPerView: 3,
                        spaceBetween: 200,
                    },
                }}
                modules={[Pagination, Navigation]}
                className="mySwiper bg-white mt-[10px] py-[10px] px-[12px] rounded-md select-none"
            >   
                <>
                    {
                        !isloading ? !error && !fetchError && filterdBooks && filterdBooks.length > 0 &&
                            filterdBooks.map((book) => (
                                <SwiperSlide key={book._id}>
                                    <Book 
                                        src={book.coverImage.url}
                                        alt={book.title}
                                        bookID={book._id}
                                        bookTitle={book.title}
                                        bookDesc={book.description}
                                        newPrice={book.newPrice}
                                        oldPrice={book.oldPrice}
                                        handleCart={() => handleCart(book._id)}
                                        handleFavorite={() => handleFavorite(book._id)}
                                        favoriteIds={favoriteIds}
                            
                                    />
                                </SwiperSlide>
                            )) : 
                            <div className='h-[250px] flex items-center justify-center'>
                                <Loading />
                            </div>
                    }

                    {
                        fetchError ? 
                            <p className='h-[250px] flex items-center justify-center italic text-red-500 lg:text-lg'> 
                                { `${fetchError}, Please try again.` } 
                            </p> : 
                        error && <p className='h-[250px] flex items-center justify-center italic text-red-500 lg:text-lg'> { error } </p>
                    }
                </>
            </Swiper> 
        </section>
    )
}

export default TopSellers;