import React from 'react'

const Pagination = ({ page, total, limit, setPage }) => {
    const totalPages = (limit > 0) && Math.ceil(total / limit);

    const handlePagination = (curentIndex) => {
        setPage(curentIndex + 1)
    }

   return (
    <div className='pagination mt-[30px] mx-auto w-fit z-50;'>
        {totalPages > 0 && [...Array(totalPages)].map((item, index) => (
            <button
                key={index}
                className={ 
                    page === index + 1 ? 
                    'pagination-btn active py-1 px-3 mr-3 rounded-md bg-adminHomeBg text-[#e0e0ea] cursor-default border-none' : 
                    'pagination-btn bg-[#e0e0ea] py-1 px-3 text-adminHomeBg text-base font-semibold rounded-md cursor-pointer mr-3 border-none' }
                onClick={() => handlePagination(index)}
            >
                { index + 1 }
            </button>
        ))}
    </div>
   )
}

export default Pagination