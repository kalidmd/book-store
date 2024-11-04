import React, { useEffect, useState } from 'react'
// images
// import News1 from '../../assets/news/news-1.png';
// import Book1 from '../../assets/books/book-1.png'

const News = () => {
  const [news, setNews] = useState([]);
  console.log(news);

  useEffect(() => {
    const fetchNews = async () => {
      try {
        const res = await fetch('news.json');
        const data = await res.json();
        // console.log(data);
        setNews(data);
      } catch (error) {
        console.log(error);
      }
    }

    fetchNews();
  }, [])

  return (
    <main className='flex items-end gap-10 bg-white overflow-auto ml-[38px] p-3  my-5 lg:my-0 rounded-lg'> 
      { news.map((news) => (
        <>
          <div className=''>
            <p className='sm:text-lg text-sm font-montserrat font-medium'> {news.title} </p>
            <div className='h-0.5 w-10 bg-primary my-5'></div>
            <p className='sm:text-sm text-[12px] w-[300px] font-nunit h-[100px] overflow-hidden'> {news.description} </p>
          </div>

          <img className='sm:w-[120px] w-[108px]' src={news.image} alt={news.title} />
        </>
        ))
      }
    </main>
      
  )
}

export default News