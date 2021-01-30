import React from 'react'
import { Card, Form, Button } from 'react-bootstrap'

const Delegate = props => {

  return (
    <Form.Group controlId="formBasicCheckbox">
      <Form.Label>interface/family</Form.Label>
      <Form.Check
        type="radio"
        label="swd/stm32"
      />
      <Form.Check
        type="radio"
        label="swd/lpc"
      />
      <Form.Check
        type="radio"
        label="swd/atsam"
      />
      <Form.Check
        type="radio"
        label="isp/avr"
      />
      <Form.Check
        type="radio"
        label="swd/tbox"
      />
      <Form.Text className="text-muted">
        Select the delegate (interface/family) to use.
    </Form.Text>
    </Form.Group>
  )
}

export default Delegate
