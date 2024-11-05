import React from 'react'

const AddNewBook = () => {
    const options = ['Choose A Catagory', 'Fiction', 'Romance', 'Mystery', 'Horror'];
  return (
    <main className='w-[400px] mx-auto bg-white p-5 rounded'>
        <h1 className='font-semibold text-xl mb-2'>Add New Book</h1>
        <form className='admin-form flex flex-col '>
            <label>Title</label>
            <input
                className='add-book-input' 
                type='text'
                placeholder='Enter book title' 
            />

            <label>Description</label>
            <input
                className='add-book-input' 
                type='text'
                placeholder='Enter Book description' 
            />

            <label>Catagory</label>
            <select className='add-book-select'>
                {
                    options.map((option) => (
                        <option>
                            {option}
                        </option>
                    ))
                }
            </select>
            <div className='mb-2'>
                <input
                    className='add-book-input'
                    type='checkbox'
                    />
                <label className='ml-2'>Trending</label>
            </div>
            
            <label>Old Price</label>
            <input
                className='add-book-input' 
                type='text'
                placeholder='Old Price' 
            />
            
            <label>New Price</label>
            <input
                className='add-book-input' 
                type='text'
                placeholder='New Price' 
            />
            
            <label>Cover Image</label>
            <input 
                className='border-none indent-'
                type='file' 
            />

            <button className='mt-4 bg-green-500 text-white py-1 rounded'> Add Book </button>
        </form>
    </main>
  )
}

export default AddNewBook