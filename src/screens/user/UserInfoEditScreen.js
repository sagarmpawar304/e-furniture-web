import React, { useEffect, useState } from 'react'
import {
  Container,
  Row,
  Col,
  ListGroup,
  ListGroupItem,
  Button,
  Form,
} from 'react-bootstrap'
import { useSelector, useDispatch } from 'react-redux'
import { Link } from 'react-router-dom'
import LoginContainer from '../../components/LoginContainer'
import Navbar from '../../components/Navbar'
import { userUpdateProfile } from '../../actions/userActions'
import Loader from '../../components/Loader'
import Message from '../../components/Message'
import { USER_UPDATE_RESET } from '../../constants/usersConstants'
import {ToastContainer} from 'react-toastify'
import {onSuccess} from '../../components/toast'

const UserInfoEditScreen = ({ history, location }) => {
  const infoValue = location.search ? location.search.split('=')[1] : ''
  const dispatch = useDispatch()
  const userLogin = useSelector((state) => state.userLogin)
  const { userInfo } = userLogin

  const userUpdate = useSelector((state) => state.userUpdate)
  const { loading, error } = userUpdate

  const { name, email, phone } = userInfo

  const [newValue, setNewValue] = useState('')

  const findValue = () => {
    if (infoValue === 'name') return setNewValue(name)
    if (infoValue === 'email') return setNewValue(email)
    if (infoValue === 'phone') return setNewValue(phone)
    return ''
  }

  const handleClick = () => {
    onSuccess('Account updated')
    dispatch(userUpdateProfile(infoValue, newValue))
  }

  useEffect(() => {
    findValue()
    dispatch({ type: USER_UPDATE_RESET })
    // eslint-disable-next-line
  }, [])

  useEffect(() => {
    if (userInfo === undefined || userInfo.name === undefined) {
      history.push('/login')
    }
  }, [userInfo, history])
  return (
    <>
      <ToastContainer/>
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
              <span>Edit</span>
            </h6>
          </Col>
        </Row>
        <LoginContainer>
          <h4 className='mb-3 text-capitalize'>Change Your {infoValue}</h4>
          {loading && <Loader />}
          {error && <Message variant='danger' message={error} />}
          <ListGroup>
            <ListGroupItem>
              <p>
                <strong className=' text-capitalize'> New {infoValue}: </strong>
              </p>
              <Form>
                <Form.Group>
                  <Form.Control
                    value={newValue}
                    onChange={(e) => setNewValue(e.target.value)}
                  ></Form.Control>
                </Form.Group>
              </Form>

              <Button
                type='button'
                className='add-to-cart-btn'
                onClick={handleClick}
              >
                Save
              </Button>
            </ListGroupItem>
          </ListGroup>
        </LoginContainer>
      </Container>
    </>
  )
}

export default UserInfoEditScreen
