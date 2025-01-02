import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import Loading from '../../../components/Loading';
import ScaleLoader from 'react-spinners/ScaleLoader';
import getBaseURL from '../../../utils/baseURL';

const UpdateBook = () => {
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
        // loading states
    const [isLoading, setIsLoading] = useState(false);
    const [getBookLoading, setGetBookLoading] = useState(false);
        // select option
    const options = ['Choose A Catagory', 'Fiction', 'Non-fictional', 'Romance', 'Fantasy', 'Horror', 'Business', 'Adventure'];

    const navigate = useNavigate();
    const params = useParams();
    const baseURL = getBaseURL();
    
    
    useEffect(() => {
        const getSingleBook = async () => {
            try {
                setGetBookLoading(true);
                const { data } = await axios.get(`${baseURL}/books/${params.id}`)

                setTitle(data.book.title);
                setDescription(data.book.description);
                setCategory(data.book.category);
                setTrending(data.book.trending);
                setAuthor(data.book.author);
                setPublished(data.book.published);
                setCoverImage(data.book.coverImage);
                setOldPrice(data.book.oldPrice);
                setNewPrice(data.book.newPrice);

                setGetBookLoading(false);

                
            } catch (error) {
                if(error.response) {
                    setError(error.response.data.msg);
                } else {
                    setFetchError(error.message);
                }
                setGetBookLoading(false);
            }
        }

        getSingleBook();

    }, [params, baseURL])


    const handleImageChange = (e) => {
        const file = e.target.files[0];
        setImageFileName(file.name);
        setFileToBase(file);
    }
    
    const setFileToBase = (file) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onloadend = () => {
            setCoverImage(reader.result);
        }
    }

    const updateBook = async (e) => {
        e.preventDefault();

        try {
            setIsLoading(true);
            const token = localStorage.getItem('adminToken');

            await axios.put(`${baseURL}/books/${params.id}`, { 
                title, description, category, trending, coverImage, author, published, oldPrice, newPrice 
            }, 
            {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });

            Swal.fire({
                position: "center",
                icon: "success",
                title: "Book has been updated!",
                showConfirmButton: false,
                timer: 1500
                });
            setError(false);
            setFetchError(false);
            setIsLoading(false);
            navigate('/dashboard/manage-books')

            
        } catch (error) {
            if(error.response) {
                setError(error.response.data.msg)
            } else {
                setFetchError(error.message);
            }
            setIsLoading(false);
        }
    }

  if (getBookLoading) {
    return <Loading />
  }

  return (
    <main className='w-[280px] sm:w-[400px] mx-auto bg-white p-5 rounded my-10'>
        <h1 className='font-semibold text-xl mb-2'>Update Book</h1>

        <form onSubmit={updateBook} className='admin-form flex flex-col '>
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
                <p className='text-sm text-gray-500'>
                    Selected: {imageFileName}
                </p> }
            </div>
            
            {
                fetchError ? 
                <p className='mt-4 italic text-red-500 text-center lg:text-lg'> 
                    { `${fetchError}, Please try again.` }
                </p> : 
                error && <p className='mt-4 italic text-red-500 text-center lg:text-lg'> { error } </p>
            }

            <button className='mt-4 min-h-10 bg-green-500 text-white py-1 rounded'> 
                {isLoading ? 
                    <ScaleLoader
                        color='#FFFFFF' 
                        height={20}
                        width={3}
                    />:
                    'Update Book'
                } 
            </button>
        </form>
    </main>
  )
}

export default UpdateBook;