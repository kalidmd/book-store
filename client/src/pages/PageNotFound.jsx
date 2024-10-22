import React from 'react'
// images
import Books from '../assets/404-page-books.png'
// import Books from '../assets/page-not-found-books.png'
import { NavLink } from 'react-router-dom'

const PageNotFound = () => {
  return (
    <main className='page-not-found'>
      <div className="page-not-found-books">
        <img src={Books} alt="Books" />
        <img src={Books} alt="Books" />
        <img src={Books} alt="Books" />
      </div>
      <p className='four-o-four'> 404 </p>
      <p className='page-not-found-looks-like'> Looks like you've got lost... </p>
      <p className='page-not-found-the-page'> The page you're looking for doesn't exist or has been moved. </p>
      <NavLink to={'/'}> Go Home </NavLink>
    </main>
  )
}

export default PageNotFound