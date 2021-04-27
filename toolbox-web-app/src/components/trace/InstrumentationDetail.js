import React from 'react'
import { Button, Col, Row, ListGroup } from 'react-bootstrap'
import { FontAwesomeIcon as FA } from '@fortawesome/react-fontawesome'
import {
  faTimes,
} from '@fortawesome/free-solid-svg-icons'

import Plot from '../instrumentation/Plot'
import Logic from '../instrumentation/Logic'
import Histogram from '../instrumentation/Histogram'

const InstrumentationDetail = props => {

  const directive = props.directive;
  const configuration = props.configuration;
  const buttonClass = "mr-2 mb-2 btn btn-secondary"

  function getComponent() {
    switch (directive.type) {
      case "plot":
        return <Plot directive={props.directive} data={props.data} />
      case "histogram":
      case "hist":
        return <Histogram directive={props.directive} data={props.data} />
      case "logic":
        return <Logic directive={props.directive} data={props.data} />
      default:
        break;
    }

    return null;
  }

  function onBackClicked() {
    props.backClicked();
  }

  return (<div>
    <Row>
      <Col>
        
      </Col>
    </Row>
    <Row className="justify-content-between">
      <Col><h3><Button variant="light" onClick={onBackClicked} ><FA icon={faTimes} /></Button> {props.directive.description}</h3></Col>
    </Row>
    <Row>{getComponent()}</Row>


  </div>)
}

export default InstrumentationDetail
