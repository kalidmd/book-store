import React from 'react'

const Search = ({ setSearch }) => {
  return (
    <input 
        type="text" 
        className='search'
        placeholder='What are you looking for ?'
    />
  )
}

export default Search