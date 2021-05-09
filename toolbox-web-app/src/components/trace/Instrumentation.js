import React from 'react'
import { Container, Row, Col, Button } from 'react-bootstrap'

import InstrumentationDetail from './InstrumentationDetail'
import SaveSvg from '../../utility/SaveSvg'
import SaveMarkdown from '../../utility/SaveMarkdown'

const Instrumentation = props => {

  const model = props.model;
  const setBusy = props.setBusy;

  let exportArray = [];

  function getId(name) {
    return name.split(" ").join("-");
  }

  function onExportClicked() {
    //need to export a md file as well as SVG files for all the charts
    let md = "# Instrumentation Report\n\n";
    
    //Table of Contents
    for(let i in model.directiveList){
      const directive = model.directiveList[i];
      md += ` - [${directive.name}](${getId(directive.name)})\n`
    }

    md += '\n';
      
    //Actual contents
    for(let i in model.directiveList){
      const directive = model.directiveList[i];
      md += `## ${directive.name}\n`;
      md += `\n`;
      md += `${directive.description}\n\n`
      md += `![${directive.name} SVG Diagram](svg${getId(directive.name)}.svg)\n\n`
    }

    md += '\n';

    for(let i in exportArray){
      exportArray[i]()
    }

    SaveMarkdown(md, `InstrumentationReport.md`);
  }

  function addExportFunction(exportFunction){
    exportArray.push(exportFunction);
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
            model !== undefined && model.directiveList.map((directive, index) => {
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
            model !== undefined && model.directiveList.map((directive, index) => {
              return (
                <InstrumentationDetail
                  addExportFunction={addExportFunction}
                  anchor={getId(directive.name)}
                  key={`${directive}${index}`}
                  directive={directive}
                  model={model}
                />
              )
            })
          }
        </Col>
      </Row>
    </Container >
  )
}

export default Instrumentation
