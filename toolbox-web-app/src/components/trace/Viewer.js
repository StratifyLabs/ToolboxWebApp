import React from 'react'

import { Row } from 'react-bootstrap'

import { NetworkContext } from '../../contexts/NetworkContext'

import Terminal from './Terminal'
import Instrumentation from './Instrumentation'
import TraceLineParser from '../../utility/TraceLineParser'


const Viewer = props => {

  const network = React.useContext(NetworkContext);
  const incomingContent = React.useRef("");
  const [terminalContent, setTerminalContent] = React.useState("");
  const model = React.useRef({ directiveList: [], data: [], log: [], isRealTime: props.source === "realTime"});

  const source = props.source;
  const isRealTime = source === "realTime";
  const setBusy = props.setBusy;

  //use state to save the result
  React.useEffect(() => {
    console.log(`source is ${source}`)
    if (isRealTime) {
      console.log("create new event source");
      setBusy(true);
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
        setTerminalContent(incoming);
        TraceLineParser(model.current, incoming);
      }

      return () => {
        setBusy(false);
        console.log("cleanup event source");
        source.close();
      }
    } else {
      //request the source path at /home/trace/${source}
      const path =`/fs${source}`;
      setBusy(true);
      console.log(`request ${network.host}${path}`)
      fetch(`${network.host}${path}`)
        .then(response => response.text())
        .then(result => {
          TraceLineParser(model.current, result);
          setBusy(false);
          setTerminalContent(result)
        })
    }

  }, [network.host, setBusy, source, isRealTime])


  return (
    <div>
      <Row>
      {props.view === "terminal" && <Terminal setBusy={setBusy} content={terminalContent} isFilterDirective={false} isFilterData={false} />}
      {props.view === "instrumentation" && <Instrumentation setBusy={setBusy} model={model.current} />}
      </Row>
    </div>
  )
}

export default Viewer
