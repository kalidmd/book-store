import React from 'react'
import BannerImage from '../assets/banner.png'
import TopSellersPage from './TopSellersPage'

const Home = () => {
  return (
    <main className='home-main'>
      <section className='new-releases-section'>
        <div className='new-releases-cont'>
          <h1>New Releases This Week</h1>
          <p className="new-releases-par">
          It's time to update your reading list with some of the latest and greatest releases in the literary world. From heart-pumping thrillers to captivating memoirs, this week's new releases offer something for everyone
          </p>
          <button>Subscribe</button>
        </div>

        <img src={BannerImage} alt="banner" className="cover-img" />
      </section>

      <TopSellersPage />
    </main>
  )
}

export default Home