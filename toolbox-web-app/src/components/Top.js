import React from 'react'
import { Navbar, Nav, NavDropdown, Form, FormControl, Button, NavbarBrand, Badge } from 'react-bootstrap'

const Top = props => {
  return (
    <Navbar fixed="top" bg="light" expand="sm" className="mb-2">
      <Navbar.Brand href="#home" className="mr-auto">Stratify Toolbox</Navbar.Brand>
      <span className="mr-2">Target: </span>
      <Badge pill variant="warning" className="mr-2">Not Connected</Badge>
      <Button variant="primary" className="btm-sm mr-2">Reset</Button>
      <Button variant="success" className="btm-sm">Flash</Button>
    </Navbar>
  )
}

export default Top
