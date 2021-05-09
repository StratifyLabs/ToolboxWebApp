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
  //console.log(`directive detail ${JSON.stringify(directive)}`)

  function getComponent() {
    switch (directive.type) {
      case "sequenceDiagram":
        return <SequenceDiagram directive={directive} model={props.model} />
      case "heap":
        return <Heap directive={directive} model={props.model}  />
      case "plot":
        return <Plot directive={directive} model={props.model}  />
      case "histogram":
      case "hist":
        return <Histogram directive={directive} model={props.model}  />
      case "log":
        return <Log directive={directive} model={props.model}  />
      case "logic":
        return <Logic directive={directive} model={props.model}  />
      case "eventCounter":
        return <EventCounter directive={directive} model={props.model}  />
      default:
        break;
    }

    return null;
  }


  return (<Container className="mb-3">
    <Row><h3 id={props.anchor}>{directive.name} </h3><small className="text-sm"><a href='#top'><FA icon={faArrowCircleUp} /> top</a></small></Row>
    <Row><span>{directive.description}</span></Row>
    <Row className="mb-3">{getComponent()}</Row>
    <hr />
  </Container>)
}

export default InstrumentationDetail
