import React from 'react'
import { Card, Form, Button } from 'react-bootstrap'

const Delegate = props => {

  return (
    <Form.Group controlId="formBasicCheckbox">
      <Form.Label>Delegate</Form.Label>
      <Form.Check
        type="radio"
        label="swd_stm32"
      />
      <Form.Check
        type="radio"
        label="swd_lpc"
      />
      <Form.Check
        type="radio"
        label="swd_atsam"
      />
      <Form.Check
        type="radio"
        label="isp_avr"
      />
      <Form.Check
        type="radio"
        label="swd_tbox"
      />
      <Form.Text className="text-muted">
        Select the delegate (interface/family) to use.
    </Form.Text>
    </Form.Group>
  )
}

export default Delegate
