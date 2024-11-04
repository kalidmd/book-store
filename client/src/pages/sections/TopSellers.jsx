import React, { useEffect, useState } from 'react'
import Book from '../../components/Book'

const TopSellers = () => {
    const [books, setBooks] = useState([]);
    // console.log(books);

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
            <div className='books'>
                {
                    books.map((book) => (
                        <Book 
                            key={book._id}
                            src={book.coverImage}
                            alt={book.title}
                            bookTitle={book.title}
                            bookDesc={book.description}
                            newPrice={book.newPrice}
                            oldPrice={book.oldPrice}
                        />
                    ))
                }
            </div>
        </section>
    )
}

export default TopSellers