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
import { CartContext } from '../../context/CartContext';
// Components
// import AddToCart from '../../components/AddToCart';


const TopSellers = () => {
    const {AddToCart} = useContext(CartContext);
    const [books, setBooks] = useState([]);
    const categories = ['Choose a genre', 'Fiction', 'Romance', 'Mystery', 'Horror', 'Business', 'Adventure', 'Marketing'];
    const [selectedCategory, setSelectedCategory] = useState('Choose a genre');

    const filterdBooks = selectedCategory === 'Choose a genre' ? books: books.filter(book => book.category === selectedCategory.toLowerCase());


    const handleCart = (bookId) => {
        AddToCart(books, bookId);
    }

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
                        filterdBooks.length > 0 ? 
                            filterdBooks.map((book) => (
                                <SwiperSlide key={book._id} >
                                    <Book 
                                        src={book.coverImage}
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
                            <p className='py-10 text-sm md:text-2xl'> {`No Book Found Under ${selectedCategory} Category For Now. Try Again Next Time.`} </p>
                    }
                </>
            </Swiper>
        </section>
    )
}

export default TopSellers