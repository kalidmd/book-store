import React, { useEffect, useState } from 'react'
import Book from '../../components/Book'
// import Book4 from '../../assets/books/book-4.png'

// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';
// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
// import required modules
import { Navigation, Pagination } from 'swiper/modules'

const Recommended = () => {
    const [books, setBooks] = useState(undefined);

    useEffect(() => {
        const fetchBooks = async () => {
            try {
                const res = await fetch('books.json');
                const data = await res.json();
                setBooks(data.reverse());
            } catch (error) {
                console.log(error);
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

        {/* <div className="books">
            <Book 
                src={Book4}
                alt={'Pride and Protest'}
                bookTitle={'Pride and Protest'}
                bookDesc={'A woman goes head-to-head with the CEO of...'}
                newPrice={'15.50'}
                oldPrice={'18.50'}
            />
            <Book 
                src={Book4}
                alt={'Pride and Protest'}
                bookTitle={'Pride and Protest'}
                bookDesc={'A woman goes head-to-head with the CEO of...'}
                newPrice={'15.50'}
                oldPrice={'18.50'}
            />
            <Book 
                src={Book4}
                alt={'Pride and Protest'}
                bookTitle={'Pride and Protest'}
                bookDesc={'A woman goes head-to-head with the CEO of...'}
                newPrice={'15.50'}
                oldPrice={'18.50'}
            />
            <Book 
                src={Book4}
                alt={'Pride and Protest'}
                bookTitle={'Pride and Protest'}
                bookDesc={'A woman goes head-to-head with the CEO of...'}
                newPrice={'15.50'}
                oldPrice={'18.50'}
            />
        </div> */}
    </section>
  )
}

export default Recommended