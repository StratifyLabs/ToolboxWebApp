import React from 'react'
import { Container, Card } from 'react-bootstrap'
import '../../App.scss';

const Terminal = props => {

  return (
    <div>
    <Card className="mb-2">
      <Card.Header>printf(): {props.name}</Card.Header>
      <Card.Body className="scroll">
        <pre>
          {String(props.configuration.data.text.join(''))}
        </pre>
      </Card.Body>
    </Card>
    </div>
  )
}

export default Terminal
