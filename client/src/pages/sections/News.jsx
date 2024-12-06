import React, { useEffect, useState } from 'react'
// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';
// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
// import required modules
import { Navigation, Pagination } from 'swiper/modules'

const News = () => {
  const [news, setNews] = useState([]);
  const [error, setError] = useState(false);

  useEffect(() => {
    const fetchNews = async () => {
      try {
        const res = await fetch('news.json');
        const data = await res.json();
      
        setNews(data);
        setError(false);
      } catch (error) {
        console.log(error);
        setError(error);
      }
    }

    fetchNews();
  }, [])

  return (
    <Swiper
      slidesPerView={1}
      spaceBetween={200}
      pagination={{
          dynamicBullets: true,
          clickable: true
      }}
      // navigation={true}
      breakpoints={{
          640: {
              slidesPerView: 1,
              spaceBetween: 200,
          },
          768: {
              slidesPerView: 2,
              spaceBetween: 300,
          },
          1024: {
              slidesPerView: 2,
              spaceBetween: 300,
          },
          1180: {
              slidesPerView: 3,
              spaceBetween: 400,
          }
        }}
      modules={[Pagination, Navigation]}
      className="mySwiper bg-white ml-[38px] p-3 my-5 lg:my-0 rounded-lg select-none"
    >
      { news.map((news) => (   
        <SwiperSlide key={news._id} className='' >     
          <div className='flex items-end gap-3'>
            <div>
              <p className='sm:text-lg text-sm font-montserrat font-medium'> { news.title} </p>
              <div className='h-0.5 w-10 bg-primary my-5'></div>
              <p className='sm:text-sm text-[12px] w-[300px] font-nunito'> {news.description.length > 160 ? `${news.description.slice(0, 160)}...` : news.description} </p>
            </div>

            <img className='min-w-fit' src={news.image} alt={news.title} />
          </div>
        </SwiperSlide>
        ))
      }

      {  error && 
            <p className='mt-4 text-sm italic text-red-500'> {error} </p>
      }
  </Swiper>
      
  )
}

export default News