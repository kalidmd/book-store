import React from 'react'
import { useParams } from 'react-router-dom'

const SingleBook = () => {
    const param = useParams();
    // console.log(param.id);
  return (
    <div>Book {param.id} </div>
  )
}

export default SingleBook