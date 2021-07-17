import React from 'react'
import { RiStarFill, RiStarHalfFill, RiStarLine } from 'react-icons/ri'

const Rating = ({ rating }) => {
  return (
    <article>
      <div className='d-flex'>
        {/* single star */}
        <div className='single-star'>
          {rating >= 1 ? (
            <RiStarFill />
          ) : rating >= 0.5 ? (
            <RiStarHalfFill />
          ) : (
            <RiStarLine />
          )}
        </div>
        {/* end of single star */}

        {/* single star */}
        <div className='single-star'>
          {rating >= 2 ? (
            <RiStarFill />
          ) : rating >= 1.5 ? (
            <RiStarHalfFill />
          ) : (
            <RiStarLine />
          )}
        </div>
        {/* end of single star */}

        {/* single star */}
        <div className='single-star'>
          {rating >= 3 ? (
            <RiStarFill />
          ) : rating >= 2.5 ? (
            <RiStarHalfFill />
          ) : (
            <RiStarLine />
          )}
        </div>
        {/* end of single star */}

        {/* single star */}
        <div className='single-star'>
          {rating >= 4 ? (
            <RiStarFill />
          ) : rating >= 3.5 ? (
            <RiStarHalfFill />
          ) : (
            <RiStarLine />
          )}
        </div>
        {/* end of single star */}

        {/* single star */}
        <div className='single-star'>
          {rating >= 5 ? (
            <RiStarFill />
          ) : rating >= 4.5 ? (
            <RiStarHalfFill />
          ) : (
            <RiStarLine />
          )}
        </div>
        {/* end of single star */}
      </div>
    </article>
  )
}

export default Rating
