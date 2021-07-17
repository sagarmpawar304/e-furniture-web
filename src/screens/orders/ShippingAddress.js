import React, { useEffect,useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Container, Row, Col, Card, Form ,Button} from 'react-bootstrap'
import { Link } from 'react-router-dom'
import CheckOutSteps from '../../components/CheckoutSteps'
import { saveShippingAddress } from '../../actions/cartActions'
import Loader from '../../components/Loader'
import Message from '../../components/Message'
import { getUserProfile } from '../../actions/userActions'

const ShippingAddress = ({ history }) => {
  const [addressIndex,setAddressIndex] = useState(0)
  const dispatch = useDispatch()

  const userDetails = useSelector((state) => state.userDetails)
  const { userDetailInfo, loading, error } = userDetails
  const { address } = userDetailInfo

  useEffect(() => {
    dispatch(getUserProfile())
  }, [dispatch])

  const clickHandler = (index) => {
    const address = userDetailInfo.address
    dispatch(saveShippingAddress(address[index]))
    history.push('/payment')
  }
  return (
    <>
      <CheckOutSteps step1 step2 />
      <Container>
        <h2 className='my-3'>Shipping Address</h2>
        {loading && <Loader />}
        {error && <Message varient='danger' message={error} />}

        <Row className='my-4'>
          {address && address.length === 0 && (
            <Col xs='11' md='6' lg='4' className='mx-auto my-2  text-center '>
              <Link to='/users/addnewAddress'>
                <Card className='shipping-address-card'>
                  <Card.Body className='d-flex align-items-center justify-content-center text-warning '>
                    <h4>Add New Address</h4>
                  </Card.Body>
                </Card>
              </Link>
            </Col>
          )}
          <Col xs='11'> 
          <Row>
            {userDetailInfo.address &&
              userDetailInfo.address.map((item, index) => {
                const { address, city, state, pinCode, country } = item
                return (
                  <Col xs='11' md='6' lg='4' className='my-2' key={index}>
                    <Form>
                      <Form.Group className='d-flex'>
                        <Form.Check
                          className='mr-2'
                          onClick={() => setAddressIndex(index)}
                        />
                        <Link to={`/users/shippingAddress?index=${index}`}>
                          <Card className='shipping-address-card text-dark'>
                            <Card.Body>
                              <h5 className='text-warning'>
                                Address {index + 1}
                              </h5>
                              <p className='mb-0 '>{address}</p>
                              <p className='mb-0'>
                                {city}.{pinCode}
                              </p>
                              <p className='mb-0'>{state}</p>
                              <p className='mb-0'>{country}</p>
                            </Card.Body>
                          </Card>
                        </Link>
                      </Form.Group>
                    </Form>
                  </Col>
                )
              })}
          </Row>
          </Col>
        </Row>
        <Row className='justify-content-center mb-5'>
          <div >
            <Button
              type='button'
              variant='primary'
              onClick={() => clickHandler(addressIndex)}
            >
              Continue
            </Button>
          </div>
        </Row>
      </Container>
    </>
  )
}

export default ShippingAddress
