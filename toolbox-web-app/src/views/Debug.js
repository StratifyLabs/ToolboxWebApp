import React from 'react'
import { Button, Col, ListGroup, Row } from 'react-bootstrap'

import { FontAwesomeIcon as FA } from '@fortawesome/react-fontawesome'
import {
  faBug,
  faMicrochip,
  faTableTennis,
  faLayerGroup
} from '@fortawesome/free-solid-svg-icons'

import AppContainer from '../components/AppContainer'


const Debug = props => {

  const buttonClass ="mr-2 mb-2 btn"

  function onPingClicked(){

  }

  function onCoreDumpClicked(){

  }

  function onBackTraceClicked(){

  }

  const state  = {
    pc: 0x08000000,
    r0: 1000,
    r1: 2000,
    r2: 3000,
    r3: 4000,
    r4: 5000,
    r5: 6000,
    r6: 7000,
    r7: 8000,
    r8: 9000,
  }


  function pad(num, size, base) {
    num = num.toString(base);
    while (num.length < size) num = "0" + num;
    return num;
}


  return (
    <AppContainer>
    <Row className="mb-3">
      <Col>
      <Button className={buttonClass} onClick={onPingClicked}  ><FA icon={faTableTennis} /> Ping</Button>
      <Button className={buttonClass} onClick={onCoreDumpClicked}  ><FA icon={faBug} /> Core Dump</Button>
      <Button className={buttonClass} onClick={onBackTraceClicked} ><FA icon={faLayerGroup} /> Back Trace</Button>
      </Col>
      </Row>
      <h4><FA icon={faMicrochip} /> Core State</h4>
      <Row>
      <Col md={8}>
      <ListGroup>
        {Object.keys(state).map((key, index) => {
            return <ListGroup.Item key={key}><strong>{key}:</strong> {`${pad(state[key],8,16)}h / ${state[key]}d` }</ListGroup.Item>
          })}
      </ListGroup>
      </Col>
    </Row>
  </AppContainer>
  )
}

export default Debug
