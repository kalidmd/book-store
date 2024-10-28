import React from 'react'
import Book from '../../components/Book'
import Book1 from '../../assets/books/book-1.png';

const TopSellers = () => {
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
                <Book
                    src={Book1}
                    alt={'book'}
                    bookTitle={'The First Days'}
                    bookDesc={'The House of Berethnet has ruled Inys for a thousand years. Still unwed, Queen Sabran...'}
                    newPrice={'19.99'}
                    oldPrice={'15.89'}
                />
                <Book
                    src={Book1}
                    alt={'book'}
                    bookTitle={'The First Days'}
                    bookDesc={'The House of Berethnet has ruled Inys for a thousand years. Still unwed, Queen Sabran...'}
                    newPrice={'19.99'}
                    oldPrice={'15.89'}
                />
                <Book
                    src={Book1}
                    alt={'book'}
                    bookTitle={'The First Days'}
                    bookDesc={'The House of Berethnet has ruled Inys for a thousand years. Still unwed, Queen Sabran...'}
                    newPrice={'19.99'}
                    oldPrice={'15.89'}
                />
                <Book
                    src={Book1}
                    alt={'book'}
                    bookTitle={'The First Days'}
                    bookDesc={'The House of Berethnet has ruled Inys for a thousand years. Still unwed, Queen Sabran...'}
                    newPrice={'19.99'}
                    oldPrice={'15.89'}
                />
            </div>
        </section>
    )
}

export default TopSellers