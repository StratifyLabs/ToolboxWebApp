import React from 'react'
import mermaid from "mermaid"
import { Button, Col, Row, ListGroup } from 'react-bootstrap'
import AppContainer from '../AppContainer';

const SequenceDiagram = props => {

  const directive = props.directive;
  const data = props.data;
  const source = directive.sources;

  let graphDefinition = `sequenceDiagram\n`;
  for (let i in data) {
    if (data[i].name === source) {
      graphDefinition += (` ${data[i].value}\n`);
    }
  }

  React.useEffect(() => {
    mermaid.initialize({ startOnLoad: true });
    var output = document.getElementById("output")
    mermaid.render("theGraph", graphDefinition, function (svgCode) {
      output.innerHTML = svgCode
    })

  }, [graphDefinition]);

  return (
    <AppContainer>
      <Row>
        <h3>{props.directive.name}</h3>
      </Row>
      <Row>
        <Col>
          <div id="output" key="mermaidDiagram" />
        </Col>
      </Row>
      <Row>
        <Col md={12} className="text-center">
          <span>{props.directive.description}</span>
        </Col>
      </Row>
    </AppContainer>
  )
}

export default SequenceDiagram
