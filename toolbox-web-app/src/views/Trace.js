import React from 'react'
import { Button, Col, Row, ListGroup } from 'react-bootstrap'

import { FontAwesomeIcon as FA } from '@fortawesome/react-fontawesome'
import {
  faTerminal,
  faHistory,
  faChartArea,
  faChevronRight,
  faWaveSquare
} from '@fortawesome/free-solid-svg-icons'

import AppContainer from '../components/AppContainer'
import { NetworkContext } from '../contexts/NetworkContext'
import Viewer from '../components/trace/Viewer'


const Trace = props => {

  const buttonClass = "mr-2 mb-2 btn"
  const network = React.useContext(NetworkContext);
  const [list, setList] = React.useState();
  const [activeFile, setActiveFile] = React.useState("");
  const [view, setView] = React.useState("history");

  async function loadTraceHistory() {
    const path = "/home/trace"
    setActiveFile("");
    console.log(`request ${path}`)
    if (path !== "") {
      await fetch(`${network.host}/fs.json${path}`)
        .then(response => response.json())
        .catch(e => setList({}))
        .then(result => {
          setList(result)
        })
    }
  }


  function onHistoryClicked() {
    loadTraceHistory();
    setView("history");
  }

  function onRealTimeClicked() {
    setView("viewer");
  }

  function onFileClicked(key){
    console.log(`view /home/trace/${key}`);
    setView("/home/trace/" + key);
    setActiveFile(key);
  }

  return (
    <AppContainer>
      <Row className="mb-3">
        <Col>
          <Button className={buttonClass} onClick={onHistoryClicked} ><FA icon={faHistory} /> History</Button>
          <Button className={buttonClass} onClick={onRealTimeClicked} ><FA icon={faWaveSquare} /> Real Time</Button>
        </Col>
      </Row>
      { view === "history" && <div>
        <h4><FA icon={faHistory} /> Trace History</h4>
        <Row>
          <Col md={8}>
            <ListGroup variant="flush">
              {list !== undefined && Object.keys(list).map((key, index) => {
                return <ListGroup.Item
                  key={key}
                  action={true}
                  active={key === activeFile}
                  onClick={() => onFileClicked(key)}
                > {key}
                  <span className="float-right">
                    <FA icon={faChevronRight} />
                  </span>
                </ListGroup.Item>
              })}
              {list === {} && <ListGroup.Item>No Trace Files Here</ListGroup.Item>}
              <hr />
            </ListGroup>
          </Col>
        </Row>
      </div>}

      { view === "realTime" && <Viewer source="realTime" />}
      { String(view).startsWith("/home/trace") && <Viewer source={view} /> }

    </AppContainer>
  )
}

export default Trace
