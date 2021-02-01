import React from 'react'
import { Row, Button } from 'react-bootstrap'
import { FontAwesomeIcon as FA } from '@fortawesome/react-fontawesome'
import {
  faCopy
} from '@fortawesome/free-solid-svg-icons'

const CopyCommand = props => {


  return (
    <Row className="mt-3 mb-3">
      <Button className="mb-2 btn-block text-left" variant="success">{props.message} <FA className="float-right" icon={faCopy} /></Button>
    </Row>
  )
}

export default CopyCommand
