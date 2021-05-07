import React from 'react'
import mermaid from "mermaid"
import { Col, Row } from 'react-bootstrap'
import AppContainer from '../AppContainer';

import SaveSvg from '../../utility/SaveSvg'

const SequenceDiagram = props => {

  const directive = props.directive;
  const data = props.data;
  const source = directive.sources;
  const svgId = `svg${directive.name.split(" ").join("-")}`;

  

  let graphDefinition = `sequenceDiagram\n`;
  for (let i in data) {
    if (data[i].name === source) {
      graphDefinition += (` ${data[i].value}\n`);
    }
  }

  React.useEffect(() => {
    mermaid.initialize({ startOnLoad: true });
    var output = document.getElementById("output")
    mermaid.render(svgId, graphDefinition, function (svgCode) {
      output.innerHTML = svgCode
    })

    //SaveSvg(document.getElementById(svgId), svgId);

  }, [graphDefinition]);

  return (
    <AppContainer>
      <Row>
        <Col>
          <div id="output" key="mermaidDiagram" />
        </Col>
      </Row>
    </AppContainer>
  )
}

export default SequenceDiagram
