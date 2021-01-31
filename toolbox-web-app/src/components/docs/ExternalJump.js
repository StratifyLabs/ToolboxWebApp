import React from 'react'
import { Row } from 'react-bootstrap'
import { FontAwesomeIcon as FA } from '@fortawesome/react-fontawesome'

const ExternalJump = props => {


  return (
    <Row className="mt-3 mb-3">
      <a href={props.link} target="_blank" rel="noreferrer" className="mb-2 btn btn-block text-left btn-link" >{props.message} <FA className="float-right" icon={props.icon} /></a>
    </Row>
  )
}

export default ExternalJump
