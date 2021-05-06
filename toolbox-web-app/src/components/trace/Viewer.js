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
import TraceLineParser from '../../parser/TraceLineParser'
import AppContainer from '../AppContainer'


const Viewer = props => {

  const buttonClass = "mr-2 mb-2 btn btn-secondary"
  const network = React.useContext(NetworkContext);
  const [view, setView] = React.useState("instrumentation");

  const [terminalContent, setTerminalContent] = React.useState("Hello");
  const incomingContent = React.useRef("");
  const model = React.useRef({ directiveList: [], data: [], log: []});

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
        incomingContent.current += incoming;
        setTerminalContent(incomingContent.current);
        TraceLineParser(model.current, incoming);
      }

      return () => {
        console.log("cleanup event source");
        source.close();
      }
    } else {
      //request the source path at /home/trace/${source}
      const path =`/fs${props.source}`;
      props.setBusy(true);
      console.log(`request ${network.host}${path}`)
      fetch(`${network.host}${path}`)
        .then(response => response.text())
        .then(result => {
          TraceLineParser(model.current, result);
          props.setBusy(false);
          setTerminalContent(result)
        })
    }

  }, [network.host, props.source])


  return (
    <div>
      <Row>
      {props.view === "terminal" && <Terminal content={terminalContent} isFilterDirective={false} isFilterData={true} />}
      {props.view === "instrumentation" && <Instrumentation model={model.current} />}
      </Row>
    </div>
  )
}

export default Viewer
