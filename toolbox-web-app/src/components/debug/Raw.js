import React from 'react'
import { Card } from 'react-bootstrap'

const Raw = props => {
  return (
    <Card className="mb-2">
      <Card.Header>Raw</Card.Header>
      <Card.Body>
        <pre>Hello World.<br />Hello World.<br />Hello World.<br />Hello World.</pre>
      </Card.Body>
    </Card>
  )
}

export default Raw
