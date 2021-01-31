import React from 'react'
import { ListGroup, Button, Col, Row } from 'react-bootstrap'
import { FontAwesomeIcon as FA } from '@fortawesome/react-fontawesome'
import {
  faDownload,
  faTrash,
  faCopy
} from '@fortawesome/free-solid-svg-icons'

import AppContainer from '../components/AppContainer'
import { NetworkContext } from '../contexts/NetworkContext'


const Files = props => {


  const [list, setList] = React.useState();
  const [location, setLocation] = React.useState("");
  const [activeFile, setActiveFile] = React.useState("");
  const [isReadOnly, setReadOnly] = React.useState("");
  const network = React.useContext(NetworkContext);

  function loadDirectory(path, readonly) {
    setLocation(path);
    setReadOnly(readonly);
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

    const network = React.useContext(NetworkContext)

    return (
      <ListGroup variant="flush">
        <ListGroup.Item>Name: {props.name}</ListGroup.Item>
        <ListGroup.Item>Size: {props.info.size}</ListGroup.Item>
        <ListGroup.Item>Mode: {props.info.mode}</ListGroup.Item>
        <ListGroup.Item>type: {props.info.type}</ListGroup.Item>
        <ListGroup.Item action><small>curl {network.host}/fs{props.location}/{props.name} <FA icon={faCopy} /></small></ListGroup.Item>
        <hr />
      </ListGroup>
    )
  }

  const DirectoryItem = props => {
    return (
      <ListGroup.Item action active={props.location == props.path} onClick={() => props.onClick(props.path, props.readonly)}>{props.path}</ListGroup.Item>
    )
  }

  return (
    <AppContainer>
      <Row>
        <Col md={4}>
          <p>Select Directory</p>
          <ListGroup variant="flush">
            <DirectoryItem location={props.location} onClick={loadDirectory} readonly={true} path="/bin" />
            <DirectoryItem location={props.location} onClick={loadDirectory} readonly={true} path="/assets" />
            <DirectoryItem location={props.location} onClick={loadDirectory} readonly={false} path="/home/bin" />
            <DirectoryItem location={props.location} onClick={loadDirectory} readonly={false} path="/home/assets" />
            <DirectoryItem location={props.location} onClick={loadDirectory} readonly={false} path="/home/debug" />
            <DirectoryItem location={props.location} onClick={loadDirectory} readonly={false} path="/home/flash" />
            <DirectoryItem location={props.location} onClick={loadDirectory} readonly={false} path="/home/settings" />
            <DirectoryItem location={props.location} onClick={loadDirectory} readonly={false} path="/home/tmp" />
            <DirectoryItem location={props.location} onClick={loadDirectory} readonly={false} path="/home/trace" />
            <DirectoryItem location={props.location} onClick={loadDirectory} readonly={false} path="/home/user" />
            <DirectoryItem location={props.location} onClick={loadDirectory} readonly={false} path="/home/web" />
            <hr />
        </ListGroup>
        </Col>
        <Col md={4}>
          <p>{location}</p>
          <ListGroup variant="flush">
            {list !== undefined && Object.keys(list).map((key, index) => {
              return <ListGroup.Item
                key={key}
                action={true}
                active={key == activeFile}
                onClick={() => setActiveFile(key)}
              > {key} 
              <span className="float-right">
                <a href={`${network.host}/fs${location}/${key}`} target='_blank' variant="secondary" className="btn btn-secondary mr-2"><FA icon={faDownload} /></a>
                { isReadOnly === false && <Button variant="secondary"><FA icon={faTrash} /></Button> }
              </span>
              </ListGroup.Item>
            })}
            {list === {} && <ListGroup.Item>No Files Here</ListGroup.Item>}
            <hr />
        </ListGroup>
        </Col>
        <Col md={4}>         
          {activeFile !== "" && <Details location={location} name={activeFile} info={list[activeFile]} />}
        </Col>
      </Row>
    </AppContainer>
  )
}

export default Files
