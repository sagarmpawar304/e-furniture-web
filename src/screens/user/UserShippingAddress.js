import React, { useEffect } from 'react'
import { Container, Row, Col, Card } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import Navbar from '../../components/Navbar'
import Loader from '../../components/Loader'
import Message from '../../components/Message'
import { getUserProfile } from '../../actions/userActions'

const UserShippingAddress = () => {
  const dispatch = useDispatch()

  const userDetails = useSelector((state) => state.userDetails)
  const { userDetailInfo, loading, error } = userDetails

  useEffect(() => {
    dispatch(getUserProfile())
  }, [dispatch])

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
              <span className='mr-2'>
                <Link to='/users/loginandsecurity'>Login & Security</Link>
              </span>
              <span className='mr-2'>{'>'}</span>
              <span>Shipping Addresses</span>
            </h6>
          </Col>
        </Row>

        {loading && <Loader />}
        {error && <Message varient='danger' message={error} />}

        <Row className='my-4'>
          <Col xs='11' md='6' lg='4' className='mx-auto my-2  text-center '>
            <Link to='/users/addnewAddress'>
              <Card className='shipping-address-card'>
                <Card.Body className='d-flex align-items-center justify-content-center text-warning '>
                  <h4>Add New Address</h4>
                </Card.Body>
              </Card>
            </Link>
          </Col>

          {userDetailInfo.address &&
            userDetailInfo.address.map((item, index) => {
              const { address, city, state, pinCode, country } = item
              return (
                <Col xs='11' md='6' lg='4' className='mx-auto my-2' key={index}>
                  <Link to={`/users/shippingAddress?index=${index}`}>
                    <Card className='shipping-address-card text-dark'>
                      <Card.Body>
                        <h5 className='text-warning'>Address {index + 1}</h5>
                        <p className='mb-0 '>{address}</p>
                        <p className='mb-0'>
                          {city}.{pinCode}
                        </p>
                        <p className='mb-0'>{state}</p>
                        <p className='mb-0'>{country}</p>
                      </Card.Body>
                    </Card>
                  </Link>
                </Col>
              )
            })}
        </Row>
      </Container>
    </>
  )
}

export default UserShippingAddress
