import React from 'react'
import { ListGroup } from 'react-bootstrap'



const Item = props => {
  return (
    <ListGroup.Item action onClick={() => props.setPage(props.name)} active={props.page==props.name}>{props.name}</ListGroup.Item>
  )
}

const Menu = props => {


  return (
    <ListGroup fixed="top">
      <Item setPage={props.setPage} name="Network" page={props.page} />
      <Item setPage={props.setPage} name="Debug" page={props.page} />
      <Item setPage={props.setPage} name="Files" page={props.page} />
      <Item setPage={props.setPage} name="About" page={props.page} />
    </ListGroup>
  )
}

export default Menu
