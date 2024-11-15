import React from 'react'
// images
// import BannerImage from '../assets/banner.png'
// page sections
// Page Sections
import News from '../sections/News'
import TopSellers from '../sections/TopSellers'
import NewRelease from '../sections/NewRelease'
import Recommended from '../sections/Recommended'
import GetNow from '../sections/GetNow'

const Home = () => {
  return (
    <main className=''>
      <div className='lg:hidden'>
        <News />
      </div>

      <div className='hidden lg:block'>
        <NewRelease />
      </div>

      <TopSellers />

      <Recommended />

      <GetNow />

      <section className='section-cont mt-10 hidden lg:block'>
        <p className="title">News</p>
        <News />
      </section>
      {/* <section className='section-cont mt-10 hidden lg:flex flex-col'>
        <p className="title">News</p>
        <News />
      </section> */}

    </main>
  )
}

export default Home