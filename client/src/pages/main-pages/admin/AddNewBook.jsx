import React, { useEffect, useState } from 'react'

const AddNewBook = () => {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [category, setCategory] = useState('');
    const [trending, setTrending] = useState(false);
    // const [imageFile, setImageFile] = useState(null);
    const [coverImage, setCoverImage] = useState(null);
    const [imageFileName, setImageFileName] = useState('');
    const [author, setAuthor] = useState('');
    const [published, setPublished] = useState('');
    const [oldPrice, setOldPrice] = useState('');
    const [newPrice, setNewPrice] = useState('');

    const [error, setError] = useState(false);
    const [fetchError, setFetchError] = useState(false);


    const options = ['Choose A Catagory', 'Fiction', 'Non-fictional', 'Romance', 'Fantasy', 'Horror', 'Business', 'Adventure'];

    useEffect(() => {
        if(coverImage) {
            setImageFileName(coverImage.name);
        }
    }, [coverImage])

    console.log(coverImage);

    const localUrl = 'http://localhost:5000/api/v1';

    const createBook = async (e) => {
        e.preventDefault();

        const formData = new FormData();
        formData.append('title', title);
        formData.append('description', description);
        formData.append('category', category);
        formData.append('trending', trending);
        formData.append('image', coverImage);
        formData.append('author', author);
        formData.append('published', published);
        formData.append('oldPrice', oldPrice);
        formData.append('newPrice', newPrice);

        try {
            const token = localStorage.getItem('adminToken');
            const response = await fetch(`${localUrl}/books`, {
                method: 'post',
                body: formData,
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })
            
            const data = await response.json();
            if(data.msg) {
                setError(data.msg);
            } else {
                console.log(data);
                setError(false);
            }   

        } catch (error) {
            console.error(error);
            setFetchError(error);
        }
    }

  return (
    <main className='w-[400px] mx-auto bg-white p-5 rounded my-10'>
        <h1 className='font-semibold text-xl mb-2'>Add New Book</h1>
        <form onSubmit={createBook} encType='multipart/form-data' className='admin-form flex flex-col '>
            {/* title */}
            <label>Title</label>
            <input
                className='add-book-input' 
                type='text'
                required
                name="title"
                placeholder='Enter book title' 
                value={title}
                onChange={(e) => setTitle(e.target.value)}
            />

            {/* description  */}
            <label>Description</label>
            <input
                className='add-book-input' 
                type='text'
                required
                name='description'
                placeholder='Enter Book description' 
                value={description}
                onChange={(e) => setDescription(e.target.value)}
            />

            {/* category  */}
            <label>Catagory</label>
            <select
                value={category} 
                name='category'
                className='add-book-select'
                onChange={(e) => setCategory(e.target.value)}
            >
                {
                    options.map((option, index) => (
                        <option key={index}>
                            {option}
                        </option>
                    ))
                }
            </select>

            {/* trending */}
            <div className='mb-2'>
                <input
                    className='add-book-input'
                    type='checkbox'
                    name='trending'
                    checked={trending}
                    onChange={() => setTrending(!trending)}
                    />
                <label className='ml-2'>Trending</label>
            </div>
            
            {/* old price  */}
            <label>Old Price</label>
            <input
                className='add-book-input' 
                type='text'
                required
                name='oldPrice'
                placeholder='Old Price' 
                value={oldPrice}
                onChange={(e) => setOldPrice(e.target.value)}
            />
            
            {/* new price  */}
            <label>New Price</label>
            <input
                className='add-book-input' 
                type='text'
                required
                name='newPrice'
                placeholder='New Price' 
                value={newPrice}
                onChange={(e) => setNewPrice(e.target.value)}
            />

            {/* author  */}
            <label>Author</label>
            <input
                className='add-book-input' 
                type='text'
                required
                name='author'
                placeholder='Author' 
                value={author}
                onChange={(e) => setAuthor(e.target.value)}
            />

            {/* published  */}
            <label> Published </label>
            <input
                className='add-book-input' 
                type='text'
                required
                name='published'
                placeholder='Published' 
                value={published}
                onChange={(e) => setPublished(e.target.value)}
            />
            
            {/* cover image  */}
            <div>
                <label>Cover Image</label>
                <input 
                    className='border-none indent-'
                    type='file'
                    required 
                    name='image'
                    onChange={(e) => setCoverImage(e.target.files[0])}
                />
                { imageFileName && 
                <p className='text-sm text-gray-500'>
                    Selected: {imageFileName}
                </p> }
            </div>
            
            {
                fetchError ? 
                <p className='mt-4 italic text-red-500 text-center text-lg'> 
                    Failed to fetch data. Please try again later. 
                </p> : 
                error && <p className='mt-4 italic text-red-500 text-center text-lg'> { error } </p>
            }

            <button type='submit' className='mt-4 bg-green-500 text-white py-1 rounded'> Add Book </button>
        </form>
    </main>
  )
}

export default AddNewBook