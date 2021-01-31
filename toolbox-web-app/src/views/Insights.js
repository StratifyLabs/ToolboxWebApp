import React from 'react'
import { Container, Card, Button, Row, Col } from 'react-bootstrap'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faTerminal,
  faChartLine,
  faWaveSquare,
  faStop,
  faChartBar,
  faList
} from '@fortawesome/free-solid-svg-icons'




const Summary = props => {

  function getIcon(type) {
    switch (type) {
      case "plot":
        return faChartLine;
      case "histogram":
        return faChartBar;
      case "terminal":
        return faTerminal;
      case "logic":
        return faWaveSquare;
      case "log":
        return faList;
    }

    return faStop;
  }


  return (
    <Card className="text-center">
      <Card.Header>
        <h5>{props.name} {props.configuration.type}</h5>
      </Card.Header>
      <Card.Body>
        <Button variant="outline-primary" onClick={() => { props.setInsightDetail(props.name, props.configuration) }}><FontAwesomeIcon icon={getIcon(props.configuration.type)} size="4x" /></Button>
      </Card.Body>
      <Card.Footer>
        {
          Object.keys(props.configuration.data).map((key, index) => {
            return <span>{key} </span>
          })
        }
      </Card.Footer>
    </Card>
  )
}



const Insights = props => {

  const configuration = props.configuration;

  return (
    <Container fluid>
      <Row className="mt-2">
        {
          configuration !== undefined && Object.keys(configuration).map((key, index) => {
            return (
              <Col md={4} className="mb-3">
                <Summary name={key} setInsightDetail={props.setInsightDetail} configuration={configuration[key]} key={key + index} />
              </Col>
            )
          })
        }
      </Row>
    </Container >
  )
}

export default Insights
