import React from 'react'
import { Button, Card } from 'react-bootstrap'

import LogEntry from './LogEntry'

const Log = props => {
  return (
    <Card className="mb-2">
      <Card.Header>Log
        <span className="float-right">
          <Button className="btn-sm mr-2" variant="dark">debug</Button>
          <Button className="btn-sm mr-2" variant="info">info</Button>
          <Button className="btn-sm mr-2" variant="warning">warning</Button>
          <Button className="btn-sm mr-2" variant="danger">error</Button>
        </span></Card.Header>
      <Card.Body>
        <ul>
          <LogEntry type="debug" text="Hello" />
          <LogEntry type="info" text="World" />
          <LogEntry type="warning" text="Uh oh" />
          <LogEntry type="error" text="An error happened" />
        </ul>

      </Card.Body>
    </Card>
  )
}

export default Log
