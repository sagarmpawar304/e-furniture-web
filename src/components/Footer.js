import React from 'react'
import { Container, Row, Col } from 'react-bootstrap'
import {
  FaFacebookSquare,
  FaTwitterSquare,
  FaGooglePlusSquare,
  FaInstagramSquare,
  FaYoutubeSquare,
  FaMap,
  FaEnvelopeOpen,
  FaPhoneSquare,
} from 'react-icons/fa'

const Footer = () => {
  return (
    <footer className='footer py-3'>
      <Container>
        <Row>
          <Col xs='11' className='mx-auto my-3 text-center'>
            <div className='footer-title text-uppercase text-yellow'>
              <h1>E-furno</h1>
            </div>
            <div className='social-icons mt-3 d-flex justify-content-center'>
              <a href='https://www.facebook.in'>
                <h4 className='mx-2 footer-icon'>
                  <FaFacebookSquare />
                </h4>
              </a>

              <a href='https://www.googlelus.in'>
                <h4 className='mx-2 footer-icon'>
                  <FaGooglePlusSquare />
                </h4>
              </a>

              <a href='https://www.twitter.in'>
                {' '}
                <h4 className='mx-2 footer-icon'>
                  <FaTwitterSquare />
                </h4>
              </a>

              <a href='https://www.instagram.in'>
                <h4 className='mx-2 footer-icon'>
                  <FaInstagramSquare />
                </h4>
              </a>

              <a href='https://www.youtube.in'>
                <h4 className='mx-2 footer-icon'>
                  <FaYoutubeSquare />
                </h4>
              </a>
            </div>
            <div className='contacts mt-3 text-light '>
              <div className='contact d-flex align-items-center '>
                <h5 className='mr-2  footer-icon'>
                  <FaMap />
                </h5>
                <h6 className='text-left'>
                  E-furno building,2nd Street, Bandra West,Mumbai-400 001
                </h6>
              </div>

              <div className='contact d-flex align-items-center'>
                <h5 className='mr-2 footer-icon'>
                  <FaPhoneSquare />
                </h5>
                <h6>Phone: (0201) 123456</h6>
              </div>

              <div className='contact d-flex align-items-center'>
                <h5 className='mr-2  footer-icon'>
                  <FaEnvelopeOpen />
                </h5>
                <h6>Email : email@email.com</h6>
              </div>
            </div>
          </Col>
        </Row>
      </Container>
    </footer>
  )
}

export default Footer
