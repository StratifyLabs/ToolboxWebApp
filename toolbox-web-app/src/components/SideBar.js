import React from 'react'
import { Container, ListGroup, ButtonGroup, Button, Badge, Row } from 'react-bootstrap'



const Item = props => {
  return (
    <ListGroup.Item action onClick={() => props.setPage(props.name)} active={props.page == props.name}>{props.name}</ListGroup.Item>
  )
}

const SideBar = props => {


  return (
    <div>
      <h5>Toolbox</h5>
      <ListGroup variant="flush" className="mb-2">
        <Item setPage={props.setPage} name="Network" page={props.page} />
        <Item setPage={props.setPage} name="Debug" page={props.page} />
        <Item setPage={props.setPage} name="Files" page={props.page} />
        <Item setPage={props.setPage} name="About" page={props.page} />
      </ListGroup>
      <h5>Target</h5>
      <Row className="mb-1 ml-1 mr-1">
        <Button variant="danger" size="lg" block>Reset</Button>
      </Row>
      <Row className="mb-1 ml-1 mr-1">
        <Button variant="primary" size="lg" block>Flash</Button>
      </Row>
    </div>
  )
}

export default SideBar
