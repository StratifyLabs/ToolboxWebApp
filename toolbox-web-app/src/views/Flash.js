import React from 'react'
import { Button, Col, Row, ListGroup } from 'react-bootstrap'

import { FontAwesomeIcon as FA } from '@fortawesome/react-fontawesome'
import {
  faBolt,
  faInfo,
  faEraser,
  faEye,
  faRedo,
  faSlidersH,
  faHistory,
  faChevronRight
} from '@fortawesome/free-solid-svg-icons'

import AppContainer from '../components/AppContainer'
import FlashFileUpload from '../components/FlashFileUpload'
import { NetworkContext } from '../contexts/NetworkContext'
import ApiRequest from '../components/ApiRequest'
import TextInput from '../components/settings/TextInput'


const Flash = props => {

  const [activeFile, setActiveFile] = React.useState("");
  const [list, setList] = React.useState({});
  const [requestPath, setRequestPath] = React.useState("");
  const [readSize, setReadSize] = React.useState("256");
  const [flashPath, setFlashPath] = React.useState("/home/flash/latest.elf");
  const [readStart, setReadStart] = React.useState("0x08000000");
  const [flashResult, setFlashResult] = React.useState(null);
  const network = React.useContext(NetworkContext);

  async function loadDirectory(directory) {
    setActiveFile("");
    console.log(`request /fs.json/home/${directory}`)
    await fetch(`${network.host}/fs.json/home/${directory}`)
      .then(response => response.json())
      .catch(e => setList({}))
      .then(result => {
        setList(result)
      })
  }

  React.useEffect(() => {
    loadDirectory("flash")
  }, [network.host])

  function onSettingsClicked() {
    console.log("Clicked Settings")
    props.setPage("Settings");
  }

  function onProgramClicked() {
    setRequestPath(`/flash/program/fs${flashPath}/`)
  }

  function onEraseClicked() {
    setRequestPath(`/flash/erase/start/${readStart}/size/${readSize}`)
  }

  function onReadClicked() {
    setRequestPath(`/flash/read/start/${readStart}/size/${readSize}`)
  }

  function onResetClicked() {
    setRequestPath("/flash/reset")
  }

  function onPingClicked() { 
    setRequestPath("/flash/ping")
  }

  function readSizeChanged(value) {
    setReadSize(value);
  }

  function readStartChanged(value) {
    setReadStart(value);
  }

  function flashProgramComplete(result) {
    console.log(`set flash result ${result}`)
    setFlashResult(result);
  }

  const buttonClass = "mr-2 mb-2 btn"

  return (
    <AppContainer>
      <Row className="mb-3">
        <Col md={8}>
          <Button className={buttonClass} onClick={onSettingsClicked} ><FA icon={faSlidersH} /> Flash Settings</Button>

          <FlashFileUpload onProgramComplete={flashProgramComplete} start={readStart}/>
          <TextInput
            name="Program/Read/Erase Start (0x)"
            placeholder="0x00000000"
            value={readStart}
            onChange={(value) => readStartChanged(value)}
            description="Start address (in hex) for read operations" />
          <TextInput
            name="Erase/Read Size"
            placeholder="256"
            value={readSize}
            onChange={(value) => readSizeChanged(value)}
            description="Read page size" />
          <TextInput
            name="Flash Path"
            placeholder="/home/flash/latest.bin"
            value={flashPath}
            onChange={(value) => setFlashPath(value)}
            description="Toolbox path to flash image" />

          <Row className="mb-3">
            <Col>
              <Button className={buttonClass} variant="success" onClick={onProgramClicked} ><FA icon={faBolt} /> Program</Button>
              <Button className={buttonClass} variant="danger" onClick={onEraseClicked} ><FA icon={faEraser} /> Erase</Button>
              <Button className={buttonClass} onClick={onReadClicked}><FA icon={faEye} /> Read</Button>
              <Button className={buttonClass} onClick={onResetClicked}><FA icon={faRedo} /> Reset</Button>
              <Button className={buttonClass} onClick={onPingClicked}><FA icon={faInfo} /> Ping</Button>
            </Col>
          </Row>
          <ApiRequest path={requestPath} response={flashResult} />
          <h4><FA icon={faHistory} /> Flash History</h4>

          <ListGroup variant="flush">
            {list !== undefined && Object.keys(list).map((key, index) => {
              return <ListGroup.Item
                key={key}
                action={true}
                active={key === activeFile}
                onClick={() => setActiveFile(key)}
              > {key}
                <span className="float-right">
                  <FA icon={faChevronRight} />
                </span>
              </ListGroup.Item>
            })}
            {(list === {} || list === undefined) && <ListGroup.Item>No Files Here</ListGroup.Item>}
            <hr />
          </ListGroup>
        </Col>
      </Row>

    </AppContainer>
  )
}

export default Flash
