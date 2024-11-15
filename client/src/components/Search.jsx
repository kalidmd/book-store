import React from 'react'

const Search = ({ setSearch, placeholder }) => {
  return (
    <input 
        type="text" 
        className='border-0 bg-transparent outline-none bg-lime-200 min-w-[210px]'
        placeholder={placeholder}
    />
  )
}

export default Search