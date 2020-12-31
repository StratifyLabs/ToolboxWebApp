import React from 'react'
import { Navbar, Nav, NavDropdown, Form, FormControl, Button, NavbarBrand, Badge } from 'react-bootstrap'

const Top = props => {
  return (
    <Navbar bg="light" expand="sm" className="mb-2" className="border-bottom navbar-expand-lg">
      <Navbar.Brand href="#home" className="mr-auto">Stratify Toolbox</Navbar.Brand>
    </Navbar>
  )
}

export default Top
