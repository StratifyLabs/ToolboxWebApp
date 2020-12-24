import React from 'react'
import { Badge } from 'react-bootstrap'

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

export default LogEntry
