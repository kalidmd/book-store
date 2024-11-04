import React from 'react'

const Search = ({ setSearch, placeholder }) => {
  return (
    <input 
        type="text" 
        className='border-0 bg-transparent outline-none bg-lime-200 w-[190px]'
        placeholder={placeholder}
    />
  )
}

export default Search