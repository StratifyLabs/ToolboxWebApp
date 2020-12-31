import React from 'react'
import { Container, ListGroup, ButtonGroup, Button, Badge, Row } from 'react-bootstrap'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTerminal, faNetworkWired, faChartArea, faFolderOpen, faInfoCircle } from '@fortawesome/free-solid-svg-icons'


const Item = props => {
  return (
    <ListGroup.Item action onClick={() => props.setPage(props.name)} active={props.page == props.name}>
      <FontAwesomeIcon icon={props.icon} /> {props.name}
      </ListGroup.Item>
  )
}

const SideBar = props => {


  return (
    <div>
      <h5 className="ml-2 mr-2">Stratify Toolbox</h5>
      <ListGroup variant="flush" className="mb-2">
        <Item setPage={props.setPage} icon={faNetworkWired} name="Network" page={props.page} />
        <Item setPage={props.setPage} icon={faFolderOpen} name="Files" page={props.page} />
      </ListGroup>
      <h5 className="ml-2 mr-2">Target</h5>

      <ListGroup variant="flush" className="mb-2">
        <Item setPage={props.setPage} icon={faTerminal} name="Terminal" page={props.page} />
        <Item setPage={props.setPage} icon={faChartArea} name="Charts" page={props.page} />
      </ListGroup>
      <Row className="mb-1 ml-1 mr-1">
        <Button variant="secondary" size="lg" block>Reset</Button>
      </Row>
      <Row className="mb-1 ml-1 mr-1">
        <Button variant="primary" size="lg" block>Flash</Button>
      </Row>
      <hr />
      <ListGroup variant="flush" className="mb-2">
      <Item setPage={props.setPage} icon={faInfoCircle} name="About" page={props.page} />

      </ListGroup>
    </div>
  )
}

export default SideBar
