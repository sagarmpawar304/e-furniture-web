import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { Form, Button } from 'react-bootstrap'
import ShippingContainer from '../../components/LoginContainer'
import CheckOutSteps from '../../components/CheckoutSteps'
import { addPaymentMethod } from '../../actions/cartActions'

const PaymentScreen = ({ history }) => {
  const [paymentMethod, setPaymentMethod] = useState('PayPal')

  const dispatch = useDispatch()

  const submitHandler = (e) => {
    e.preventDefault()
    dispatch(addPaymentMethod(paymentMethod))
    history.push('/placeorder')
  }
  return (
    <>
      <CheckOutSteps step1 step2 step3 />
      <ShippingContainer>
        <h2>Payment Method</h2>
        <Form onSubmit={submitHandler}>
          <Form.Group>
            <Form.Label as='legend'>Select Method</Form.Label>
            <Form.Group className='d-flex align-items-center'>
              <Form.Check
                type='radio'
                name='paymentMethod'
                value='PayPal'
                className=' mr-3'
                onChange={(e) => setPaymentMethod(e.target.value)}
              ></Form.Check>
              <Form.Check.Label>PayPal or Credit Card</Form.Check.Label>
            </Form.Group>
          </Form.Group>
          <Button variant='primary' type='submit'>
            Continue
          </Button>
        </Form>
      </ShippingContainer>
    </>
  )
}

export default PaymentScreen
