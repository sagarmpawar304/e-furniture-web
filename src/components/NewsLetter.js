import React from 'react'
import {
  Container,
  Col,
  Row,
  Form,
  InputGroup,
  FormControl,
  Button,
} from 'react-bootstrap'
import { FaEnvelope } from 'react-icons/fa'

const NewsLetter = () => {
  return (
    <section id='newsLetter' className='news-letter py-2 '>
      <Container>
        <Row>
          <Col xs='10' className='mx-auto text-center'>
            <h1 className='text-uppercase'>News Letter</h1>
            <p className='lead'>Please Subscribe To Get Exciting Offers</p>
            <Form className='mt-3'>
              <InputGroup>
                <FormControl placeholder='Enter your Email' />
                <InputGroup.Prepend>
                  <InputGroup.Text className='form-icon'>
                    <FaEnvelope />
                  </InputGroup.Text>
                </InputGroup.Prepend>
              </InputGroup>
              <Button className='btn-warning mt-4'>Subscribe</Button>
            </Form>
          </Col>
        </Row>
      </Container>
    </section>
  )
}

export default NewsLetter
