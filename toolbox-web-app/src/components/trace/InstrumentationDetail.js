import React from 'react'
import { Container, Button, Col, Row, ListGroup } from 'react-bootstrap'
import { FontAwesomeIcon as FA } from '@fortawesome/react-fontawesome'
import {
  faTimes,
} from '@fortawesome/free-solid-svg-icons'

import Heap from '../instrumentation/Heap'
import Plot from '../instrumentation/Plot'
import Log from '../instrumentation/Log'
import Logic from '../instrumentation/Logic'
import Histogram from '../instrumentation/Histogram'
import SequenceDiagram from '../instrumentation/SequenceDiagram'

const InstrumentationDetail = props => {

  const directive = props.directive;

  function getComponent() {
    switch (directive.type) {
      case "sequenceDiagram":
        return <SequenceDiagram directive={props.directive} data={props.data} />
      case "heap":
        return <Heap directive={props.directive} data={props.data} />
      case "plot":
        return <Plot directive={props.directive} data={props.data} />
      case "histogram":
      case "hist":
        return <Histogram directive={props.directive} data={props.data} />
      case "log":
        return <Log directive={props.directive} log={props.log} />
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

  return (<Container className="mb-3">
    <Row>{getComponent()}</Row>
  </Container>)
}

export default InstrumentationDetail
