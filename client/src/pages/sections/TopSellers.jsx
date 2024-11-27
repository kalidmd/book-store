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
    const [error, setError] = useState(null);
    const categories = ['Choose a genre', 'Fiction', 'Romance', 'Fantasy', 'Horror', 'Business', 'Adventure'];
    const [selectedCategory, setSelectedCategory] = useState('Choose a genre');

    const filterdBooks = selectedCategory === 'Choose a genre' ? books: books.filter(book => book.category === selectedCategory.toLowerCase());

    // api url
    const localUrl = 'http://localhost:5000/api/v1';
    // const productionUrl =

    const handleCart = (bookId) => {
        AddToCart(books, bookId);
    }

    useEffect(() => {
        const fetchBooks = async () => {
            try {
                const response = await fetch(`${localUrl}/books`)
                const data = await response.json();
                // console.log(data);
                setBooks(data.book);

            } catch(error) {
                console.log(error);
                setError(error);
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
                        filterdBooks && filterdBooks.length > 0 ? 
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
                            <p className='py-10 text-sm md:text-2xl'> {`Cant't Find Books, Please Try Again Later.`} </p>
                    }
                </>
            </Swiper>
            {error && <p className='italic text-red-300 text-sm'> {error} </p>}
        </section>
    )
}

export default TopSellers