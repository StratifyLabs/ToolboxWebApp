import React from 'react'
import { Row, Button } from 'react-bootstrap'
import { FontAwesomeIcon as FA } from '@fortawesome/react-fontawesome'

const InternalJump = props => {

  function onButtonClick(){
    props.setPage(props.page);
  }

  return (
    <Row>
      <Button className="mb-2 btn-block text-left" variant='primary' onClick={onButtonClick}>{props.message} <FA className="float-right" icon={props.icon} /></Button>
    </Row>
  )
}

export default InternalJump
