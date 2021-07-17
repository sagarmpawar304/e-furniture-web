import React from 'react'
import { NavLink, Nav, Image, Navbar } from 'react-bootstrap'
import { LinkContainer } from 'react-router-bootstrap'

const CheckoutSteps = ({ step1, step2, step3, step4 }) => {
  return (
    <Navbar variant='dark' bg='dark'>
      <Navbar.Brand>
        <LinkContainer to='/'>
          <Image src='../logo.png' fluid className='xs-logo md-logo' />
        </LinkContainer>
      </Navbar.Brand>
      <Nav>
        {/* step1 -check user logged in */}
        <Nav.Item>
          {step1 ? (
            <LinkContainer to='/login'>
              <NavLink>Login</NavLink>
            </LinkContainer>
          ) : (
            <NavLink disabled>Login</NavLink>
          )}
        </Nav.Item>

        {/* step2 add shipping address */}
        <Nav.Item>
          {step2 ? (
            <LinkContainer to='/shipping'>
              <NavLink>Shipping</NavLink>
            </LinkContainer>
          ) : (
            <NavLink disabled>Shipping</NavLink>
          )}
        </Nav.Item>

        {/* step3 payment method */}
        <Nav.Item>
          {step3 ? (
            <LinkContainer to='/payment'>
              <NavLink>Payment</NavLink>
            </LinkContainer>
          ) : (
            <NavLink disabled>Payment</NavLink>
          )}
        </Nav.Item>

        <Nav.Item>
          {step4 ? (
            <LinkContainer to='/placeorder'>
              <NavLink>Place Order</NavLink>
            </LinkContainer>
          ) : (
            <NavLink disabled>Place Order</NavLink>
          )}
        </Nav.Item>
      </Nav>
    </Navbar>
  )
}

export default CheckoutSteps
