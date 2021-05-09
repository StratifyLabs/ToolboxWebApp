import React from 'react'
import mermaid from "mermaid"
import { Col, Row } from 'react-bootstrap'
import AppContainer from '../AppContainer';

import SaveSvg from '../../utility/SaveSvg'

const SequenceDiagram = props => {

  const directive = props.directive;
  const data = props.model.data;
  const source = directive.sources;
  const id = props.svgId;
  const addExportFunction = props.addExportFunction;

  let graphDefinition = `sequenceDiagram\n`;
  for (let i in data) {
    if (data[i].name === source) {
      graphDefinition += (` ${data[i].value}\n`);
    }
  }

  function exportFunction(){
    SaveSvg(document.getElementById(id), id);
  }

  React.useEffect(() => {
    mermaid.initialize({ startOnLoad: true });
    var output = document.getElementById("output")
    mermaid.render(id, graphDefinition, function (svgCode) {
      output.innerHTML = svgCode
    })

    addExportFunction(exportFunction);


  }, [graphDefinition, id, addExportFunction]);

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
