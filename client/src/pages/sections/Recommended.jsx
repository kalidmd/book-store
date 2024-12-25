import React, { useContext, useEffect, useState } from 'react'

// Components
import Book from '../../components/Book'
// import { AddToCart } from '../../components/AddToCart';

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
import Loading from '../../components/Loading';
import getBaseURL from '../../utils/baseURL';

const Recommended = () => {
    const {AddToCart} = useContext(CartContext);
    const [books, setBooks] = useState([]);
    const [error, setError] = useState(false);
    const [fetchError, setFetchError] = useState(null);
    const [loading, setLoading] = useState(false);

    const recommendedBooks = books && books.length > 0 && books.slice(5, books.length);

    const handleCart = (bookId) => {
        AddToCart(books, bookId);
    }

    useEffect(() => {
        const baseURL = getBaseURL();
        const fetchBooks = async () => {
            try {
                setLoading(true);
                const {data} = await axios.get(`${baseURL}/books`)

                setBooks(data.book);
                setLoading(false);
            } catch (error) {
                if (error.response) {
                        // Backend Error
                    setError(error.response.data.msg);
                } else {
                        // Axios Error
                    setFetchError(error.message);
                }
                setLoading(false);
            }
        }
        fetchBooks();
    }, [])

  return (
    <section className='section-cont mt-10'>
        <p className="title">Recommended for you</p>
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
            {
                !loading ? recommendedBooks && recommendedBooks.length > 0 && recommendedBooks.map((book) => (
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
                )) : 
                <div className='h-[250px] flex items-center justify-center'>
                    <Loading />
                </div>
            }

            {
                fetchError ? 
                    <p className='h-[250px] flex items-center justify-center italic text-red-500 lg:text-lg'> 
                        {fetchError}
                    </p> : 
                error && <p className='h-[250px] flex items-center justify-center italic text-red-500 lg:text-lg'> { error } </p>
            }
        </Swiper>
    </section>
  )
}

export default Recommended;