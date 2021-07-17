import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Row, Col, Button, Form, Alert, Spinner } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import validator from 'validator'
import { ToastContainer } from 'react-toastify'

import { signUp } from '../../actions/userActions'
import LoginContainer from '../../components/LoginContainer'
import Navbar from '../../components/Navbar'
import {onDelete} from '../../components/toast'

const UserRegister = ({ history }) => {
  const [userName, setUserName] = useState('')
  const [email, setEmail] = useState('')
  const [phone, setPhone] = useState('')
  const [password, setPassword] = useState('')
  const [ConfirmPassword, setConfirmPassword] = useState('')
  const [message, setMessage] = useState(null)
  const [nameMessage, setNameMessage] = useState(null)
  const [emailMessage, setEmailMessage] = useState(null)
  const [phoneMessage, setPhoneMessage] = useState(null)
  const [passwordMessage, setPasswordMessage] = useState(null)
  const [confirmPasswordMessage, setConfirmPasswordMessage] = useState(null)
  

  const dispatch = useDispatch()
  const userSignUp = useSelector((state) => state.userSignUp)
  const { loading, error, userInfo } = userSignUp

  const onChangeHandler = (e) => {
    setMessage(null)
    const { name, value } = e.target
    if (name === 'userName') setUserName(value)
    if (name === 'email') setEmail(value)
    if (name === 'phone') setPhone(value)
    if (name === 'password') setPassword(value)
    if (name === 'confirmPassword') setConfirmPassword(value)

    switch (name) {
      case 'userName':
        if (value) {
          value.trim().length < 5
            ? setNameMessage('Please Provide your full name')
            : setNameMessage(null)
        }

        break
      case 'email':
        !validator.isEmail(value)
          ? setEmailMessage('Please provide valid email')
          : setEmailMessage(null)

        break
      case 'phone':
        !validator.isNumeric(value)
          ? setPhoneMessage('Please provide 10 digit phone number')
          : !(value.trim().length === 10)
          ? setPhoneMessage('Please provide 10 digit phone number')
          : setPhoneMessage(null)

        break
      case 'password':
        if (!validator.isAlphanumeric(value)) {
          setPasswordMessage('Please provide only letters and numbers')
        } else {
          if (value) {
            value.trim().length < 5
              ? setPasswordMessage('Password must have atleast 5 characters')
              : setPasswordMessage(null)
          }
        }

        break
      case 'confirmPassword':
        if (!validator.isAlphanumeric(value)) {
          setPasswordMessage('Please provide only letters and numbers')
        } else {
          if (value) {
            value !== password
              ? setConfirmPasswordMessage('Password must match')
              : setConfirmPasswordMessage(null)
          }
        }

        break
      default:
        break
    }
  }

  const submitHandler = (e) => {
    e.preventDefault()
    // Dispatch action
    if (!email || !password || !userName) {
      setMessage(`name, email and password can't be empty`)
    } else if (userName.length < 5 || nameMessage) {
      setMessage('Name must have at least 5 characters')
    } else if (emailMessage) {
      setMessage('Please provide valid email')
    } else if (phoneMessage) {
      setMessage('Please provide valid 10 digit phone number')
    } else if (password.length < 5 || passwordMessage) {
      setMessage(
        `password must have 5 characters and contains only letters, numbers`
      )
    } else if (password !== ConfirmPassword) {
      setMessage(`passwords must match`)
    } else {
      const name = userName
      dispatch(signUp(name, email, phone, password))
      onDelete('Creating Your Account')
      setMessage(null)
    }
  }

  useEffect(() => {
    if (userInfo) {
      if (userInfo._id) {
        history.push('/')
      }
    }
  }, [userInfo, history])

  return (
    <>
      <ToastContainer />
      <Navbar />
      <section id='register' className='register bg-light'>
        <LoginContainer>
          <h1 className='my-3 text-center'>Sign Up</h1>
          {message && <Alert variant='danger'>{message}</Alert>}
          {error && <Alert variant='danger'>{error}</Alert>}
          {loading && <Spinner />}
          <Form onSubmit={submitHandler} autoComplete='on'>
            <Form.Group controlId='userName'>
              <Form.Label>Name</Form.Label>
              <Form.Control
                type='text'
                name='userName'
                isInvalid={nameMessage}
                // isValid={nameMessage ? true : false}
                value={userName}
                onChange={onChangeHandler}
                placeholder='Name'
              ></Form.Control>
              {nameMessage && (
                <Form.Text
                  style={{ color: 'red', fontSize: '0.8rem' }}
                  className='py-2'
                >
                  {nameMessage}
                </Form.Text>
              )}
            </Form.Group>

            <Form.Group controlId='email'>
              <Form.Label>Email</Form.Label>
              <Form.Control
                type='text'
                name='email'
                isInvalid={emailMessage}
                isValid={emailMessage}
                value={email}
                onChange={onChangeHandler}
                placeholder='Email'
              ></Form.Control>
              {emailMessage && (
                <Form.Text
                  style={{ color: 'red', fontSize: '0.8rem' }}
                  className='py-2'
                >
                  {emailMessage}
                </Form.Text>
              )}
            </Form.Group>

            <Form.Group controlId='phone'>
              <Form.Label>Phone Number</Form.Label>
              <Form.Control
                type='text'
                name='phone'
                isInvalid={phoneMessage}
                isValid={phoneMessage}
                value={phone}
                onChange={onChangeHandler}
                placeholder='Phone Number'
              ></Form.Control>
              {phoneMessage && (
                <Form.Text
                  style={{ color: 'red', fontSize: '0.8rem' }}
                  className='py-2'
                >
                  {phoneMessage}
                </Form.Text>
              )}
            </Form.Group>

            <Form.Group controlId='password'>
              <Form.Label>Password</Form.Label>
              <Form.Control
                type='password'
                name='password'
                isInvalid={passwordMessage}
                isValid={passwordMessage}
                value={password}
                onChange={onChangeHandler}
                placeholder='Password'
              ></Form.Control>
              {passwordMessage && (
                <Form.Text
                  style={{ color: 'red', fontSize: '0.8rem' }}
                  className='py-2'
                >
                  {passwordMessage}
                </Form.Text>
              )}
            </Form.Group>

            <Form.Group controlId='confirmPassword'>
              <Form.Label>Confirm Password</Form.Label>
              <Form.Control
                type='password'
                name='confirmPassword'
                isInvalid={confirmPasswordMessage}
                value={ConfirmPassword}
                onChange={onChangeHandler}
                placeholder=' Confirm Password'
              ></Form.Control>
              {confirmPasswordMessage && (
                <Form.Text
                  style={{ color: 'red', fontSize: '0.8rem' }}
                  className='py-2'
                >
                  {confirmPasswordMessage}
                </Form.Text>
              )}
            </Form.Group>

            <Button type='submit' className='add-to-cart-btn'>
              Sign Up
            </Button>
          </Form>
          <Row className='py-3'>
            <Col>
              Have an account? <Link to={`/login`}>Login</Link>
            </Col>
          </Row>
        </LoginContainer>
      </section>
    </>
  )
}

export default UserRegister
