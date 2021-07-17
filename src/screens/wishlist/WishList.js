import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Col, Row, Alert, Image, Button } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import { FaTrash } from 'react-icons/fa'
import {ToastContainer} from 'react-toastify'

import { addItemToCart } from '../../actions/cartActions'
import { removeItemFromWishList } from '../../actions/wishListActions'
import Navbar from '../../components/Navbar'
import {onSuccess,onDelete} from '../../components/toast'

const Cart = () => {
  const wishList = useSelector((state) => state.wishList)
  const { wishListItems } = wishList

  const dispatch = useDispatch()

  const thousand_separator = (num) => {
    if (num !== undefined) {
      let price = num.toString()
      price = price.replace(/\B(?=(\d{3})+(?!\d))/g, ',')
      return price
    }
  }

  return (
    <>
      <ToastContainer/>
      <Navbar />
      <section id='wishList' className='wishList-section my-4'>
        <div className='container-lg'>
          <Row>
            {/* title */}
            <Col xs='12'>
              <h2 className='text-uppercase'>WishList</h2>
            </Col>
            {/* end of title */}
          </Row>

          {/* alert */}
          <Row className='justify-content-left'>
            <Col xs='10' md='6' className='my-3  '>
              {wishListItems.length === 0 && (
                <Alert variant='info'>
                  <h6 className=' mb-0'>You don't have any wish list items.</h6>
                </Alert>
              )}
            </Col>
          </Row>
          {/* end of alert */}

          {/* wish list items */}
          <Row>
            <Col xs='10' md='12' className='mx-auto align-items-center'>
              <>
                {wishListItems.length > 0 &&
                  wishListItems.map((item) => {
                    const { productId, name, images, price } = item
                    return (
                      <div key={productId}>
                        <Row className='align-items-center'>
                          {/* product image */}
                          <Col xs='5' md='2' className='mb-4 mb-md-0'>
                            <Link to={`/products/${productId}`}>
                              <Image src={images && images[0]} fluid />
                            </Link>
                          </Col>
                          {/* end of product image */}

                          <Col xs='7' md='10'>
                            <Row className='align-items-center'>
                              {/* product name */}
                              <Col xs='8' sm='6'>
                                <Link to={`/products/${productId}`}>
                                  <h6 className='cart-product-name text-left text-dark'>
                                    {name}
                                  </h6>
                                </Link>
                              </Col>
                              {/* end of product name */}

                              {/* product price */}
                              <Col xs='4' sm='2'>
                                <h6 className='cart-product-price'>
                                  ₹{thousand_separator(price)}
                                </h6>
                              </Col>
                              {/* end of product price */}

                              {/* add to cart */}
                              <Col xs='10' sm='3'>
                                <Button
                                  type='button'
                                  variant='success'
                                  onClick={() => {
                                    onSuccess('Added to cart')
                                    dispatch(addItemToCart(productId, 1))
                                  }}
                                >
                                  Add To Cart
                                </Button>
                              </Col>
                              {/* end of add to cart */}

                              {/* delete btn */}
                              <Col xs='2' sm='1' className='px-0'>
                                <h5 className='delete-btn mx-auto'>
                                  <FaTrash
                                    onClick={() =>{
                                      onDelete('Removed from wishlist')
                                      dispatch(
                                        removeItemFromWishList(productId)
                                      )
                                    }}
                                  />
                                </h5>
                              </Col>

                              {/* delete btn */}
                            </Row>
                          </Col>
                        </Row>
                        <hr />
                      </div>
                    )
                  })}
              </>
            </Col>
          </Row>
          {/* end of wishList items */}
        </div>
      </section>
    </>
  )
}

export default Cart
