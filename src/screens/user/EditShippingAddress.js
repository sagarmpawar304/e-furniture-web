import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Form, Button, Row, Col } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import {ToastContainer} from 'react-toastify'
import ShippingContainer from '../../components/LoginContainer'
import Navbar from '../../components/Navbar'
import Message from '../../components/Message'
import Loader from '../../components/Loader'
import { getUserProfile, userUpdateProfile } from '../../actions/userActions'
import {onDelete, onSuccess} from '../../components/toast'

const EditShippingAddress = ({ location }) => {
  const dispatch = useDispatch()

  const addressIndex = location.search ? location.search.split('=')[1] * 1 : 0

  const userDetails = useSelector((state) => state.userDetails)
  const { userDetailInfo, loading, error } = userDetails
  const { address: shippingAddress } = userDetailInfo

  const [address, setAddress] = useState('')
  const [city, setCity] = useState('')
  const [pinCode, setPinCode] = useState('')
  const [state, setState] = useState('')
  const [country, setCountry] = useState('')
  const [message, setMessage] = useState('')

  useEffect(() => {
    dispatch(getUserProfile())
  }, [dispatch])

  useEffect(() => {
    if (shippingAddress !== undefined) {
      setAddress(shippingAddress[addressIndex].address)
      setCity(shippingAddress[addressIndex].city)
      setPinCode(shippingAddress[addressIndex].pinCode)
      setCountry(shippingAddress[addressIndex].country)
      setState(shippingAddress[addressIndex].state)
    }
  }, [shippingAddress, addressIndex])

  const onChangeHandler = (e) => {
    setMessage('')
    const { name, value } = e.target
    if (name === 'address') setAddress(value)
    if (name === 'city') setCity(value)
    if (name === 'pinCode') setPinCode(value)
    if (name === 'state') setState(value)
    if (name === 'country') setCountry(value)
  }

  const submitHandler = (e) => {
    e.preventDefault()
    if (
      address.length === 0 ||
      city.length === 0 ||
      pinCode.length === 0 ||
      state.length === 0 ||
      country.length === 0
    ) {
      onDelete(`Address can't be empty`)
      setMessage(`Address can't be empty`)
    } 
    if(message  === '') {
      onSuccess('Address saved')
      dispatch(
        userUpdateProfile('address', {
          addressIndex,
          address,
          city,
          pinCode,
          state,
          country,
        })
      )
      
    }
  }
  return (
    <>
      {' '}
      <ToastContainer/>
      <Navbar />
      <ShippingContainer>
        <Row>
          <Col xs='11'>
            <h6 className='mt-1'>
              <span className='mr-2'>
                <Link to='/users'>Your Account</Link>
              </span>

              <span className='mr-2'>{'>'}</span>
              <span className='mr-2'>
                <Link to='/users/shipping'>shipping</Link>
              </span>
              <span className='mr-2'>{'>'}</span>
              <span>Edit Shipping Addresses</span>
            </h6>
          </Col>
        </Row>
        <h2 className='my-3'>Edit Shipping Address</h2>
        {error && <Message variant='danger' message={error} />}
        {message && <Message variant='danger' message={message} />}
        {loading && <Loader />}

        <Form onSubmit={submitHandler}>
          <Form.Group controlId='country'>
            <Form.Label>Country</Form.Label>
            <Form.Control
              type='text'
              name='country'
              value={country}
              onChange={onChangeHandler}
            />
          </Form.Group>

          <Form.Group controlId='address'>
            <Form.Label>Address</Form.Label>
            <Form.Control
              type='text'
              name='address'
              value={address}
              onChange={onChangeHandler}
            />
          </Form.Group>

          <Form.Group controlId='city'>
            <Form.Label>City</Form.Label>
            <Form.Control
              type='text'
              name='city'
              value={city}
              onChange={onChangeHandler}
            />
          </Form.Group>

          <Form.Group controlId='pinCode'>
            <Form.Label>PinCode</Form.Label>
            <Form.Control
              type='text'
              name='pinCode'
              value={pinCode}
              onChange={onChangeHandler}
            />
          </Form.Group>

          <Form.Group controlId='state'>
            <Form.Label>State</Form.Label>
            <Form.Control
              type='text'
              name='state'
              value={state}
              onChange={onChangeHandler}
            />
          </Form.Group>

          <Button className='add-to-cart-btn' type='submit'>
            Save
          </Button>
        </Form>
      </ShippingContainer>
    </>
  )
}

export default EditShippingAddress
