import React from 'react'
import { Card, Form, Button } from 'react-bootstrap'

const Bitrate = props => {


  return (
    <Form.Group controlId="bitrate">
    <Form.Label>Bitrate</Form.Label>
      <Form.Control type="input" placeholder="2000000" />
      <Form.Text className="text-muted">
        Bitrate in bits/second.
      </Form.Text>
    </Form.Group>
  )
}

export default Bitrate
