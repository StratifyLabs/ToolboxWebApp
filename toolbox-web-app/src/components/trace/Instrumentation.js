import React from 'react'
import { Container, Row, Col, Button } from 'react-bootstrap'

import InstrumentationDetail from './InstrumentationDetail'
import SaveSvg from '../../utility/SaveSvg'

const Instrumentation = props => {

  const model = props.model;

  function getId(name){
    return name.split(" ").join("-");
  }

  function onExportClicked(){
    SaveSvg(document.getElementsByClassName("Malloc-Perf")[0].firstChild, "Malloc-Perf")
  }

  return (
    <Container fluid>
      <Row>
        <h2 id="top">Instrumentation Report</h2> <Button onClick={onExportClicked} className="ml-3">Export</Button>
      </Row>
      <Row>
        <h6>Contents</h6>
      </Row>
      <Row>
        <ul>
          {
            props.model !== undefined && props.model.directiveList.map((directive, index) => {
              return (
                <li key={index}>
                  <a href={`#${getId(directive.name)}`}>{directive.name}</a>
                </li>
              )
            })
          }
        </ul>
      </Row>
      <Row>
        <Col md={10}>
          {
            props.model !== undefined && props.model.directiveList.map((directive, index) => {
              return (
                <InstrumentationDetail anchor={getId(directive.name)} key={`${directive}${index}`} directive={directive} data={model.data} log={model.log} />
              )
            })
          }
        </Col>
      </Row>
    </Container >
  )
}

export default Instrumentation
