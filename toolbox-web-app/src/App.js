import logo from './logo.svg';
import React from 'react'
import './App.scss';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Container, Row, Col, Button } from 'react-bootstrap';
import Menu from './components/Menu'
import Top from './components/Top'
import Debug from './views/Debug'
import Network from './views/Network'

function App() {

  const [server, setServer] = React.useState("http://localhost:3002");
  const [page, setPage] = React.useState("Debug");


  return (
    <div className="App">
      <Top server={server}/>
      <Container fluid className="bodyContainer">
        <Row>
          <Col sm={2} className="fixed-top sidebarMenu">
            <Menu setPage={setPage} page={page} /> 

          </Col>
          <Col lg={8} className="offset-md-2" md={10}>
          {page === "Debug" && <Debug server={server} />}
          {page === "Network" && <Network server={server} setServer={setServer}/>}
          </Col>
        </Row>
      </Container>      

    </div>
  );
}

export default App;
