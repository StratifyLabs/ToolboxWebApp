import React from 'react'
import { ButtonGroup, ToggleButton, Col, Row, ListGroup } from 'react-bootstrap'

import { FontAwesomeIcon as FA } from '@fortawesome/react-fontawesome'
import {
  faFolderOpen,
  faHistory,
  faChevronRight
} from '@fortawesome/free-solid-svg-icons'

import AppContainer from '../components/AppContainer'
import UserFileUpload from '../components/UserFileUpload'
import { NetworkContext } from '../contexts/NetworkContext'


const Flash = props => {

  const [radioValue, setRadioValue] = React.useState('flash');
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

  function handleUploadChanged(){
    if( radioValue !==  `user` ){
      console.log("set radio to user");
      setRadioValue(`user`);
      loadDirectory(`user`);
    } else {
      console.log("load directory");
      loadDirectory(`user`);
    }
  }

  React.useEffect(() => {
    loadDirectory(radioValue)
  }, [radioValue, network.host])

  function handleDiretoryChanged(value) {
    setRadioValue(value);
    loadDirectory(value);
  }

  const radios = [
    { name: 'Flash History', value: 'flash' },
    { name: 'User Files', value: 'user' }
  ];

  return (
    <AppContainer>
      <Row className="mb-3">
        <Col md={8}>
          <h4>Upload User Files</h4>
          <UserFileUpload onFileComplete={handleUploadChanged} />
        </Col>
      </Row>
      <ButtonGroup toggle className="mb-3" >
        {radios.map((radio, idx) => (
          <ToggleButton
            key={idx}
            type="radio"
            variant="primary"
            name="radio"
            value={radio.value}
            checked={radioValue === radio.value}
            onChange={(e) => handleDiretoryChanged(e.currentTarget.value)}
          >
            {radio.name}
          </ToggleButton>
        ))}
      </ButtonGroup>
      { radioValue === "flash" && <h4><FA icon={faHistory} /> Flash History</h4>}
      { radioValue === "user" && <h4><FA icon={faFolderOpen} /> User Files</h4>}
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
            {list === {} && <ListGroup.Item>No Files Here</ListGroup.Item>}
            <hr />
          </ListGroup>
        </Col>
      </Row>

    </AppContainer>
  )
}

export default Flash
