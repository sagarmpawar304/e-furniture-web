import React from 'react'
import { Container, Col, Row, Image, Carousel } from 'react-bootstrap'

const Partners = () => {
  return (
    <section className='partners py-5'>
      <Container>
        <Row>
          <Col xs='6' md='6' lg='4' className='mx-auto'>
            <Carousel>
              <Carousel.Item>
                <Image
                  src='/images/company-logos/company-logo-1.png'
                  className='d-block w-100'
                  alt='partners'
                />
              </Carousel.Item>

              <Carousel.Item>
                <Image
                  src='/images/company-logos/company-logo-2.png'
                  className='d-block w-100'
                  alt='partners'
                />
              </Carousel.Item>

              <Carousel.Item>
                <Image
                  src='/images/company-logos/company-logo-3.png'
                  className='d-block w-100'
                  alt='partners'
                />
              </Carousel.Item>

              <Carousel.Item>
                <Image
                  src='/images/company-logos/company-logo-4.png'
                  className='d-block w-100'
                  alt='partners'
                />
              </Carousel.Item>
            </Carousel>
          </Col>
        </Row>
      </Container>
    </section>
  )
}

export default Partners
