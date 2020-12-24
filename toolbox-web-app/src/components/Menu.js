import React from 'react'
import { ListGroup } from 'react-bootstrap'

const Menu = props => {
  return (
    <ListGroup fixed="top">
      <ListGroup.Item>Debug</ListGroup.Item>
      <ListGroup.Item>Network</ListGroup.Item>
      <ListGroup.Item>Files</ListGroup.Item>
      <ListGroup.Item>Toolbox</ListGroup.Item>
    </ListGroup>
  )
}

export default Menu
