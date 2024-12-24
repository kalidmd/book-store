import React from 'react'

const Loading = () => {
  return (
    <div className={`flex justify-center items-center w-full h-screen `}>
        <div className='animate-spin rounded-full h-8 w-8 md:h-12 md:w-12 border-t-4 border-blue-500 border-solid'> </div>
    </div>
  )
}

export default Loading;
