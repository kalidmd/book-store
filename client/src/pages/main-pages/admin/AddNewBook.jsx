import React, { useState } from 'react'
import Swal from 'sweetalert2';
import axios from 'axios'

const AddNewBook = () => {
        // states
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [category, setCategory] = useState('');
    const [trending, setTrending] = useState(false);
    const [coverImage, setCoverImage] = useState('');
    const [imageFileName, setImageFileName] = useState('');
    const [author, setAuthor] = useState('');
    const [published, setPublished] = useState('');
    const [oldPrice, setOldPrice] = useState('');
    const [newPrice, setNewPrice] = useState('');
        // error handling states
    const [error, setError] = useState(false);
    const [fetchError, setFetchError] = useState(false);
        // loading state
    const [isLoading, setIsLoading] = useState(false);
        // select option
    const options = ['Choose A Catagory', 'Fiction', 'Non-fictional', 'Romance', 'Fantasy', 'Horror', 'Business', 'Adventure'];

    // const navigate = useNavigate();

    const localUrl = 'http://localhost:5000/api/v1';
    
    // console.log(coverImage);

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        setImageFileName(file?.name);
        setFileToBase(file);
    }
    
    const setFileToBase = (file) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onloadend = () => {
            setCoverImage(reader.result);
        }
    }

    const createBook = async (e) => {
        e.preventDefault();

        try {
            setIsLoading(true);
            const token = localStorage.getItem('adminToken');

            const { data } = await axios.post(`${localUrl}/books`, { 
                title, description, category, trending, coverImage, author, published, oldPrice, newPrice 
            }, 
            {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });

            setError(false);
            console.log(data);
            Swal.fire({
                position: "center",
                icon: "success",
                title: "Book has been created!",
                showConfirmButton: false,
                timer: 1500
                });
            setTitle('');
            setDescription('');
            setCategory('');
            setTrending(false);
            setOldPrice('');
            setNewPrice('');
            setAuthor('');
            setPublished('');
            setCoverImage(null);
            setImageFileName('');
            setIsLoading(false);
            
        } catch (error) {
            setIsLoading(false);
            if(error.response) {
                setError(error.response.data.msg)
            } else {
                setFetchError(error.message);
            }

        }
    }
    // xxs:w-[240px] xs:w-[280px]

  return (
    <main>
        <section className='bg-white w-[280px] sm:w-[400px] mx-auto p-5 rounded my-10'>
            <h1 className='font-semibold text-base sm:text-xl mb-2'>Add New Book</h1>

            <form onSubmit={createBook} className='admin-form flex flex-col text-xs sm:text-base'>
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
                <div className='mb-2 w-fit cursor-pointer select-none' onClick={() => setTrending(!trending)}>
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
                        className='border-none'
                        type='file'
                        required 
                        name='coverImage'
                        onChange={handleImageChange}
                    />
                    { imageFileName && 
                    <p className='text-sm text-gray-500 mt-2'>
                        Selected: {imageFileName}
                    </p> }
                </div>
                
                {
                    fetchError ? 
                    <p className='mt-4 italic text-red-500 text-center text-lg'> 
                        {/* Failed to fetch data. Please try again later.  */}
                        {fetchError}
                    </p> : 
                    error && <p className='mt-4 italic text-red-500 text-center text-lg'> { error } </p>
                }

                <button className='mt-4 bg-green-500 text-white py-1 rounded'> 
                    {
                        isLoading ? 'Adding Book...' : 'Add Book'
                    } 
                </button>
            </form>
        </section>
    </main>
  )
}

export default AddNewBook