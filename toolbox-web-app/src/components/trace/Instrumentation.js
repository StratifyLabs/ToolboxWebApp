import React from 'react'
import { Container, Card, Button, Row, Col } from 'react-bootstrap'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faTerminal,
  faChartLine,
  faWaveSquare,
  faStop,
  faChartBar,
  faList,
  faExchangeAlt,
  faMap
} from '@fortawesome/free-solid-svg-icons'

import InstrumentationDetail from './InstrumentationDetail'


const Instrumentation = props => {

  const model = props.model;

  return (
    <Container fluid>
      <Row>
        <h2>Instrumentation Report</h2>
      </Row>
      <Row>
        <h6>Contents</h6>
      </Row>
      <Row>
        <ul>
          {
            props.model !== undefined && props.model.directiveList.map((directive, index) => {
              return (
                <li>
                  {directive.name}
                </li>
              )
            })
          }
        </ul>
      </Row>
      <Row>
        <Col md={10}>
        {
          props.model !== undefined && props.model.directiveList.map((directive, index) => {
            return (
              <Col md={12} className="mb-3">
                <InstrumentationDetail key={`${directive}${index}`} directive={directive} data={model.data} log={model.log} />
              </Col>
            )
          })
        }
        </Col>
      </Row>
    </Container >
  )
}

export default Instrumentation
