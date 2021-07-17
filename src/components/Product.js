import React, { useEffect, useState } from 'react'
import { Image, Col, Spinner } from 'react-bootstrap'
import { Link } from 'react-router-dom'

const Product = ({ _id, images, name, totalPrice }) => {
  const [showLoader, setShowLoader] = useState(true)
  const oldPrice = (totalPrice * 1.1).toFixed(0)
  const thousand_separator = (num) => {
    let price = num.toString()
    price = price.replace(/\B(?=(\d{3})+(?!\d))/g, ',')
    return price
  }

  const backToTop = () => {
    document.body.scrollTop = 0 // For Safari
    document.documentElement.scrollTop = 0 // For Chrome, Firefox, IE and Opera
  }

  useEffect(() => {
    const loader = setTimeout(() => {
      setShowLoader(false)
    }, 100)
    return () => clearTimeout(loader)
  }, [showLoader])

  return (
    <Col
      xs='12'
      md='6'
      lg='4'
      className='my-3 p-3  bg-white product'
      onClick={backToTop}
    >
      <Link to={`/products/${_id}`} className='product-link'>
        <div className='img-container'>
          {showLoader ? (
            <div className='d-flex justify-content-center'>
              <Spinner variant='info' animation='border' />
            </div>
          ) : (
            <>
              <Image src={images[0]} fluid className='product-img' />
              <p className='add-to-cart-tag'>Add To Cart</p>
            </>
          )}
        </div>

        <h5 className='my-3 product-info-text'>{name}</h5>
      </Link>
      <div className='d-flex align-items-center product-info-price'>
        <h5 className='offer-price  mr-2 '>
          ₹ {thousand_separator(totalPrice)}
        </h5>
        <h5 className='real-price '>₹ {thousand_separator(oldPrice)}</h5>
      </div>
    </Col>
  )
}

export default Product
