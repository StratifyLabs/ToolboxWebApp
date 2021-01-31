import React from 'react'
import { Card, Form, Button } from 'react-bootstrap'

const Bitrate = props => {

  return (
  <Form.Group controlId="formBasicCheckbox">
    <Form.Check 
    type="checkbox" 
    label={props.name} 
    defaultChecked={props.value}
    onChange={(e) => props.toggleValue()}
     />
    <Form.Text className="text-muted">
      {props.children}
    </Form.Text>
  </Form.Group>
  )
}

export default Bitrate
