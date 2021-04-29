import React from 'react'

import { Button, Col, Row, ListGroup } from 'react-bootstrap'

import { NetworkContext } from '../../contexts/NetworkContext'
import { FontAwesomeIcon as FA } from '@fortawesome/react-fontawesome'
import {
  faTerminal,
  faChartArea,
  faSpinner
} from '@fortawesome/free-solid-svg-icons'

import Terminal from './Terminal'
import Instrumentation from './Instrumentation'


const Viewer = props => {

  const buttonClass = "mr-2 mb-2 btn btn-secondary"
  const network = React.useContext(NetworkContext);
  const [view, setView] = React.useState("instrumentation");
  const [isBusy, setBusy] = React.useState(false);

  console.log("redraw terminal");
  const [terminalContent, setTerminalContent] = React.useState("Hello");
  const incomingContent = React.useRef("");
  const model = React.useRef({ directiveList: [], data: []});


  function parseLine(line){
    const elementList = line.split(':');
    if( elementList.length > 1 ){
      const first = String(elementList[0]).toUpperCase() ;
      if( first === 'DIRECTIVE' || first === 'DIR' ){
        if( elementList.length > 3 ){
          const type = elementList[1];
          const name = elementList[2];
          const sources = elementList[3];
          const description = elementList.length > 4 ? elementList[4] : "";
          const entry = {type: type, name: name, sources: sources, description: description};
          model.current.directiveList.push(entry);
        }
        // DIR:<type>:<name>
      } else if ( first === 'DAT' || first === 'DATA' || first === 'D' ){
        if( elementList.length > 2){
          const name = elementList[1];
          const value = elementList.splice(2).join(":");
          const entry = { name: name, value: value };
          model.current.data.push(entry);
        }
      }
    }
  }

  //use state to save the result
  React.useEffect(() => {
    if (props.source == "realTime") {
      console.log("create new event source");
      const source = new EventSource(`${network.host}/trace.sse/stream/reset/true`);

      source.onopen = function (event) {
        console.log(`connected to ${network.host}`);
      }

      source.addEventListener('error', function (e) {
        console.log(`failed to connect to ${network.host}`);
      }, false);

      source.onmessage = function (event) {
        const incoming = atob(String(event.data));
        console.log(incoming);
        incomingContent.current += incoming;
        setTerminalContent(incomingContent.current);
      }

      return () => {
        console.log("cleanup event source");
        source.close();
      }
    } else {
      //request the source path at /home/trace/${source}
      const path =`/fs${props.source}`;
      setBusy(true);
      console.log(`request ${network.host}${path}`)
      fetch(`${network.host}${path}`)
        .then(response => response.text())
        .then(result => {
          const lines = result.split('\n');
          for(let i in lines){
            parseLine(lines[i]);
          }
          setBusy(false);
          setTerminalContent(result)
        })
    }

  }, [network.host, props.source])

  function onTerminalClicked() {
    setView("terminal");
  }

  function onInstrumentationClicked() {
    setView("instrumentation");
  }

  return (
    <div>
      <Row className="mb-3">
        <Col>
          <Button className={buttonClass} onClick={onTerminalClicked} ><FA icon={faTerminal} /> Output</Button>
          <Button className={buttonClass} onClick={onInstrumentationClicked} ><FA icon={faChartArea} /> Instrumentation</Button>
          {isBusy && <span ><FA icon={faSpinner} spin={true} /></span> }
        </Col>
      </Row>
      <Row>
      {view === "terminal" && <Terminal content={terminalContent} isFilterDirective={false} isFilterData={true} />}
      {view === "instrumentation" && <Instrumentation model={model.current} />}
      </Row>
    </div>
  )
}

export default Viewer
