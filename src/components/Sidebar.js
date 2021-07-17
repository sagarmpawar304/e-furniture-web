import React, { useState } from 'react'
import { Row, Col, Image } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { logout } from '../actions/userActions'

import { data } from '../links'
import SidebarSubmenus from './Sidebar-submenus'

const Sidebar = ({ closeSidebar }) => {
  const [showLinks, setShowLinks] = useState(false)

  const dispatch = useDispatch()
  const handleClick = () => {
    closeSidebar()
  }
  return (
    <>
      <div className={`sidebar-wrapper `} onClick={handleClick}></div>

      <div className='sidebar d-flex flex-column py-2 '>
        {/* profile image and name */}
        <Row className='user-sidebar-info align-items-center my-1 pr-0'>
          <Col xs='5'>
            <Image
              src='/images/testImage.jpg'
              fluid
              roundedCircle
              className='user-sidebar-image mr-0'
            />
          </Col>
          <Col xs='7' className='mr-0 pl-0'>
            <h5 className='pl-0'>Hello, Sagar</h5>
          </Col>
        </Row>
        {/* end of profile image and name */}
        <div className='line-break'></div>

        {/* Sidebar Items */}

        <Row className='pl-4'>
          {/* home link */}
          <Col xs='12'>
            <Link to='/' onClick={closeSidebar}>
              <h5 className='sidebar-link'>Home</h5>
            </Link>
          </Col>
          {/* end of home link */}

          {/* shop by categories */}
          <Col xs='12' onClick={() => setShowLinks(!showLinks)}>
            <h5>Shop By Categories</h5>
          </Col>
          {/* end of shop by categories */}

          {/* links */}
          <Col xs='12'>
            {showLinks &&
              data.map((item, index) => {
                return (
                  <SidebarSubmenus
                    key={index}
                    {...item}
                    closeSidebar={closeSidebar}
                  />
                )
              })}
          </Col>
          {/* end of links */}
        </Row>
        <div className='line-break'></div>
        {/* user sidebar */}

        {/* end of user sidebar */}
        <Row className='pl-4'>
          <Col xs='12'>
            <Link to='/users/orders' onClick={closeSidebar}>
              <h5 className='sidebar-link'>Your Orders</h5>
            </Link>

            <Link to='/wishlist' onClick={closeSidebar}>
              <h5 className='sidebar-link'>Your WishList</h5>
            </Link>

            <Link to='/users' onClick={closeSidebar}>
              <h5 className='sidebar-link'>Your Account</h5>
            </Link>

            <h5 className='text-warning' onClick={() => dispatch(logout())}>
              Log Out
            </h5>
          </Col>
        </Row>
        {/* end of Sidebar Items */}
      </div>
    </>
  )
}

export default Sidebar
