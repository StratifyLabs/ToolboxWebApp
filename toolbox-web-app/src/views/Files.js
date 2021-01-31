import React from 'react'
import { ListGroup, Button, Col, Row, Badge } from 'react-bootstrap'
import { FontAwesomeIcon as FA } from '@fortawesome/react-fontawesome'
import {
  faDownload,
  faTrash,
  faCopy,
  faChevronRight
} from '@fortawesome/free-solid-svg-icons'

import AppContainer from '../components/AppContainer'
import UserFileUpload from '../components/UserFileUpload'
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
      <div>
        <h4><Badge variant="secondary">{props.name}</Badge></h4>
        <ListGroup variant="flush">
          <ListGroup.Item>Size: {props.info.size}</ListGroup.Item>
          <ListGroup.Item>Mode: {props.info.mode}</ListGroup.Item>
          <ListGroup.Item>type: {props.info.type}</ListGroup.Item>
          <ListGroup.Item>
            <a href={`${network.host}/fs${location}/${props.name}`} target='_blank' className="btn btn-primary mr-2"><FA icon={faDownload} /></a>
            <Button variant="danger"><FA icon={faTrash} /></Button></ListGroup.Item>
          <ListGroup.Item action><small>curl {network.host}/fs{props.location}/{props.name} <FA icon={faCopy} /></small></ListGroup.Item>
          <hr />
        </ListGroup>
      </div>
    )
  }

  const DirectoryItem = props => {
    return (
      <ListGroup.Item action active={props.location == props.path} onClick={() => props.onClick(props.path, props.readonly)}>{props.path}
        <span className="float-right">
          <FA icon={faChevronRight} />
        </span>
      </ListGroup.Item>
    )
  }

  return (
    <AppContainer>
      <Row>
        <Col md={8}>
          <h4>Upload User Files</h4>
          <UserFileUpload />
        </Col>
      </Row>
      <Row>
        <Col md={4}>
          <h4>Browse Files</h4>
          <ListGroup variant="flush">
            <DirectoryItem location={location} onClick={loadDirectory} readonly={true} path="/bin" />
            <DirectoryItem location={location} onClick={loadDirectory} readonly={true} path="/assets" />
            <DirectoryItem location={location} onClick={loadDirectory} readonly={false} path="/home/bin" />
            <DirectoryItem location={location} onClick={loadDirectory} readonly={false} path="/home/assets" />
            <DirectoryItem location={location} onClick={loadDirectory} readonly={false} path="/home/debug" />
            <DirectoryItem location={location} onClick={loadDirectory} readonly={false} path="/home/flash" />
            <DirectoryItem location={location} onClick={loadDirectory} readonly={false} path="/home/settings" />
            <DirectoryItem location={location} onClick={loadDirectory} readonly={false} path="/home/tmp" />
            <DirectoryItem location={location} onClick={loadDirectory} readonly={false} path="/home/trace" />
            <DirectoryItem location={location} onClick={loadDirectory} readonly={false} path="/home/user" />
            <DirectoryItem location={location} onClick={loadDirectory} readonly={false} path="/home/web" />
            <hr />
          </ListGroup>
        </Col>
        <Col md={4}>
          <h4><Badge variant="secondary">{location}</Badge></h4>
          <ListGroup variant="flush">
            {list !== undefined && Object.keys(list).map((key, index) => {
              return <ListGroup.Item
                key={key}
                action={true}
                active={key == activeFile}
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
        <Col md={4}>
          {activeFile !== "" && <Details location={location} name={activeFile} info={list[activeFile]} />}
        </Col>
      </Row>
    </AppContainer>
  )
}

export default Files
