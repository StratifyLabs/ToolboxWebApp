import React from 'react'
import { Navbar, Button } from 'react-bootstrap'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faChevronRight, faSync, faStop } from '@fortawesome/free-solid-svg-icons'

const Top = props => {

  const serverStatus = props.serverStatus;

  return (
    <Navbar bg="light" expand="sm" className="mb-2 border-bottom navbar-expand-lg">
      <Button variant="outline-secondary" className="mr-2" onClick={() => props.menuClicked() }><FontAwesomeIcon icon={faChevronRight} rotation={props.isSidebarOpen ? 180 : 0}/></Button>
      <Navbar.Brand href="#home" className="ml-auto">{props.page} | Stratify Toolbox</Navbar.Brand>
    </Navbar>
  )
}

export default Top
