import React from 'react'

const Loading = () => {
  return (
    <div className={`flex justify-center items-center w-full h-screen `}>
        <div className='animate-spin rounded-full h-10 w-10 md:h-12 md:w-12 border-t-2 border-blue-500 border-solid'> </div>
    </div>
  )
}

export default Loading;
