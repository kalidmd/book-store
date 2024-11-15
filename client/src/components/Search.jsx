import React from 'react'

const Search = ({ setSearch, placeholder }) => {
  return (
    <input 
        type="text" 
        className='border-0 bg-transparent outline-none xxs:w-[90px] xs:w-[220px]'
        placeholder={placeholder}
    />
  )
}

export default Search