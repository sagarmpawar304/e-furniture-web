import React, { useEffect, useState } from 'react'
import {
  Navbar,
  Row,
  Col,
  Image,
  ListGroup,
  ListGroupItem,
  Card,
} from 'react-bootstrap'
import { LinkContainer } from 'react-router-bootstrap'
import { useSelector } from 'react-redux'
import {
  FaHome,
  FaUser,
  FaUsers,
  FaProductHunt,
  FaChartLine,
  FaArrowRight,
  FaSuitcase,
  FaProjectDiagram,
  FaPlusCircle,
} from 'react-icons/fa'

const AdminScreen = ({ history }) => {
  const userLogin = useSelector((state) => state.userLogin)
  const { userInfo } = userLogin

  useEffect(() => {
    if (userInfo && !userInfo.isAdmin) {
      history.push('/')
    }
  }, [history, userInfo])
  return (
    <div className='d-none d-md-block admin-dashboard '>
      <div className=' admin-navbar '>
        <Navbar bg='dark' className='underline admin-navbar '>
          <Navbar.Brand>
            <LinkContainer to='/'>
              <Image src='../logo.png' fluid className=' md-logo' />
            </LinkContainer>
          </Navbar.Brand>
        </Navbar>
      </div>

      <div className='container-fluid admin-panel '>
        <Row>
          {/* sidebar */}
          <Col
            md='2'
            xl='2'
            className=' bg-dark  text-white admin-sidebar py-3 '
          >
            <ListGroup>
              <a href='#dashboard'>
                <ListGroupItem className='d-flex   bg-dark border-none  align-items-center py-0 admin-sidebar-item'>
                  <h6 className='mr-3'>
                    <FaHome />
                  </h6>
                  <h6>Home</h6>
                </ListGroupItem>
              </a>
            </ListGroup>

            <ListGroup>
              <a href='#products'>
                <ListGroupItem className='d-flex  bg-dark border-none  align-items-center py-0 admin-sidebar-item'>
                  <h6 className='mr-3'>
                    <FaProductHunt />
                  </h6>
                  <h6>Products</h6>
                </ListGroupItem>
              </a>
            </ListGroup>

            <ListGroup>
              <a href='#users'>
                <ListGroupItem className='d-flex  bg-dark  border-none  align-items-center py-0 admin-sidebar-item'>
                  <h6 className='mr-3'>
                    <FaUser />
                  </h6>
                  <h6>Users</h6>
                </ListGroupItem>
              </a>
            </ListGroup>

            <ListGroup>
              <a href='#Orders'>
                <ListGroupItem className='d-flex  bg-dark  border-none  align-items-center py-0 admin-sidebar-item'>
                  <h6 className='mr-3'>
                    <FaChartLine />
                  </h6>
                  <h6>orders</h6>
                </ListGroupItem>
              </a>
            </ListGroup>
          </Col>
          {/* end of sidebar */}

          {/* dashBoard */}
          <Col md='10' lg='40' className='ml-auto my-3'>
            <div className='dashboard my-3' id='dashboard'>
              <h2>
                DashBoard/<small>My DashBoard</small>
              </h2>
            </div>
            <Row>
              <Col md='6' lg='4' className='my-3'>
                {/* single card */}
                <Card className='bg-warning'>
                  <Card.Body>
                    <div className='d-flex justify-content-between body-icon'>
                      <h1>
                        <FaUsers />
                      </h1>
                      <div className='side-text self-align-center'>
                        <h3>20 </h3>
                        <h5>Users</h5>
                      </div>
                    </div>
                  </Card.Body>
                  <Card.Footer>
                    <div className='d-flex justify-content-between'>
                      <h6 className='mb-0'>Know More</h6>
                      <h6 className='mb-0'>
                        <FaArrowRight />
                      </h6>
                    </div>
                  </Card.Footer>
                </Card>
                {/* end of single card */}
              </Col>
              <Col md='6' lg='4' className='my-3'>
                {/* single card */}
                <Card className='bg-warning'>
                  <Card.Body>
                    <div className='d-flex justify-content-between body-icon'>
                      <h1>
                        <FaSuitcase />
                      </h1>
                      <div className='side-text self-align-center'>
                        <h3>20 </h3>
                        <h5>Orders</h5>
                      </div>
                    </div>
                  </Card.Body>
                  <Card.Footer>
                    <div className='d-flex justify-content-between'>
                      <h6 className='mb-0'>Know More</h6>
                      <h6 className='mb-0'>
                        <FaArrowRight />
                      </h6>
                    </div>
                  </Card.Footer>
                </Card>
                {/* end of single card */}
              </Col>
              <Col md='6' lg='4' className='my-3'>
                {/* single card */}
                <Card className='bg-warning'>
                  <Card.Body>
                    <div className='d-flex justify-content-between body-icon'>
                      <h1>
                        <FaProjectDiagram />
                      </h1>
                      <div className='side-text self-align-center'>
                        <h3>20 </h3>
                        <h5>Products</h5>
                      </div>
                    </div>
                  </Card.Body>
                  <Card.Footer>
                    <div className='d-flex justify-content-between'>
                      <h6 className='mb-0'>Know More</h6>
                      <h6 className='mb-0'>
                        <FaArrowRight />
                      </h6>
                    </div>
                  </Card.Footer>
                </Card>
                {/* end of single card */}
              </Col>
              <Col md='6' lg='4' className='my-3'>
                {/* single card */}
                <Card className='bg-warning'>
                  <Card.Body>
                    <div className='d-flex justify-content-between body-icon'>
                      <h1>
                        <FaPlusCircle />
                      </h1>
                      <div className='side-text self-align-center'>
                        <h3>Add New </h3>
                        <h5>Product</h5>
                      </div>
                    </div>
                  </Card.Body>
                  <Card.Footer>
                    <div className='d-flex justify-content-between'>
                      <h6 className='mb-0'>Know More</h6>
                      <h6 className='mb-0'>
                        <FaArrowRight />
                      </h6>
                    </div>
                  </Card.Footer>
                </Card>
                {/* end of single card */}
              </Col>
            </Row>
          </Col>
          {/* end of dashBoard */}
        </Row>
      </div>
    </div>
  )
}

export default AdminScreen
