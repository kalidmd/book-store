import React, { useContext, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Swal from 'sweetalert2';
 // React Icons
import { SearchContext } from '../../../context/searchContext';
import { MdDeleteForever } from "react-icons/md";
import Loading from '../../../components/Loading';
import getBaseURL from '../../../utils/baseURL';

const ManageBook = () => {
      // Search Context Usage
  const { search } = useContext(SearchContext);
      // Use Navigate Hook Defentiotion
  const navigate = useNavigate();
      // Book State Defenition
  const [books, setBooks] = useState([]);
      // Error Handling States Def
  const [error, setError] = useState(false);
  const [fetchError, setFetchError] = useState(false);
      // Loading State
  const [loading, setLoading] = useState(false);
      // Collapse State
  const [showAllBooks, setShowAllBooks] = useState(false);
  
  const baseURL = getBaseURL();
  
  const bookFoundText = books.length === 1 ? 'Book Found' : 'Books Found';

  const filteredBooks = showAllBooks ? books && books : books && books.slice(0, 10);
  
  const getBooks = async (search) => {
    const baseURL = getBaseURL();
    try {
      setLoading(true);
      const { data } = await axios.get(`${baseURL}/books?search=${search}`)
      
      setBooks(data.book);
      setError(false);
      setFetchError(false);
      setLoading(false);

    } catch (error) {
      if (error.response) {
          // Error from Backend 
        setError(error.response.data.msg);
      } else {
          // Axios Error
        setFetchError(error.message);
      }
      setLoading(false);
    }
  }

  useEffect(() => {
    getBooks(search);
  }, [search])

  const editBook = (id) => {
    navigate(`/dashboard/edit-book/${id}`)
  }

  const deleteBook = async (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!"
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          const token = localStorage.getItem('adminToken');
          const { data } = await axios.delete(`${baseURL}/books/${id}`, {
            headers: {
              Authorization: `Bearer ${token}`
            }
          })
    
          setError(false);
          setFetchError(false);
         
          Swal.fire({
            position: "center",
              icon: "success",
              title:  `${data.book.title} has been deleted!`,
              showConfirmButton: false,
              timer: 2000
          });
    
        } catch (error) {
          if (error.response) {
              // Error from Backend
            setError(error.response.data.msg);
          } else {
              // Axios Error
            setFetchError(error.message);
          }
        }
    
        getBooks(search);    
        
      }
    });
  }
    

  const handleCollapse = () => {
    setShowAllBooks(!showAllBooks);
  }

  if (loading) {
    return <Loading />
  }

  return (
    <div className='bg-white my-12 p-4 rounded-md text-[10px] sm:text-base'>
      <div className='flex justify-between items-center mb-4'>
        <h1> All Books </h1>
        { books && books.length > 0 && <p className='italic font-medium'> { `${books.length} ${bookFoundText}` } </p> }
        
      </div>

      <div>
        <table className='w-full'>
          <thead>
            <tr className='w-full bg-red text-left border-t border-b text-[10px] sm:text-base'>
              <th className='py-4'> # </th>
              <th> BOOK TITLE </th>
              <th> CATEGORY </th>
              <th> PRICE </th>
              <th> ACTIONS </th>
            </tr>
          </thead>

          <tbody>
            {
              !error && filteredBooks && filteredBooks.length > 0 &&  filteredBooks.map((book, index) => (
                <tr key={book && book._id} className='text-left'>
                  <td className='py-4'> 
                    { book && `${index + 1}.` } 
                  </td>
                  
                  <td> 
                    { book &&  book.title.length > 15 ? `${book.title.slice(0, 15)}...` : book.title } 
                  </td>
                  
                  <td> 
                    { book && book.category } 
                  </td>
                  
                  <td> 
                    { book && `$${book.newPrice}` } 
                  </td>
                  
                  {
                    book &&
                    <td className='flex flex-col sm:flex-row sm:py-4 items-center gap-1'> 
                      <button 
                        className='hover:text-gray-600'
                        onClick={() => editBook(book._id)}> 
                        Edit 
                      </button>
                      
                      <button 
                        onClick={() => deleteBook(book._id)}
                        className='text-white rounded-xl px-2'
                      > 
                        <MdDeleteForever className='text-red-500 size-4 sm:size-5'/>
                        {/* Delete  */}
                      </button>
                    </td>
                  }
                </tr>
                ))
            }
          </tbody>
        </table>
      </div>

      { books && books.length > 11 &&
          <button onClick={handleCollapse} className='bg-blue-700 text-white rounded-md px-2 py-1 hover:bg-blue-600'> 
            { showAllBooks ? 'Show Less' : 'Show All' } 
          </button>
        }

      {
          fetchError ? 
          <p className='mt-4 italic text-red-500 text-center lg:text-lg'> 
              { `${fetchError}, Please try again.` }
          </p> : 
          error && <p className='mt-4 italic text-red-500 text-center lg:text-lg'> { error } </p>
      }

    </div>
  )
}

export default ManageBook