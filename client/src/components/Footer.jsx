import React from 'react'
import { NavLink } from 'react-router-dom';
// images
import BookLogo from '../assets/icons/book-shop-logo.png';
// icons
import InstaIcon from '../assets/icons/instagram-icon.png';
import GoogleIcon from '../assets/icons/google-icon.png';
import FacebookIcon from '../assets/icons/facebook-icon.png';

export const Footer = () => {
  return (
    <footer>
      <div className="top-footer">

        <div className="logo-and-links">
          <img src={BookLogo} alt="Book" />
          <div className="footer-top-links">
            <NavLink to={'about'}>About</NavLink>
            <NavLink to={'features'}>Features</NavLink>
            <NavLink to={'pricing'}>Pricing</NavLink>
            <NavLink to={'gallery'}>Gallery</NavLink>
            <NavLink to={'team'}>Team</NavLink>
          </div>
        </div>

        <div className="subscribe-cont">
          <p className="subscribe-text">
            Subscribe to stay tuned for new product and latest updates. Let’s do it!
          </p>
          <div className="email-cont">
            <input 
              type="text"
              placeholder='Enter your email address'
              />
            <button className='subscribe-btn footer-subscribe-btn'>Subscribe</button>
          </div>
        </div>
      </div>
      <hr className='footer-hr'/>

      <div className="bottom-footer">
        <div className="footer-bottom-links">
          <NavLink to={'privacy-policy'}> Privacy Plicy </NavLink>
          <NavLink to={'terms-of-use'}> Terms of Use </NavLink>
          <NavLink to={'sales-and-refunds'}> Sales and Refunds </NavLink>
          <NavLink to={'legal'}> Legal </NavLink>
        </div>

        <div className="social-media-icons">
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
    </footer>
  )
}
