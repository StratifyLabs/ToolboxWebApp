import React from 'react'
import { Form } from 'react-bootstrap'

const TextInput = props => {
  return (
    <Form.Group controlId="bitrate">
    <Form.Label>{props.name}</Form.Label>
      <Form.Control type="input" placeholder={props.placeholder} defaultValue={props.value} onChange={(e) => props.onChange(e.currentTarget.value)}/>
      <Form.Text className="text-muted">
        {props.description}
      </Form.Text>
    </Form.Group>
  )
}

export default TextInput
