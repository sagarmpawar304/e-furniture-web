import React from 'react'
import Rating from './Rating'

const Review = ({ name, comment, rating }) => {
  return (
    <div>
      <div className='user-name d-flex'>
        <h6 className='mb-1'>{name}</h6>
        <h6 className='ml-3 mb-1'>
          <Rating rating={rating} />
        </h6>
      </div>

      <div className='review-comment'>
        <blockquote>{comment}</blockquote>
      </div>
    </div>
  )
}

export default Review
