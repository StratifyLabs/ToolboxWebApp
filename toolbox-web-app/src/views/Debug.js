import React from 'react'
import { Button, Col, ListGroup, Row } from 'react-bootstrap'

import { FontAwesomeIcon as FA } from '@fortawesome/react-fontawesome'
import {
  faTerminal,
  faChartArea,
  faMicrochip,
  faHandPaper,
  faShoePrints,
  faTimes,
  faRunning
} from '@fortawesome/free-solid-svg-icons'

import AppContainer from '../components/AppContainer'


const Debug = props => {

  const buttonClass ="mr-2 btn"

  function onTerminalClicked(){
    props.setPage("Terminal")
  }

  function onInsightsClicked(){
    props.setPage("Insights")
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
      <Button className={buttonClass} variant="success" ><FA icon={faTerminal} onClick={onTerminalClicked} /> Connect</Button>
      <Button className={buttonClass}><FA icon={faRunning} onClick={onInsightsClicked} /> Run</Button>
      <Button className={buttonClass}><FA icon={faHandPaper} onClick={onInsightsClicked} /> Halt</Button>
      <Button className={buttonClass}><FA icon={faShoePrints} onClick={onInsightsClicked} /> Step</Button>
      <Button className={buttonClass}><FA icon={faChartArea} onClick={onInsightsClicked} /> Resume</Button>
      <Button className={buttonClass} variant="danger"><FA icon={faTimes} onClick={onInsightsClicked} /> Abort</Button>
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
