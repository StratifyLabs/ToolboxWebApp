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

const Summary = props => {

  function getIcon(type) {
    switch (type) {
      case "plot":
        return faChartLine;
      case "hist":
      case "histogram":
        return faChartBar;
      case "terminal":
        return faTerminal;
      case "sequenceDiagram":
        return faExchangeAlt;
      case "heap":
        return faMap;
      case "logic":
        return faWaveSquare;
      case "log":
        return faList;
      default:
        break;
    }
    return faStop;
  }


  return (
    <Card className="text-center">
      <Card.Header>
        <h5>{props.name}</h5>
      </Card.Header>
      <Card.Body>
        <Button variant="outline-primary" onClick={() => { props.setView(props.directiveIndex) }}><FontAwesomeIcon icon={getIcon(props.type)} size="4x" /></Button>
      </Card.Body>
    </Card>
  )
}


const Grid = props => {
  return (<Row className="mt-2">
    {
      props.model !== undefined && props.model.directiveList.map((directive, index) => {
        return (
          <Col md={4} className="mb-3">
            <Summary name={directive.name} type={directive.type} directiveIndex={index} key={index} setView={props.setView} />
          </Col>
        )
      })
    }
  </Row>
  )
}


const Instrumentation = props => {

  const model = props.model;

  const [view, setView] = React.useState("overview");

  function onBackClicked() {
    setView("overview");
  }

  return (
    <Container fluid>
      { view === "overview" && <Grid model={props.model} setView={setView} />}
      { view !== "overview" && <InstrumentationDetail directive={model.directiveList[view]} data={model.data} backClicked={onBackClicked} />}

    </Container >
  )
}

export default Instrumentation
