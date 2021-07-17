import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Col, Row, Alert, Image, Form, Button } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import { FaTrash } from 'react-icons/fa'
import Navbar from '../../components/Navbar'
import {ToastContainer} from 'react-toastify'
import {onDelete} from '../../components/toast'

import { addItemToCart, removeItemFromCart } from '../../actions/cartActions'
const CartScreen = ({ history }) => {
  const cart = useSelector((state) => state.cart)
  const { cartItems } = cart

  const dispatch = useDispatch()

  cart.itemsPrice =
    cartItems.length > 0
      ? cartItems.reduce((acc, item) => {
          const prices = item.qty * item.price

          return prices
        }, 0)
      : 0

  cart.shippingPrice =
    cart.itemsPrice > 10000 ? 0 : cartItems.length === 0 ? 0 : 1000

  cart.totalPrice = cart.itemsPrice + cart.shippingPrice

  const thousand_separator = (num) => {
    if (num !== undefined) {
      let price = num.toString()
      price = price.replace(/\B(?=(\d{3})+(?!\d))/g, ',')
      return price
    }
  }
  const checkOutHandler = () => {
    history.push(`/login?redirect=shipping`)
  }

  return (
    <>
      <ToastContainer />
      <Navbar />
      <section id='cart' className='cart-section my-4'>
        <div className='container-lg'>
          <Row>
            {/* title */}
            <Col xs='12'>
              <h2 className='text-uppercase'>Shopping Cart</h2>
            </Col>
            {/* end of title */}
          </Row>

          {/* alert */}
          <Row>
            <Col xs='6' className='my-3 '>
              {cartItems.length === 0 && (
                <Alert variant='info'>
                  <h6 className='text-capitalize mb-0'>
                    your cart is empty{' '}
                    <span>
                      <Link to='/' className='text-decoration-none ml-2'>
                        go back
                      </Link>
                    </span>
                  </h6>
                </Alert>
              )}
            </Col>
          </Row>
          {/* end of alert */}

          {/* cart items */}
          <Row className='mb-5'>
            <Col xs='11' md='8' className='mx-auto align-items-center'>
              <>
                {cartItems.length > 0 &&
                  cartItems.map((item) => {
                    const { productId, name, images, price, qty } = item
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

                              {/* product qty */}
                              <Col xs='10' sm='3'>
                                <Form inline='true'>
                                  <Form.Group className='mb-0 d-flex justify-content-center'>
                                    <Form.Label className='mr-2 d-flex'>
                                      <strong className='mr-1'>qty</strong> :{' '}
                                    </Form.Label>
                                    <Form.Control
                                      as='select'
                                      value={qty}
                                      className='inline-block'
                                      onChange={(e) =>
                                        dispatch(
                                          addItemToCart(
                                            productId,
                                            e.target.value * 1
                                          )
                                        )
                                      }
                                      custom
                                    >
                                      <option value={1}>1</option>
                                      <option value={2}>2</option>
                                      <option value={3}>3</option>
                                      <option value={4}>4</option>
                                      <option value={5}>5</option>
                                    </Form.Control>
                                  </Form.Group>
                                </Form>
                              </Col>
                              {/* end of product qty */}

                              {/* delete btn */}
                              <Col xs='2' sm='1' className='px-0'>
                                <h5 className='delete-btn mx-auto'>
                                  <FaTrash
                                    onClick={() => {
                                      onDelete('Removed from cart')
                                      dispatch(removeItemFromCart(productId))
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

            {/* Amount distribution */}
            {cartItems.length > 0 && (
              <Col xs='12' md='4' className='mx-auto'>
                <h5>Payment Details</h5>
                <hr />
                {/* total price */}
                <div className='d-flex justify-content-between'>
                  <p>MRP Total</p>
                  <p>
                    <strong>₹{thousand_separator(cart.itemsPrice)}</strong>
                  </p>
                </div>
                {/* end total price */}

                {/* delivery charges */}
                <div className='d-flex justify-content-between '>
                  <p className='mb-0'>Delivery Charges</p>
                  <p className='mb-0'>
                    <strong>₹{thousand_separator(cart.shippingPrice)}</strong>
                  </p>
                </div>
                {/* end delivery charges */}
                <hr />
                {/* total amount */}
                <div className='d-flex justify-content-between'>
                  <p>Total Amount</p>
                  <p>
                    <strong>₹{thousand_separator(cart.totalPrice)}</strong>
                  </p>
                </div>
                {/* end total amount */}
                <div className='place-order my-3'>
                  <Button
                    type='button'
                    className='add-to-cart-btn btn-block'
                    onClick={checkOutHandler}
                    disabled={cartItems.length === 0 ? true : false}
                  >
                    Place Order
                  </Button>
                </div>
              </Col>
            )}
            {/* Amount distribution */}
          </Row>
          {/* end of cart items */}
        </div>
      </section>
    </>
  )
}

export default CartScreen
