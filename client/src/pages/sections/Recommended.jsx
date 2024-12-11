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

const Recommended = () => {
    const {AddToCart} = useContext(CartContext);
    const [books, setBooks] = useState([null]);
    const [error, setError] = useState(false);
    const [fetchError, setFetchError] = useState(null);

    const recommendedBooks = books.length > 0 && books.slice(5, books.length);

    const localUrl = 'http://localhost:5000/api/v1';
    // const productionUrl = 
    // console.log(error);

    const handleCart = (bookId) => {
        AddToCart(books, bookId);
    }

    useEffect(() => {
        const fetchBooks = async () => {
            try {
                const response = await fetch(`${localUrl}/books`)
                const data = await response.json();
                // console.log(data);
                if (data.msg) {
                    setError(data.msg);

                } else {
                    setBooks(data.book);
                    setError(false);
                }
            } catch (error) {
                setFetchError(error);
                // console.error(error);
            }
        }
        fetchBooks();
    }, [])

  return (
    <section className='section-cont mt-10'>
        { recommendedBooks && recommendedBooks.length > 0 &&
        <> 
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
                    recommendedBooks.length > 0 && recommendedBooks.map((book) => (
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
                {
                fetchError ? 
                    <p className='mt-4 italic text-red-500 text-center text-lg'> 
                        Failed to fetch data. Please refresh the page or try again later. 
                    </p> : 
                error && <p className='mt-4 italic text-red-500 text-center text-lg'> { error } </p>
                }
            </Swiper>
        </>}
    </section>
  )
}

export default Recommended