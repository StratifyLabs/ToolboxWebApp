import React from 'react'
import { Container, Row, Col, Button } from 'react-bootstrap'

import InstrumentationDetail from './InstrumentationDetail'
import SaveSvg from '../../utility/SaveSvg'

const Instrumentation = props => {

  const model = props.model;
  const setBusy = props.setBusy;

  function getId(name){
    return name.split(" ").join("-");
  }

  function onExportClicked(){
    //need to export a md file as well as SVG files for all the charts
    SaveSvg(document.getElementsByClassName("Malloc-Perf")[0].firstChild, "Malloc-Perf")
  }
  React.useEffect(() => {
    // code to run after render goes here
    setBusy(false);
  }, [setBusy]);

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
                <InstrumentationDetail anchor={getId(directive.name)} key={`${directive}${index}`} directive={directive} model={props.model} />
              )
            })
          }
        </Col>
      </Row>
    </Container >
  )
}

export default Instrumentation
