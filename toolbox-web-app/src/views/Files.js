import React from 'react'
import { Card, Form, Button, Container, Col, Row } from 'react-bootstrap'

import AppContainer from '../components/AppContainer'


const Files = props => {

  const buttonClass ="mb-3 btn-block"

  return (
   <AppContainer>
     <Row>
       <Col md={3}>
       <Row><Button className={buttonClass}>/bin</Button></Row>
       <Row><Button className={buttonClass}>/flash</Button></Row>
       <Row><Button className={buttonClass}>/settings</Button></Row>
       <Row><Button className={buttonClass}>/tmp</Button></Row>
       <Row><Button className={buttonClass}>/trace</Button></Row>
       <Row ><Button className={buttonClass}>/user</Button></Row>
       </Col>
       <Col md={4}>
       <p>User Files</p>
       </Col>
       <Col md={5}>
       <p>Details and Actions</p>
       </Col>
     </Row>
   </AppContainer>
  )
}

export default Files
