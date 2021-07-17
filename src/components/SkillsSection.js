import React from 'react'
import { Container, Row, Col } from 'react-bootstrap'
import { FaTruck, FaMoneyCheck, FaAward } from 'react-icons/fa'

const SkillsSection = () => {
  return (
    <section className='skills py-2'>
      <Container>
        <Row>
          <Col xs='4' md='4' className='mx-auto my-1 d-flex'>
            <Row>
              <Col xs='12' className='skill-icon mx-3 mb-1 '>
                <h2>
                  <FaTruck />
                </h2>
              </Col>
              <Col xs='12' className='skill-text'>
                <h4 className='text-capitalize'>pan india delivery</h4>
                <p>We deliver anywhere in India at your convenience</p>
              </Col>
            </Row>
          </Col>

          <Col xs='4' md='4' className='mx-auto my-1 d-flex'>
            <Row>
              <Col xs='12' className='skill-icon mx-3'>
                <h2>
                  <FaMoneyCheck />
                </h2>
              </Col>
              <Col xs='12' className='skill-text'>
                <h4 className='text-capitalize'>Pay at your ease</h4>
                <p>With Easy Payment Options shopping gets more fun.</p>
              </Col>
            </Row>
          </Col>

          <Col xs='4' md='4' className='mx-auto my-1 d-flex '>
            <Row>
              <Col xs='12' className='skill-icon mx-3  '>
                <h2>
                  <FaAward />
                </h2>
              </Col>
              <Col xs='12' className='skill-text '>
                <h4 className='text-capitalize '>36 months warranty</h4>
                <p>We assure that it stays young always.</p>
              </Col>
            </Row>
          </Col>
        </Row>
      </Container>
    </section>
  )
}

export default SkillsSection
