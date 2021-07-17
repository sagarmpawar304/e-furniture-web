import React, { useEffect, useState } from 'react'
import LoginContainer from '../../components/LoginContainer'
import { useDispatch, useSelector } from 'react-redux'

import { Row, Col, Button, Form } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import Message from '../../components/Message'
import Loader from '../../components/Loader'
import { logIn } from '../../actions/userActions'
import Navbar from '../../components/Navbar'
import { onDelete } from '../../components/toast'
import {ToastContainer} from 'react-toastify'


const UserLogin = ({ location, history }) => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [message, setMessage] = useState(null)

  const dispatch = useDispatch()
  const userLogin = useSelector((state) => state.userLogin)
  const { loading, error, userInfo } = userLogin

  const submitHandler = (e) => {
    e.preventDefault()
    // Dispatch action

    if (!email || !password) {
      setMessage(`email and password can't be empty`)
    } else {
      dispatch(logIn(email, password))
      onDelete('Signing Up')
      setMessage(null)
    }
  }

  const redirect = location.search ? location.search.split('=')[1] : '/'

  useEffect(() => {
    if (userInfo) {
      if (userInfo.name) {
        history.push(redirect)
      }
    }
  }, [userInfo, history, redirect])

  return (
    <>
      <ToastContainer/>
      <Navbar />
      <section id='user-login' className='user-login'>
        <LoginContainer>
          <h1 className='text-center my-3'>Sign In</h1>
          {message && <Message variant='danger' message={message} />}
          {error && <Message variant='danger' message={error} />}
          {loading && <Loader />}
          <Form onSubmit={submitHandler}>
            <Form.Group controlId='email'>
              <Form.Label>Email/Mobile Number</Form.Label>
              <Form.Control
                type='text'
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder='Your Email'
              ></Form.Control>
            </Form.Group>

            <Form.Group controlId='password'>
              <Form.Label>Password</Form.Label>
              <Form.Control
                type='text'
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder='Your Password'
              ></Form.Control>
            </Form.Group>
            <Button type='submit' className='add-to-cart-btn'>
              Sign In
            </Button>
          </Form>
          <Row className='py-3'>
            <Col>
              New User?{' '}
              <Link
                to={redirect ? `/register?redirect=${redirect}` : '/register'}
              >
                Register
              </Link>
            </Col>
          </Row>
        </LoginContainer>
      </section>
    </>
  )
}

export default UserLogin
