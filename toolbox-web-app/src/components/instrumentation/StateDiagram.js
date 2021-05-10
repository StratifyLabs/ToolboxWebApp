import React from 'react'
import mermaid from "mermaid"
import { Col, Row } from 'react-bootstrap'
import AppContainer from '../AppContainer';

import SaveSvg from '../../utility/SaveSvg'

const StateDiagram = props => {

  const directive = props.directive;
  const data = props.model.data;
  const source = directive.sources;
  const id = props.svgId;
  const addExportFunction = props.addExportFunction;
  const containerId = `container${id}`

  let graphDefinition = `stateDiagram-v2\n`;
  for (let i in data) {
    if (data[i].name === source) {
      graphDefinition += (` ${data[i].value}\n`);
    }
  }
  console.log(`state diagram def is ${graphDefinition}`)



  React.useEffect(() => {
    mermaid.initialize({ startOnLoad: true });
    var output = document.getElementById(containerId)
    mermaid.render(id, graphDefinition, function (svgCode) {
      output.innerHTML = svgCode
    })

    function exportFunction(){
      SaveSvg(document.getElementById(id), id);
    }

    addExportFunction(exportFunction);

  }, [graphDefinition, id, containerId, addExportFunction]);

  return (
    <AppContainer>
      <Row>
        <Col>
          <div id={containerId} key="mermaidDiagram" />
        </Col>
      </Row>
    </AppContainer>
  )
}

export default StateDiagram
