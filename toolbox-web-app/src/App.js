import logo from './logo.svg';
import React from 'react'
import './App.scss';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Container, Row, Col, Button } from 'react-bootstrap';
import SideBar from './components/SideBar'
import Top from './components/Top'
import Debug from './views/Debug'
import Network from './views/Network'
import Sidebar from "react-sidebar";

const mql = window.matchMedia(`(min-width: 800px)`);


function App() {

  const [server, setServer] = React.useState("http://localhost:3002");
  const [page, setPage] = React.useState("Debug");
  const [isSidebarOpen, setSidebarOpen] = React.useState(true);
  const [isSidebarDocked, setSidebarDocked] = React.useState(true);

  function mediaQueryChanged() {
    setSidebarDocked(mql.matches);
    setSidebarOpen(false);
  }

  React.useEffect(() => {
    mql.addListener(mediaQueryChanged);
  },[])

  return (
    <div className="App">
      <Sidebar
        docked={isSidebarDocked}
        sidebar={
          <SideBar page={page} setPage={setPage} />}
        styles={{ sidebar: { background: "white" } }}
        open={isSidebarOpen}
      >
        <Container fluid>
          {page === "Debug" && <Debug server={server} />}
          {page === "Network" && <Network server={server} setServer={setServer} />}
        </Container>
      </Sidebar>

    </div>
  );
}

export default App;
