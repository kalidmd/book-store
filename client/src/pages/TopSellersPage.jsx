import React from 'react'
import Book from '../components/Book'
import Book1 from '../assets/books/book-1.png';

const TopSellersPage = () => {
    const selectOptions = ['Choose a genre', 'Fiction', 'Romance', 'Mystery', 'Horror'] 

    return (
    <section className='top-sellers-section'>
        <p className='top-sellers-title'>Top Sellers</p>
        <div className="select-cont">
            <select className='top-sellers-select'>
                {selectOptions.map((option, index) => (
                    <option value={index} key={index}>
                        {option}
                    </option>
                ))}
            </select>
        </div>

        <div className="top-selling-books">
           <Book 
            src={Book1}
            alt={'The Time Has Come'}
            bookTitle={'The Time Has Come'}
            bookDesc={'Lindbergh\'s Pharmacy is an Athens, Georgia, institution...'}
            newPrice={'$ 27.89'}
            oldPrice={'$ 30.99'}
           />
        </div>
        </section>
    )
}

export default TopSellersPage