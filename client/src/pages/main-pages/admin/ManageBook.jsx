import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Swal from 'sweetalert2';

const ManageBook = () => {
      // Use Navigate Hook Defentiotion
  const navigate = useNavigate();
      // Book State Defenition
  const [books, setBooks] = useState([null]);
      // Error Handling States Def
  const [error, setError] = useState(false);
  const [fetchError, setFetchError] = useState(false);
      // API Endpoints
  const localUrl = 'http://localhost:5000/api/v1';

  useEffect(() => {
    getBooks();
  }, [])

  const getBooks = async () => {
    try {
      const { data } = await axios.get(`${localUrl}/books`)
      
      setBooks(data.book);
      setError(false);
      setFetchError(false);

    } catch (error) {
      if (error.response) {
          // Error from Backend 
        setError(error.response.data.msg);
      } else {
          // Axios Error
        setFetchError(error.message);
      }
    }
  }

  const editBook = (id) => {
    navigate(`/dashboard/edit-book/${id}`)
  }

  const deleteBook = async (id) => {
    const token = localStorage.getItem('adminToken');

    try {
      const { data } = await axios.delete(`${localUrl}/books/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      })

      Swal.fire({
          position: "center",
          icon: "success",
          title:  `${data.book.title} has been deleted!`,
          showConfirmButton: false,
          timer: 2000
        });

      setError(false);
      setFetchError(false);

    } catch (error) {
      if (error.response) {
          // Error from Backend
        setError(error.response.data.msg);
      } else {
          // Axios Error
        setFetchError(error.message);
      }
    }

    getBooks();
  }    

  return (
    <div className='bg-white mt-20 p-4 rounded-md'>
      <div className='flex justify-between mb-4'>
        <h1> All Books </h1>
        { books && books.length > 1 && <p className='italic font-medium'> { books.length } Books Found </p> }
        <button> See All </button>
      </div>

      <div>
        <table className='w-full'>
          <thead>
            <tr className='w-full bg-red text-left border-t border-b'>
              <th className='py-4'> # </th>
              <th> BOOK TITLE </th>
              <th> CATEGORY </th>
              <th> PRICE </th>
              <th> ACTIONS </th>
            </tr>
          </thead>

          <tbody>
            {
              books!== null && books.length > 0 && books.map((book, index) => (
                <tr key={book && book._id} className='text-left'>
                  <td className='py-4'> 
                    { book && `${index + 1}.` } 
                  </td>
                  
                  <td> 
                    { book &&  book.title } 
                  </td>
                  
                  <td> 
                    { book && book.category } 
                  </td>
                  
                  <td> 
                    { book && `$${book.newPrice}` } 
                  </td>
                  
                  {
                    book &&
                    <td> 
                      <button 
                        className='hover:text-gray-600'
                        onClick={() => editBook(book._id)}> 
                        Edit 
                      </button>
                      
                      <button 
                        onClick={() => deleteBook(book._id)}
                        className='ml-3 bg-red-500 text-white rounded-xl px-2 hover:bg-red-600'
                      > 
                        Delete 
                      </button>
                    </td>
                  }
                </tr>
                ))
            }
          </tbody>
        </table>
      </div>

      {
          fetchError ? 
          <p className='mt-4 italic text-red-500 text-center text-lg'> 
              { fetchError }
          </p> : 
          error && <p className='mt-4 italic text-red-500 text-center text-lg'> { error } </p>
      }

    </div>
  )
}

export default ManageBook