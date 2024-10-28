import React from 'react'
import Book from '../../components/Book'
import Book4 from '../../assets/books/book-4.png'

const Recommended = () => {
  return (
    <section className='section-cont mt-10'>
        <p className="title">Recommended for you</p>
        <div className="books">
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
        </div>
    </section>
  )
}

export default Recommended