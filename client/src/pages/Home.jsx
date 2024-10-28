import React from 'react'
// images
// import BannerImage from '../assets/banner.png'
// page sections
// Page Sections
import News from './sections/News'
import TopSellers from './sections/TopSellers'
import NewRelease from './sections/NewRelease'
import Recommended from './sections/Recommended'
import GetNow from './sections/GetNow'

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
      {/* <section className='new-releases-section'>
        <div className='new-releases-cont'>
          <h1>New Releases This Week</h1>
          <p className="new-releases-par">
          It's time to update your reading list with some of the latest and greatest releases in the literary world. From heart-pumping thrillers to captivating memoirs, this week's new releases offer something for everyone
          </p>
          <button className='subscribe-btn'>Subscribe</button>
        </div>

        <img src={BannerImage} alt="banner" className="cover-img" />
      </section>

      <TopSellers />

      <Recommended />

      <News /> */}
    </main>
  )
}

export default Home