import React from 'react'
import { Alert } from 'react-bootstrap'

const Message = ({ variant, message, className }) => {
  return (
    <Alert className={className} variant={variant}>
      {message}
    </Alert>
  )
}

Message.defaultProps = {
  variant: 'info',
}

export default Message
