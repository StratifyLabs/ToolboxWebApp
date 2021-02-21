import React from 'react'
import { Button, ButtonGroup, ToggleButton, Col, Row, ListGroup } from 'react-bootstrap'

import { FontAwesomeIcon as FA } from '@fortawesome/react-fontawesome'
import {
  faBolt,
  faInfo,
  faEraser,
  faEye,
  faRedo,
  faSlidersH,
  faFolderOpen,
  faHistory,
  faChevronRight
} from '@fortawesome/free-solid-svg-icons'

import AppContainer from '../components/AppContainer'
import FlashFileUpload from '../components/FlashFileUpload'
import { NetworkContext } from '../contexts/NetworkContext'


const Flash = props => {

  const [activeFile, setActiveFile] = React.useState("");
  const [list, setList] = React.useState({});
  const network = React.useContext(NetworkContext);

  async function loadDirectory(directory) {
    setActiveFile("");
    console.log(`request /fs/home/${directory}`)
    await fetch(`${network.host}/fs/home/${directory}`)
      .then(response => response.json())
      .catch(e => setList({}))
      .then(result => {
        setList(result)
      })
  }

  React.useEffect(() => {
    loadDirectory("flash")
  }, [network.host])

  function handleDiretoryChanged(value) {
    loadDirectory(value);
  }

  function onButtonClicked(){

  }

  function onProgramClicked(){

  }

  function onEraseClicked(){

  }

  function onReadClicked(){

  }

  function onResetClicked(){

  }

  function onPingClicked(){
    
  }


  const buttonClass ="mr-2 mb-2 btn"

  return (
    <AppContainer>
        <Row className="mb-3">
        <Col>
          <Button className={buttonClass} ><FA icon={faSlidersH} onClick={onButtonClicked} /> Flash Settings</Button>
        </Col>
      </Row>

      <Row className="mb-3">
        <Col>
          <Button className={buttonClass} variant="success" ><FA icon={faBolt} onClick={onProgramClicked} /> Program</Button>
          <Button className={buttonClass} variant="danger" ><FA icon={faEraser} onClick={onEraseClicked} /> Erase</Button>
          <Button className={buttonClass}><FA icon={faEye} onClick={onReadClicked} /> Read</Button>
          <Button className={buttonClass}><FA icon={faRedo} onClick={onResetClicked} /> Reset</Button>
          <Button className={buttonClass}><FA icon={faInfo} onClick={onPingClicked} /> Ping</Button>
        </Col>
      </Row>
      <FlashFileUpload />
      <h4><FA icon={faHistory} /> Flash History</h4>
      <Row>
        <Col md={8} >
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
