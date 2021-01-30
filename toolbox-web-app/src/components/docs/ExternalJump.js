import React from 'react'
import { Row, Button } from 'react-bootstrap'
import { FontAwesomeIcon as FA } from '@fortawesome/react-fontawesome'

const ExternalJump = props => {


  return (
    <Row>
      <a href={props.link} target="_blank" className="mb-2 btn btn-block text-left btn-link" >{props.message} <FA className="float-right" icon={props.icon} /></a>
    </Row>
  )
}

export default ExternalJump
