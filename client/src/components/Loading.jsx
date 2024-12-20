import React from 'react'

const Loading = ({ fullScreen, marginTop }) => {
  return (
    <div className={`flex justify-center items-center w-full ${fullScreen ? 'h-screen': 'mt-[140px]'}`}>
        <div className='animate-spin rounded-full h-12 w-12 border-t-4 border-blue-500 border-solid'> </div>
    </div>
  )
}

export default Loading;
