import React from 'react'
import { Container, Row } from 'react-bootstrap'

import { FontAwesomeIcon as FA } from '@fortawesome/react-fontawesome'
import {
  faArrowCircleUp
} from '@fortawesome/free-solid-svg-icons'

import Heap from '../instrumentation/Heap'
import Plot from '../instrumentation/Plot'
import Log from '../instrumentation/Log'
import Logic from '../instrumentation/Logic'
import Histogram from '../instrumentation/Histogram'
import SequenceDiagram from '../instrumentation/SequenceDiagram'
import EventCounter from '../instrumentation/EventCounter'

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
      case "eventCounter":
        return <EventCounter directive={props.directive} data={props.data} />
      default:
        break;
    }

    return null;
  }


  return (<Container className="mb-3">
    <Row><h3 id={props.anchor}>{props.directive.name} </h3><small className="text-sm"><a href='#top'><FA icon={faArrowCircleUp} /> top</a></small></Row>
    <Row><span>{props.directive.description}</span></Row>
    <Row className="mb-3">{getComponent()}</Row>
    <hr />
  </Container>)
}

export default InstrumentationDetail
