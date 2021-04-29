import React from 'react'
import mermaid from "mermaid"
import { Button, Col, Row, ListGroup } from 'react-bootstrap'

const SequenceDiagram = props => {

  const directive = props.directive;
  const data = props.data;
  const source = directive.sources;

  let graphDefinition =`sequenceDiagram\n`;
  for(let i in data){
    if (data[i].name === source) {
      graphDefinition += (` ${data[i].value}\n`);
    }
  }


  React.useEffect(() => {
    console.log("init mermaid");
    mermaid.initialize({startOnLoad: true});


    var output = document.getElementById("output")

    console.log(graphDefinition);

    mermaid.render("theGraph", graphDefinition, function(svgCode) {
      output.innerHTML = svgCode
    })

  }, [graphDefinition]);

  return (
    <Col>
    <div id="output" key="mermaidDiagram" />
    </Col>
  )
}

export default SequenceDiagram
