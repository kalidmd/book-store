import React, { useEffect, useState } from 'react'
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


const TopSellers = () => {
    const [books, setBooks] = useState([]);


    useEffect(() => {
        const fetchBooks = async () => {
            try {
                const res = await fetch('books.json')
                const data = await res.json();
                // console.log(data);
                setBooks(data)
            } catch (error) {
                console.log(error);
            }
        }
        fetchBooks();
    }, [])

    const selectOptions = ['Choose a genre', 'Fiction', 'Romance', 'Mystery', 'Horror'] 

    return (
        <section className='section-cont'>
            <h1 className='title'>Top Sellers</h1>
            <select className='select'>
                {
                    selectOptions.map((item,index) => (
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
                {
                   books && books.map((book) => (
                            <SwiperSlide className='' >
                                <Book 
                                    src={book.coverImage}
                                    alt={book.title}
                                    bookID={book._id}
                                    bookTitle={book.title}
                                    bookDesc={book.description}
                                    newPrice={book.newPrice}
                                    oldPrice={book.oldPrice}
                                />
                            </SwiperSlide>
                    ))
                }
            </Swiper>
        </section>
    )
}

export default TopSellers