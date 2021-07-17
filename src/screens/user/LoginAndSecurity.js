import React, { useEffect } from 'react'
import {
  Container,
  Row,
  Col,
  ListGroup,
  ListGroupItem,
  Button,
} from 'react-bootstrap'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import LoginContainer from '../../components/LoginContainer'
import Navbar from '../../components/Navbar'

const LoginAndSecurity = ({ history }) => {
  const userLogin = useSelector((state) => state.userLogin)
  const { userInfo } = userLogin
  const { name, email, phone } = userInfo

  const handleClick = (info) => {
    history.push(`/users/editInfo?info=${info}`)
  }

  const handledoneBtn = () => {
    history.push(`/users`)
  }

  useEffect(() => {
    if (userInfo === undefined || userInfo.name === undefined) {
      history.push('/login')
    }
  }, [userInfo, history])
  return (
    <>
      <Navbar />
      <Container>
        <Row>
          <Col xs='11'>
            <h6 className='mt-3'>
              <span className='mr-2'>
                <Link to='/users'>Your Account</Link>
              </span>

              <span className='mr-2'>{'>'}</span>
              <span>Login & Security</span>
            </h6>
          </Col>
        </Row>
        <LoginContainer>
          <h2 className='mb-3'>Login & Security</h2>
          <ListGroup>
            <ListGroupItem className='d-flex justify-content-between align-items-center'>
              <h6>
                <strong> Name: </strong>
                {name}
              </h6>

              <Button
                type='button'
                className='add-to-cart-btn'
                onClick={() => handleClick('name')}
              >
                Edit
              </Button>
            </ListGroupItem>
          </ListGroup>

          <ListGroup>
            <ListGroupItem className='d-flex justify-content-between align-items-center'>
              <h6>
                <strong> Email: </strong>
                {email}
              </h6>

              <Button
                type='button'
                className='add-to-cart-btn'
                onClick={() => handleClick('email')}
              >
                Edit
              </Button>
            </ListGroupItem>
          </ListGroup>

          <ListGroup>
            <ListGroupItem className='d-flex justify-content-between align-items-center'>
              <h6>
                <strong> Phone Number: </strong>
                {phone}
              </h6>

              <Button
                type='button'
                className='add-to-cart-btn'
                onClick={() => handleClick('phone')}
              >
                Edit
              </Button>
            </ListGroupItem>
          </ListGroup>

          <ListGroup>
            <ListGroupItem className='d-flex justify-content-between align-items-center'>
              <h6>
                <strong> password: </strong>
                {'******'}
              </h6>

              <Button
                type='button'
                className='add-to-cart-btn'
                onClick={() => handleClick('password')}
              >
                Edit
              </Button>
            </ListGroupItem>
          </ListGroup>
          <div className=' d-flex justify-content-center'>
            <Button
              type='button'
              onClick={handledoneBtn}
              className='add-to-cart-btn mt-3'
            >
              Done
            </Button>
          </div>
        </LoginContainer>
      </Container>
    </>
  )
}

export default LoginAndSecurity
