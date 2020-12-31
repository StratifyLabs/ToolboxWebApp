import React from 'react'
import { Button, Card, Badge } from 'react-bootstrap'

const LogEntry = props => {
  var variant;
  var label;
  if (props.type === "debug") {
    variant = "dark"
  } else if (props.type === "info") {
    variant = "info"
  } else if (props.type === "warning") {
    variant = "warning"
  } else if (props.type === "error") {
    variant = "danger"
  } else {
    variant = "primary"
  }

  return (
    <li>
      timestamp: {props.text} <Badge pill variant={variant} className="float-right">{props.type}</Badge> 
    </li>
  )
}

const Log = props => {
  return (
    <div>
        <ul>
          <LogEntry type="debug" text="Hello" />
          <LogEntry type="info" text="World" />
          <LogEntry type="warning" text="Uh oh" />
          <LogEntry type="error" text="An error happened" />
        </ul>
    </div>
  )
}

export default Log
