import React from 'react'
import { Form } from 'react-bootstrap'

const Bitrate = props => {

  console.log(`boolean value ${props.name} is ${props.value}`)

  return (
  <Form.Group controlId="formBasicCheckbox">
    <Form.Check 
    type="checkbox" 
    label={props.name} 
    checked={props.value}
    onChange={(e) => props.toggleValue()}
     />
    <Form.Text className="text-muted">
      {props.children}
    </Form.Text>
  </Form.Group>
  )
}

export default Bitrate
