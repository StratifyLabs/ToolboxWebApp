import React from 'react'
import { Card } from 'react-bootstrap'

const Raw = props => {

  console.log(`config is ${props.configuration}`);
  //const displayText = String(props.configuration.data.text.join('')).replace("\n", "<br /> ");
  const displayText = String(props.configuration.data.text.join(''));

  return (
    <Card className="mb-2">
      <Card.Header>printf(): {props.name}</Card.Header>
      <Card.Body>
        <pre>
          {displayText}
        </pre>
      </Card.Body>
    </Card>
  )
}

export default Raw
