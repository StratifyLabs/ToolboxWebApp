import logo from './logo.svg';
import React from 'react'
import './App.scss';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Container, Row, Col, Button } from 'react-bootstrap';
import Menu from './components/Menu'
import Top from './components/Top'
import Debug from './views/Debug'

function App() {

  return (
    <div className="App">
      <Top />
      <Container fluid className="bodyContainer">
        <Row>
          <Col md={2} className="fixed-top sidebarMenu">
            <Menu /> 

          </Col>
          <Col md={8} className="offset-md-2">
            <Debug />
          </Col>
        </Row>
      </Container>      

    </div>
  );
}

export default App;
