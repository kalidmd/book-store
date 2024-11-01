import React from 'react'
import CoverImg from '../../assets/banner.png'
const NewRelease = () => {
  return (
    <section className='w-large 2xl:w-xLarge mx-auto my-[76px] font-montserrat flex items-center justify-between'>
        <div>
            <h1 className='lg:text-[32px] font-medium mb-[30px] xl:text-[40px]'>New Releases This Week</h1>
            <p className='mb-10 w-[453px]'>
            It's time to update your reading list with some of the latest and greatest releases in the literary world. From heart-pumping thrillers to captivating memoirs, this week's new releases offer something for everyone
            </p>
            <button className='bg-primary py-[7px] px-[49px] rounded-lg text-white'>Subscribe</button>
        </div>
        <img className='w-[486px]' src={CoverImg} alt="banner" />
    </section>
  )
}

export default NewRelease