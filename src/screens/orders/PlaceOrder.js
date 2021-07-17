import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import {
  Row,
  Col,
  Image,
  ListGroup,
  ListGroupItem,
  Button,
} from 'react-bootstrap'
import { Link } from 'react-router-dom'
import CheckOutSteps from '../../components/CheckoutSteps'
import { createOrder } from '../../actions/orderAction'
import Message from '../../components/Message'

const PlaceOrder = ({ history }) => {
  const dispatch = useDispatch()
  const userLogin = useSelector((state) => state.userLogin)
  const { userInfo } = userLogin

  const cart = useSelector((state) => state.cart)
  const { shippingAddress, paymentMethod, cartItems } = cart
  const { address, city, pinCode, country, state } = shippingAddress

  const thousand_separator = (num) => {
    if (num !== undefined) {
      let price = num.toString()
      price = price.replace(/\B(?=(\d{3})+(?!\d))/g, ',')
      return price
    }
  }
  cart.totalQty =
    cartItems.length > 1
      ? cartItems.reduce((acc, item) => acc.qty + item.qty * 1)
      : cartItems[0].qty
  cart.itemsPrice =
    cartItems.length > 1
      ? cartItems.reduce((acc, item) => {
          const prices = item.qty * item.price
          // console.log(acc + prices)
          return acc + prices
        }, 0)
      : cartItems[0].price * cartItems[0].qty
  cart.shippingPrice = cart.itemsPrice > 10000 ? 0 : 1000
  cart.TotalPrice = cart.itemsPrice + cart.shippingPrice

  const orderCreate = useSelector((state) => state.orderCreate)
  const { success, order, error } = orderCreate

  const placeOrderHandler = () => {
    dispatch(
      createOrder({
        orderItems: cartItems,
        shippingAddress: shippingAddress,
        paymentMethod: paymentMethod,
        itemsPrice: cart.itemsPrice,
        shippingCharges: cart.shippingPrice,
        totalPrice: cart.TotalPrice,
      })
    )
  }

  useEffect(() => {
    if (userInfo === undefined || userInfo.name === undefined) {
      history.push('/login')
    }
    if (shippingAddress === undefined) {
      history.push('/shipping')
    }
    if (!paymentMethod) {
      history.push('/payment')
    }
    if (success) {
      history.push(`/orders/${order._id}`)
    }
  }, [history, userInfo, shippingAddress, paymentMethod, success, order])

  return (
    <section id='order' className='order'>
      <CheckOutSteps step1 step2 step3 step4 />

      <div className='container'>
        <Row>
          <Col>
            <h2 className='mt-3'>Place Order</h2>
          </Col>
        </Row>
        <Row>
          <Col>
            <ListGroup variant='flush'>
              {/* userInfo */}
              <ListGroupItem>
                <h4>User</h4>
                <p className='mb-0'>
                  <strong>Name: </strong> {userInfo.name}
                </p>
              </ListGroupItem>
              {/* end of userInfo */}
              {/* shipping address */}
              <ListGroupItem>
                <h4> Shipping</h4>
                <p>
                  <strong>Shipping Address : </strong>
                </p>
                <p className='mb-0'>{address}</p>
                <p className='mb-0'>
                  {city}.pincode-{pinCode},
                </p>
                <p className='mb-0'>{state},</p>
                <p className='mb-0'>{country}.</p>
              </ListGroupItem>
              {/* end of shipping address */}

              {/* payment method */}
              <ListGroupItem>
                <h4>Payment Method</h4>
                <p className='mb-0'>
                  <strong>Method: </strong> {paymentMethod}
                </p>
              </ListGroupItem>
              {/* end of payment method */}

              {/* orderItems */}
              <ListGroupItem>
                <h4>Order Items</h4>
                {cartItems.map((item) => {
                  const { productId, name, images, price, qty } = item
                  return (
                    <Row className='my-3 align-items-center' key={productId}>
                      <Col xs='6' md='2'>
                        <Link to={`/products/${productId}`}>
                          <Image src={images[0]} fluid />
                        </Link>
                      </Col>
                      <Col xs='6' md='10'>
                        <Row>
                          <Col xs='5'>
                            {' '}
                            <Link to={`/products/${productId}`}>{name}</Link>
                          </Col>
                          <Col xs='2'>{qty}</Col>
                          <Col xs='2'>₹{thousand_separator(price)}</Col>
                          <Col xs='3'>₹{thousand_separator(price * qty)}</Col>
                        </Row>
                      </Col>
                    </Row>
                  )
                })}
              </ListGroupItem>
              {/* end of orderItems */}
            </ListGroup>
          </Col>

          <Col xs='11' md='4' className='mx-auto  order-summary'>
            <ListGroup variant='flush'>
              <ListGroupItem>
                <h4>Order Summary</h4>
              </ListGroupItem>

              <ListGroupItem>
                <p className='mb-0'>
                  <strong>Total Items Price ({cart.totalQty}) :</strong> ₹
                  {thousand_separator(cart.itemsPrice)}
                </p>

                <p className='mb-0'>
                  <strong>Shipping Charges:</strong> ₹
                  {thousand_separator(cart.shippingPrice)}
                </p>
              </ListGroupItem>

              <ListGroupItem>
                <p className='mb-0'>
                  <strong>Total Amount ({cart.totalQty}) :</strong> ₹
                  {thousand_separator(cart.TotalPrice)}
                </p>
              </ListGroupItem>

              {error && (
                <ListGroup.Item>
                  <Message variant='danger' message={error} />{' '}
                </ListGroup.Item>
              )}

              <ListGroup.Item>
                <Button
                  className='btn btn-block'
                  disabled={cartItems.length === 0}
                  onClick={placeOrderHandler}
                >
                  Place Order
                </Button>
              </ListGroup.Item>
            </ListGroup>
          </Col>
        </Row>
      </div>
    </section>
  )
}

export default PlaceOrder
