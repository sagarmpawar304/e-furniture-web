import React from 'react'
import { Container, Row, Col } from 'react-bootstrap'
import { FaParachuteBox, FaPhoneSquareAlt } from 'react-icons/fa'
import { HiOutlineCurrencyRupee } from 'react-icons/hi'

const Services = () => {
  return (
    <section className='services'>
      <Container>
        <Row>
          <Col xs='4' className='mx-auto my-3 text-center'>
            <div className='service-icon'>
              <h3 className='mb-3'>
                <FaParachuteBox />
              </h3>
            </div>
            <h5 className='service-title'>Free Shipping</h5>
            <h5 className='service-info'>
              Free delivery for all on over ₹10,000/-
            </h5>
          </Col>

          <Col xs='4' className='mx-auto my-3 text-center'>
            <div className='service-icon'>
              <h3 className='mb-3'>
                <FaPhoneSquareAlt />
              </h3>
            </div>
            <h5 className='service-title'>online support 24/7</h5>
            <h5 className=' service-info'>
              we will assist you with your inquire
            </h5>
          </Col>

          <Col xs='4' className='mx-auto my-3 text-center'>
            <div className='service-icon'>
              <h3 className='mb-3'>
                <HiOutlineCurrencyRupee />
              </h3>
            </div>
            <h5 className='service-title'>money back gurantee</h5>
            <h5 className='service-info'>free 100% refund upto 30 days</h5>
          </Col>
        </Row>
      </Container>
    </section>
  )
}

export default Services
