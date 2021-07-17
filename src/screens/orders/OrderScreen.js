import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { PayPalButton } from 'react-paypal-button-v2'
import {
  Row,
  Col,
  ListGroup,
  Image,
  Card,
  Button,
  Form,
  Container,
} from 'react-bootstrap'
import { Link } from 'react-router-dom'
import axios from 'axios'
import {ToastContainer} from 'react-toastify'

import Message from '../../components/Message'
import Loader from '../../components/Loader'
import {
  payOrder,
  getOrderDetails,
  deliverOrder,
  resetCreateOrder,
} from '../../actions/orderAction'
import CheckOutSteps from '../../components/CheckoutSteps'
import { createProductReview } from '../../actions/productActions'
import { resetCart } from '../../actions/cartActions'
import {
  ORDER_PAY_RESET,
  ORDER_DELIVER_RESET,
} from '../../constants/orderConstants'
import { PRODUCT_CREATE_REVIEW_RESET } from '../../constants/productConstants'
import {onDelete,onSuccess} from '../../components/toast'

const OrderScreen = ({ match, history }) => {
  const [SdkReady, setSdkReady] = useState(false)
  const [rating, setRating] = useState(0)
  const [comment, setComment] = useState('')
  const [currentproduct, setCurrentProduct] = useState('')

  const orderId = match.params.id
  const dispatch = useDispatch()

  const orderDetails = useSelector((state) => state.orderDetails)
  const { loading, order, error } = orderDetails

  const cart = useSelector((state) => state.cart)
  const { cartItems } = cart

  const orderPay = useSelector((state) => state.orderPay)
  const { loading: loadingPay, success: successPay } = orderPay

  const orderDeliver = useSelector((state) => state.orderDeliver)
  const { loading: loadingDeliver, success: successDeliver } = orderDeliver

  const userLogin = useSelector((state) => state.userLogin)
  const { userInfo } = userLogin

  const productCreateReview = useSelector((state) => state.productCreateReview)
  const {
    success: successProductCreateReview,
    error: errorProductCreateReview,
  } = productCreateReview

  const thousand_separator = (num) => {
    if (num !== undefined) {
      let price = num.toString()
      price = price.replace(/\B(?=(\d{3})+(?!\d))/g, ',')
      return price
    }
  }
  useEffect(() => {
    dispatch(resetCreateOrder())
    dispatch({type:PRODUCT_CREATE_REVIEW_RESET})
  }, [dispatch])

  useEffect(() => {
    if (!userInfo) {
      history.push('/login')
    }

    if (successProductCreateReview) {
      onSuccess('Review Submitted')
      setRating(0)
      setComment('')
      setCurrentProduct('')
      dispatch({ type: PRODUCT_CREATE_REVIEW_RESET })
    }

    const addPayScript = async () => {
      const { data } = await axios.get(
        'https://e-furniture-api.herokuapp.com/api/config/paypal'
      )
      const script = document.createElement('script')
      script.type = 'text/javascript'
      script.src = `https://www.paypal.com/sdk/js?client-id=${data}`
      script.async = true
      script.onload = () => {
        setSdkReady(true)
      }
      document.body.appendChild(script)
    }

    if (!order || order._id !== orderId || successPay || successDeliver) {
      dispatch({ type: ORDER_PAY_RESET })
      dispatch({ type: ORDER_DELIVER_RESET })
      dispatch(getOrderDetails(orderId))
    } else if (!order.isPaid) {
      addPayScript()
    } else {
      setSdkReady(true)
    }

    if (orderId === undefined) {
      history.push('/')
    }
  }, [
    order,
    orderId,
    dispatch,
    successPay,
    history,
    successDeliver,
    userInfo,
    cartItems,
    successProductCreateReview,
  ])

  const reviewSubmitHandler = (e) => {
    e.preventDefault()
    
    order.orderItems.map((item) => {
      if (item.name === currentproduct) {
        dispatch(
          createProductReview(item.productId, {
            orderId:item._id,
            rating,
            comment,
          })
        )
      }
      return item.name
    })
  }

  const successPaymentHandler = (paymentResult) => {
    dispatch(payOrder(orderId, paymentResult))
    dispatch(resetCart())
  }
  const deliverhandler = () => {
    dispatch(deliverOrder(order))
  }

  return loading ? (
    <Loader />
  ) : error ? (
    <Message message='No Orders Placed' c className={'mt-4'} />
  ) : (
    <>
      <ToastContainer/>
      <CheckOutSteps step1 step2 step3 step4 />

      <Container>
        {order.user && (
          <Row>
            {' '}
            <h3 className='my-4'>ORDER: {order._id}</h3>
            <Col md={8}>
              <ListGroup variant='flush'>
                <ListGroup.Item>
                  <h4>Shipping</h4>
                  <p>
                    Name: <strong>{order.user.name}</strong>
                  </p>
                  <p>
                    Email:{' '}
                    <strong>
                      <a href={`mailto:${order.user.email}`}>
                        {order.user.email}
                      </a>
                    </strong>
                  </p>

                  <p>
                    {' '}
                    <strong>Address: </strong>
                    {order.shippingAddress.address},{order.shippingAddress.city}
                    ,{order.shippingAddress.pinCode}.
                    {order.shippingAddress.state},
                    {order.shippingAddress.country}
                  </p>
                  {order.isDelivered ? (
                    <Message message={`Delivered At ${order.deliveredAt}`} />
                  ) : (
                    <Message variant='danger' message={`Not Delivered`} />
                  )}
                </ListGroup.Item>

                <ListGroup.Item>
                  <h4>Payment Method</h4>
                  <p>
                    <strong>Method: </strong>
                    {order.paymentMethod}
                  </p>
                  {order.isPaid ? (
                    <Message message={`Paid At ${order.paidAt}`} />
                  ) : (
                    <Message variant='danger' message={`Not Paid`} />
                  )}
                </ListGroup.Item>

                <ListGroup.Item>
                  <h4>Order items</h4>
                  {order.orderItems && order.orderItems.length === 0 ? (
                    <Message message='Your cart is empty' />
                  ) : (
                    <ListGroup variant='flush'>
                      <ListGroup.Item>
                        <Row>
                          <Col md={2}></Col>
                          <Col>Product Name</Col>
                          <Col md={2}>Quantity</Col>
                          <Col md={2}>Price</Col>
                          <Col md={1}>Amount</Col>
                        </Row>
                      </ListGroup.Item>

                      {order.orderItems &&
                        order.orderItems.map((item, index) => (
                          <ListGroup.Item key={index}>
                            <Row>
                              <Col md={2}>
                                <Link to={`/products/${item.productId}`}>
                                  <Image
                                    src={item.images[0]}
                                    alt={item.name}
                                    fluid
                                    rounded
                                  />
                                </Link>
                              </Col>
                              <Col>
                                <Link to={`/products/${item.productId}`}>
                                  {item.name}
                                </Link>
                              </Col>
                              <Col md={2}>{item.qty}</Col>
                              <Col md={2}>
                                ₹{thousand_separator(item.price)}
                              </Col>
                              <Col md={1}>
                                ₹{thousand_separator(item.price * item.qty)}
                              </Col>
                            </Row>
                          </ListGroup.Item>
                        ))}
                    </ListGroup>
                  )}
                </ListGroup.Item>
              </ListGroup>
            </Col>
            <Col>
              <Card>
                <ListGroup variant='flush'>
                  <ListGroup.Item className='text-center pt-4'>
                    {' '}
                    <h4>ORDER SUMMARY</h4>
                  </ListGroup.Item>

                  <ListGroup.Item>
                    <Row>
                      <Col>Items Price</Col>
                      <Col>₹{thousand_separator(order.itemsPrice)}</Col>
                    </Row>
                  </ListGroup.Item>

                  <ListGroup.Item>
                    <Row>
                      <Col>Shipping Charges</Col>
                      <Col>₹{thousand_separator(order.shippingPrice)}</Col>
                    </Row>
                  </ListGroup.Item>

                  <ListGroup.Item>
                    <Row>
                      <Col>Total </Col>
                      <Col>₹{thousand_separator(order.totalPrice)}</Col>
                    </Row>
                  </ListGroup.Item>

                  {!order.isPaid && (
                    <>
                      <ListGroup.Item>
                        {loadingPay && <Loader />}
                        {!SdkReady ? (
                          <Loader />
                        ) : (
                          <PayPalButton
                            amount={order.totalPrice}
                            onSuccess={successPaymentHandler}
                          />
                        )}
                      </ListGroup.Item>
                    </>
                  )}

                  {userInfo &&
                    userInfo.isAdmin &&
                    order.isPaid &&
                    !order.isDelivered && (
                      <ListGroup.Item>
                        <Button
                          type='button'
                          className='btn btn-block'
                          onClick={deliverhandler}
                        >
                          Mark as Delivered
                        </Button>
                      </ListGroup.Item>
                    )}
                  {loadingDeliver && <Loader />}

                  <ListGroup.Item>
                    {errorProductCreateReview && (
                      <>
                      {onDelete(errorProductCreateReview)}
                      <Message
                        variant='danger'
                        message={errorProductCreateReview}
                      />
                      </>
                    )}
                    {userInfo && order.isPaid && order.isDelivered && (
                      <>
                        <h5 className='py-2 text-center'>
                          Write Product review
                        </h5>
                        <Form onSubmit={reviewSubmitHandler} className='mt-4'>
                          <Form.Group controlId='orders'>
                            <Form.Label>Select Product</Form.Label>
                            <Form.Control
                              as='select'
                              value={currentproduct}
                              onChange={(e) =>
                                setCurrentProduct(e.target.value)
                              }
                            >
                              <option value=''>Select..</option>
                              {order.orderItems.map((item) => (
                                <option key={item.name} value={item.name}>
                                  {item.name}
                                </option>
                              ))}
                            </Form.Control>
                          </Form.Group>

                          <Form.Group controlId='rating'>
                            <Form.Label>Rating</Form.Label>
                            <Form.Control
                              as='select'
                              value={rating}
                              onChange={(e) => setRating(e.target.value)}
                            >
                              <option value=''>Select..</option>
                              <option value='1'>1 - Poor</option>
                              <option value='2'>2 - Fair</option>
                              <option value='3'>3 - Good</option>
                              <option value='4'>4 - Very Good</option>
                              <option value='5'>5 - Excellent</option>
                            </Form.Control>
                          </Form.Group>

                          <Form.Group controlId='comment'>
                            <Form.Label>Comment</Form.Label>
                            <Form.Control
                              as='textarea'
                              value={comment}
                              onChange={(e) => setComment(e.target.value)}
                            ></Form.Control>
                          </Form.Group>

                          <Button type='submit'>Submit</Button>
                        </Form>
                      </>
                    )}
                  </ListGroup.Item>
                </ListGroup>
              </Card>
            </Col>
          </Row>
        )}
      </Container>
    </>
  )
}

export default OrderScreen
