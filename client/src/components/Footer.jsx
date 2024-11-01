import React from 'react'
import { NavLink } from 'react-router-dom';
// images
import BookLogo from '../assets/icons/book-shop-logo.png';
// icons
import InstaIcon from '../assets/icons/instagram-icon.png';
import GoogleIcon from '../assets/icons/google-icon.png';
import FacebookIcon from '../assets/icons/facebook-icon.png';
import InstaIconWhite from '../assets/icons/instagram-icon-white.png';
import GoogleIconWhite from '../assets/icons/google-icon-white.png';
import FacebookIconWhite from '../assets/icons/facebook-icon-white.png';

export const Footer = () => {
  return (
    <footer className=''>
      {/* footer for small and medium screen */}
      <main className='
        bg-gradient-to-l from-[#FEAF38] to-[#FFCE1A] 
        font-nunito
        flex 
        flex-col 
        items-center 
        py-5
        lg:hidden
        '
      >
        <div className='flex flex-col gap-[14px] text-center text-[16px] text-white mb-5'>
          <NavLink to='contact'>Contact</NavLink>
          <NavLink to='terms-of-use'>Terms of Use</NavLink>
          <NavLink to='privacy-policy'>Privacy Policy</NavLink>
          <NavLink to='faq'>FAQ</NavLink>
        </div>

        <div className='flex gap-[50px]'>
          <a target='_blank' rel='noreferrer noopener' href="https://instagram.com">
            <img src={InstaIconWhite} alt="instagram" />
          </a>
          <a target='_blank' rel='noreferrer noopener' href="https://google.com">
            <img src={GoogleIconWhite} alt="instagram" />
          </a>
          <a target='_blank' rel='noreferrer noopener' href="https://facebook.com">
            <img src={FacebookIconWhite} alt="instagram" />
          </a>
        </div>
      </main>
      {/* footer for larger screens */}
      <main className='font-nunito w-large 2xl:w-xLarge mx-auto mt-[170px] mb-5 hidden lg:flex flex-col'>
        <div className="flex items-end justify-between mb-[161px] ">
          <div className="">
            <img src={BookLogo} alt="Book" />
            <div className="mt-10 flex gap-10">
              <NavLink to={'about'}>About</NavLink>
              <NavLink to={'features'}>Features</NavLink>
              <NavLink to={'pricing'}>Pricing</NavLink>
              <NavLink to={'gallery'}>Gallery</NavLink>
              <NavLink to={'team'}>Team</NavLink>
            </div>
          </div>

          <div className="subscribe-cont w-[454px]">
            <p className="subscribe-text mb-[38px]">
              Subscribe to stay tuned for new product and latest updates. Let’s do it!
            </p>
            <div className="flex justify-between border border-primary rounded">
              <input 
                className='w-[283px] indent-4'
                type="text"
                placeholder='Enter your email address'
                />
              <button className='bg-primary py-[7px] px-[49px] text-white w-[171px]'>Subscribe</button>
            </div>
          </div>
        </div>
        
        <hr className='footer-hr'/>

        <div className="flex justify-between mt-[22px] ">
          <div className="flex gap-[46px] ">
            <NavLink to={'privacy-policy'}> Privacy Plicy </NavLink>
            <NavLink to={'terms-of-use'}> Terms of Use </NavLink>
            <NavLink to={'sales-and-refunds'}> Sales and Refunds </NavLink>
            <NavLink to={'legal'}> Legal </NavLink>
          </div>

          <div className="flex gap-[50px]">
            <NavLink 
              to={'https://www.instagram.com/'}
              target='_blank'
              > 
              <img src={InstaIcon} alt="instagram" />
            </NavLink>
            <NavLink 
              to={'https://www.google.com/'}
              target='_blank'
              >
              <img src={GoogleIcon} alt="google" />
            </NavLink>
            <NavLink 
              to={'https://www.facebook.com/'}
              target='_blank'
              >
              <img src={FacebookIcon} alt="facebook" />
            </NavLink>
          
          </div>
        </div>
      </main>
    </footer>
  )
}
