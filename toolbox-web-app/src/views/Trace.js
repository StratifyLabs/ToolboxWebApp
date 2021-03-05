import React from 'react'
import { Button, Col, Row } from 'react-bootstrap'

import { FontAwesomeIcon as FA } from '@fortawesome/react-fontawesome'
import {
  faTerminal,
  faHistory,
  faChartArea
} from '@fortawesome/free-solid-svg-icons'

import AppContainer from '../components/AppContainer'
import { NetworkContext } from '../contexts/NetworkContext'
import Terminal from '../components/trace/Terminal'


const Trace = props => {

  const buttonClass = "mr-2 mb-2 btn"
  const network = React.useContext(NetworkContext);
  const [view, setView] = React.useState("history");
  const [terminalContent, setTerminalContent] = React.useState("");

  const incomingContent = React.useRef("");

  //use state to save the result
  React.useEffect(() => {
    console.log("create new event source");

    const source = new EventSource(`${network.host}/trace.sse/reset`);

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

  }, [network.host])


  function onTerminalClicked() {
    setView("terminal");
  }

  function onInsightsClicked() {
    setView("insights");
  }

  function onHistoryClicked() {
    setView("history");
  }

  return (
    <AppContainer>
      <Row className="mb-3">
        <Col>
          <Button className={buttonClass} onClick={onHistoryClicked} ><FA icon={faHistory} /> History</Button>
          <Button className={buttonClass} onClick={onTerminalClicked} ><FA icon={faTerminal} /> Output</Button>
          <Button className={buttonClass} onClick={onInsightsClicked} ><FA icon={faChartArea} /> Insights</Button>
        </Col>
      </Row>
      { view === "history" && <div>
        <h4><FA icon={faHistory} /> Trace History</h4>
        <Row>
          <Col md={4}>
            <p>Trace</p>
          </Col>
          <Col md={5}>
            <p>Details</p>
          </Col>
        </Row>
      </div>}

      { view === "terminal" && <Terminal content={terminalContent} />}

    </AppContainer>
  )
}

export default Trace
