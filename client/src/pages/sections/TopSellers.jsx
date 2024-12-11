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
// Components
// import AddToCart from '../../components/AddToCart';


const TopSellers = () => {
        // Cart Context Usage
    const { AddToCart } = useContext(CartContext);
        // Search Context Usage
    const { search } = useContext(SearchContext);
        // States Def
    const [books, setBooks] = useState([]);
        // Error Handling States
    const [error, setError] = useState(null);
    const [fetchError, setFetchError] = useState(null);

    const categories = ['Choose a genre', 'Fiction', 'Romance', 'Fantasy', 'Horror', 'Business', 'Adventure', 'Non-fictional'];
    const [selectedCategory, setSelectedCategory] = useState('Choose a genre');
    

    const filterdBooks = selectedCategory === 'Choose a genre' ? books && books.length > 0 && books : books && books.length > 0 && books.filter(book => book.category === selectedCategory);

    // api url
    const localUrl = 'http://localhost:5000/api/v1';
    // const productionUrl =

    const handleCart = (bookId) => {
        AddToCart(books, bookId);
        
    }

    useEffect(() => {
        const fetchBooks = async () => {
            try {
                const { data } = await axios.get(`${localUrl}/books?search=${search}`)

                setBooks(data.book);
                setError(false);
                setFetchError(false);

            } catch (error) {
                if (error.response) {
                    setError(error.response.data.msg);
                } else {
                    setFetchError(error.message);
                }
            }
        }
        fetchBooks();
    }, [search])
 

    return (
        <section className='section-cont'>
            { 
            !error && filterdBooks && filterdBooks.length > 0 &&
                <>
                
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
                                filterdBooks && filterdBooks.length > 0 &&
                                    filterdBooks.map((book) => (
                                        <SwiperSlide key={book._id} >
                                            <Book 
                                                src={book.coverImage.url}
                                                alt={book.title}
                                                bookID={book._id}
                                                bookTitle={book.title}
                                                bookDesc={book.description}
                                                newPrice={book.newPrice}
                                                oldPrice={book.oldPrice}
                                                handleCart={() => handleCart(book._id)}
                                                />
                                        </SwiperSlide>
                                    )) 
                            }
                        </>
                </Swiper> 
            </>
            }

            {
                fetchError ? 
                    <p className='mt-4 italic text-red-500 text-center text-lg'> 
                        { fetchError } 
                    </p> : 
                error && <p className='mt-4 italic text-red-500 text-center text-lg'> { error } </p>
            }
        </section>
    )
}

export default TopSellers;