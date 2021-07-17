import React, { useEffect } from 'react'
import { Navbar, Nav, NavItem, Row, Col, Image } from 'react-bootstrap'
import { LinkContainer } from 'react-router-bootstrap'
import { useSelector, useDispatch } from 'react-redux'

const AdminNavbar = ({ history }) => {
  const userLogin = useSelector((state) => state.userLogin)
  const { userInfo } = userLogin

  useEffect(() => {
    if (userInfo && !userInfo.isAdmin) {
      history.push('/')
    }
  }, [history, userInfo])
  return (
    <>
      {userInfo && userInfo.isAdmin && (
        <div className='container-lg d-none d-md-flex'>
          <Row>
            <Col xs='12'>
              <Navbar variant='dark' className=''>
                <Navbar.Brand>
                  <LinkContainer to='/'>
                    <Image
                      src='../logo.png'
                      fluid
                      className='xs-logo md-logo'
                    />
                  </LinkContainer>
                </Navbar.Brand>
              </Navbar>
            </Col>
          </Row>

          <Row>
            <Col md='3'>
              <h5>Sidebar</h5>
            </Col>
            <Col md='9'>
              <Image src='/images/girl-5.jpg' fluid />
            </Col>
          </Row>
        </div>
      )}
    </>
  )
}

export default AdminNavbar
