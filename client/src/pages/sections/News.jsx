import React from 'react'
// images
// import News1 from '../../assets/news/news-1.png';
import Book1 from '../../assets/books/book-1.png'
const News = () => {
  return (
    <section className='sm:justify-around bg-white flex p-3 gap-8 overflow-hidden my-5 ml-6
    rounded-lg md:gap-0'>
      <div className=''>
        <p className='sm:text-lg text-sm font-montserrat font-medium'> The Best Dark Academia Books </p>
        <div className='h-0.5 w-10 bg-primary my-5'></div>
        <p className='sm:text-sm text-[12px] w-[300px] font-nunito'>Abounding in sinister secrets - sometimes magical, sometimes not - locked in the libraries and halls of mysterious educational institutions, dark academia has become a phenomenally successful literary genre...</p>
      </div>

      <img className='sm:w-[120px] w-[108px]' src={Book1} alt="Book" />
    </section>
  )
}

export default News