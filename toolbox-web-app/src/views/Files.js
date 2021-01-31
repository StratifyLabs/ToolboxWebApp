import React from 'react'
import { ListGroup, Button, Col, Row } from 'react-bootstrap'
import { FontAwesomeIcon as FA } from '@fortawesome/react-fontawesome'
import {
  faDownload,
  faTrash
} from '@fortawesome/free-solid-svg-icons'

import AppContainer from '../components/AppContainer'
import { NetworkContext } from '../contexts/NetworkContext'


const Files = props => {

  const buttonClass = "mb-3 btn-block"

  const [list, setList] = React.useState();
  const [location, setLocation] = React.useState("");
  const [activeFile, setActiveFile] = React.useState("");
  const network = React.useContext(NetworkContext);

  function loadDirectory(path) {
    setLocation(path);
    setActiveFile("");
    console.log(`request ${path}`)
    fetch(`${network.host}/fs${path}`)
      .then(response => response.json())
      .catch(e => setList({}))
      .then(result => {
        setList(result)
      })
  }

  const Details = props => {
    return (
      <ListGroup>
        <ListGroup.Item>Size: {props.info.size}</ListGroup.Item>
        <ListGroup.Item>Mode: {props.info.mode}</ListGroup.Item>
        <ListGroup.Item>type: {props.info.type}</ListGroup.Item>
      </ListGroup>
    )
  }

  const DirectoryItem = props => {
    return (
      <ListGroup.Item action active={props.location == props.path} onClick={() => props.onClick(props.path)}>{props.path}</ListGroup.Item>
    )
  }

  return (
    <AppContainer>
      <Row>
        <Col md={4}>
          <p>Select Directory</p>
          <ListGroup>
            <DirectoryItem location={props.location} onClick={loadDirectory} path="/bin" />
            <DirectoryItem location={props.location} onClick={loadDirectory} path="/assets" />
            <DirectoryItem location={props.location} onClick={loadDirectory} path="/home/bin" />
            <DirectoryItem location={props.location} onClick={loadDirectory} path="/home/assets" />
            <DirectoryItem location={props.location} onClick={loadDirectory} path="/home/debug" />
            <DirectoryItem location={props.location} onClick={loadDirectory} path="/home/flash" />
            <DirectoryItem location={props.location} onClick={loadDirectory} path="/home/settings" />
            <DirectoryItem location={props.location} onClick={loadDirectory} path="/home/tmp" />
            <DirectoryItem location={props.location} onClick={loadDirectory} path="/home/trace" />
            <DirectoryItem location={props.location} onClick={loadDirectory} path="/home/user" />
          </ListGroup>
        </Col>
        <Col md={4}>
          <p>{location}</p>
          <ListGroup>
            {list !== undefined && Object.keys(list).map((key, index) => {
              return <ListGroup.Item
                key={key}
                action={true}
                active={key == activeFile}
                onClick={() => setActiveFile(key)}
              > {key} </ListGroup.Item>
            })}
            {list === {} && <ListGroup.Item>No Files Here</ListGroup.Item>}
          </ListGroup>
        </Col>
        <Col md={4}>
          <Row>
            <Button className="mb-2 ml-3 mr-3 btn-block" variant="success" disabled={activeFile === ""}><FA icon={faDownload} /> Download</Button>
          </Row>
          <Row>
            <Button className="mb-2 ml-3 mr-3 btn-block" variant="danger" disabled={activeFile === ""}><FA icon={faTrash} /> Delete</Button>
          </Row>
         
            {activeFile !== "" && <Details info={list[activeFile]} />}
       
        </Col>
      </Row>
    </AppContainer>
  )
}

export default Files
