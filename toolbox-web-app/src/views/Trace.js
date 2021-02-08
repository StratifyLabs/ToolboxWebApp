import React from 'react'
import { Button, Col, Row } from 'react-bootstrap'

import { FontAwesomeIcon as FA } from '@fortawesome/react-fontawesome'
import {
  faTerminal,
  faHistory,
  faChartArea
} from '@fortawesome/free-solid-svg-icons'

import AppContainer from '../components/AppContainer'


const Trace = props => {

  const buttonClass ="mr-2 mb-2 btn"

  

  function onTerminalClicked(){
    props.setPage("Terminal")
  }

  function onInsightsClicked(){
    props.setPage("Insights")
  }

  return (
    <AppContainer>
    <Row className="mb-3">
      <Col>
      <Button className={buttonClass} onClick={onTerminalClicked} ><FA icon={faTerminal} /> <span className="d-none d-md-block">Real-Time Trace Output</span></Button>
      <Button className={buttonClass} onClick={onInsightsClicked} ><FA icon={faChartArea} /> <span className="d-none d-md-block">Real-Time Insights</span></Button>
      </Col>
      </Row>
      <h4><FA icon={faHistory} /> Trace History</h4>
      <Row>
      <Col md={4}>
      <p>Trace</p>
      </Col>
      <Col md={5}>
      <p>Details</p>
      </Col>
    </Row>
  </AppContainer>
  )
}

export default Trace
