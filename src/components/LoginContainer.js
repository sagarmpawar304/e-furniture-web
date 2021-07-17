import React from 'react'
import { Container, Row, Col } from 'react-bootstrap'

const LoginContainer = ({ children }) => {
  return (
    <Container>
      <Row className='justify-content-md-center my-4 login-container'>
        <Col xs={12} md={6} className='mx-auto'>
          {children}
        </Col>
      </Row>
    </Container>
  )
}

export default LoginContainer
