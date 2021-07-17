import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Col, Image } from 'react-bootstrap'
import { FaSearch } from 'react-icons/fa'

const FeaturedProduct = ({ name, totalPrice, images, category, _id }) => {
  const [productNameXs, setProductNameXs] = useState('')
  const [productNameSm, setProductNameSm] = useState('')
  const [productNameMd, setProductNameMd] = useState('')
  const [productNameLg, setProductNameLg] = useState('')

  name = name ? name : ''
  totalPrice = totalPrice ? totalPrice : 0
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

  const shortenName = () => {
    if (name.length >= 28) {
      setProductNameXs(name.slice(0, 50) + '...')
      setProductNameSm(name.slice(0, 40) + '...')
      setProductNameMd(name.slice(0, 37) + '...')
      setProductNameLg(name.slice(0, 28) + '...')
    } else {
      setProductNameXs(name)
      setProductNameSm(name)
      setProductNameMd(name)
      setProductNameLg(name)
    }
  }
  useEffect(() => {
    shortenName()
    // eslint-disable-next-line
  }, [name])

  return (
    <>
      {name.length > 1 && (
        <Col
          xs={6}
          md={4}
          lg={category === 'Sofas' ? '4' : '3'}
          className='featured-product   my-3 mx-left '
          onClick={backToTop}
        >
          <Link to={`/products/${_id}`} className='product-link'>
            <div className='img-container'>
              <Image src={images[0]} className='product-img ' fluid />
              <h6 className='featured-search-icon'>
                <FaSearch />
              </h6>
            </div>

            <div className='featured-product-name mt-2'>
              <h6 className='d-sm-none'>{productNameXs} </h6>

              <h6 className='d-none d-sm-block d-md-none'>{productNameSm} </h6>
              <h6 className='d-none d-md-block d-lg-none'>{productNameMd} </h6>
              <h6 className='d-none d-lg-block'>
                {category === 'Sofas' ? name : productNameLg}{' '}
              </h6>
            </div>
            <div className='featured-product-price mb-0'>
              <p className='offer-price mb-0 mx-3'>
                ₹ {thousand_separator(totalPrice)}
              </p>
              <p className='real-price mb-0 '>
                ₹ {thousand_separator(oldPrice)}
              </p>
            </div>
          </Link>
        </Col>
      )}
    </>
  )
}

export default FeaturedProduct
