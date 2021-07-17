import React, { useEffect } from 'react'
import { Container, Row, Col, Button } from 'react-bootstrap'
import { FaShoppingBasket } from 'react-icons/fa'
import { FcLock } from 'react-icons/fc'
import { BiMap } from 'react-icons/bi'
import { useSelector } from 'react-redux'
import { useDispatch } from 'react-redux'
import { Link } from 'react-router-dom'
import { logout } from '../../actions/userActions'
import Navbar from '../../components/Navbar'

const User = ({ history }) => {
  const dispatch = useDispatch()
  const userLogin = useSelector((state) => state.userLogin)
  const { userInfo } = userLogin

  useEffect(() => {
    if (userInfo === undefined || userInfo.name === undefined) {
      history.push('/login')
    }
  }, [userInfo, history])
  return (
    <>
      <Navbar />
      <section id='users' className='users'>
        <Container>
          <Row>
            <Col xs='12' className='mt-4 mb-2'>
              <h3 className='mb-0'>Your Account</h3>
            </Col>
          </Row>

          <Row>
            <Col xs='12' md='6'>
              <Link to='/users/orders'>
                <div className='d-flex  justify-content-around align-items-center user-card'>
                  <div className='user-card-img '>
                    <h1 className='text-info'>
                      <FaShoppingBasket />
                    </h1>
                  </div>
                  <div className='user-card-info'>
                    <h5>Your Orders</h5>
                    <p className='text-muted'>Track,Return Or Buy Again</p>
                  </div>
                </div>
              </Link>
            </Col>
            <Col xs='12' md='6'>
              <Link to='/users/loginandsecurity'>
                <div className='d-flex  justify-content-around align-items-center user-card'>
                  <div className='user-card-img '>
                    <h1 className='text-info'>
                      <FcLock />
                    </h1>
                  </div>
                  <div className='user-card-info'>
                    <h5>Login & Security</h5>
                    <p className='text-muted text-capitalize'>
                      Edit name,email,phone number
                    </p>
                  </div>
                </div>
              </Link>
            </Col>
            <Col xs='12' md='6'>
              <Link to='/users/shipping'>
                <div className='d-flex  justify-content-around align-items-center user-card'>
                  <div className='user-card-img '>
                    <h1 className='text-info'>
                      <BiMap />
                    </h1>
                  </div>
                  <div className='user-card-info'>
                    <h5>Your Addresses</h5>
                    <p className='text-muted text-capitalize'>
                      Edit Addresses for orders
                    </p>
                  </div>
                </div>
              </Link>
            </Col>

            {/* <Col xs='12' md='6'>
              <Link to='/paymentMethods'>
                <div className='d-flex  justify-content-around align-items-center user-card'>
                  <div className='user-card-img '>
                    <h1 className='text-info'>
                      <FaCreditCard />{' '}
                    </h1>
                  </div>
                  <div className='user-card-info'>
                    <h5>Payment Options</h5>
                    <p className='text-muted text-capitalize'>
                      Add Or edit Payment options
                    </p>
                  </div>
                </div>
              </Link>
            </Col> */}
          </Row>

          <Row className='my-3 justify-content-end'>
            <Col xs='12' className='d-flex justify-content-end '>
              <Button variant='warning' onClick={() => dispatch(logout())}>
                Log Out
              </Button>
            </Col>
          </Row>
        </Container>
      </section>
    </>
  )
}

export default User
