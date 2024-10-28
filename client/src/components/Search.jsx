import React from 'react'

const Search = ({ setSearch }) => {
  return (
    <input 
        type="text" 
        className='border-0 bg-transparent outline-none bg-lime-200 w-[190px]'
        placeholder='What are you looking for ?'
    />
  )
}

export default Search