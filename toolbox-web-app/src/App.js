import logo from './logo.svg';
import React from 'react'
import './App.scss';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Container, Row, Col, Button, Navbar, Nav, NavDropdown } from 'react-bootstrap';
import SideBar from './components/SideBar'
import Top from './components/Top'
import DebugClient from './DebugClient'
import Network from './views/Network'
import Insights from './views/Insights'
import InsightDetail from './views/InsightDetail'
import Terminal from './views/Terminal'
import Sidebar from "react-sidebar";

const mql = window.matchMedia(`(min-width: 800px)`);


function App() {

  const [server, setServer] = React.useState("http://localhost:3002");
  const [serverStatus, setServerStatus] = React.useState(false);
  const [page, setPage] = React.useState("Debug");
  const [isSidebarOpen, setSidebarOpen] = React.useState(true);
  const [isSidebarDocked, setSidebarDocked] = React.useState(true);

  const [configuration, setConfiguration] = React.useState({});
  const [data, setData] = React.useState({});

  const [insightConfiguration, setInsightConfiguration] = React.useState({});

  function mediaQueryChanged() {
    setSidebarDocked(mql.matches);
    setSidebarOpen(false);
  }

  React.useEffect(() => {
    mql.addListener(mediaQueryChanged);
  }, [])

  function onMenuClicked(){
    setSidebarOpen(!isSidebarOpen);
    setSidebarDocked(!isSidebarOpen);
  }

  function setInsightDetail(config){
    setInsightConfiguration(config)
    setPage("InsightDetail")
  }

  return (
    <div className="App">
      <Sidebar
        docked={isSidebarDocked}
        sidebar={
          <SideBar page={page} setPage={setPage} />}
        styles={{ sidebar: { background: "white" } }}
        open={isSidebarOpen}
        onSetOpen={setSidebarOpen}
      >
        <Top 
        page={page} 
        menuClicked={onMenuClicked} 
        isSidebarOpen={isSidebarOpen}
        serverStatus={serverStatus}
        server={server}
        />
        <Container fluid>

           <DebugClient 
           configuration={configuration}
           setConfiguration={setConfiguration}
           data={data}
           setData={setData}
           serverStatus={serverStatus}
           setServerStatus={setServerStatus}
           server={server} 
           
           />
          {page === "Network" && <Network server={server} setServer={setServer} />}
          {page === "Insights" && 
          <Insights 
          setInsightDetail={setInsightDetail} 
          configuration={configuration} 
          />}
          {page === "Terminal" && <Terminal configuration={configuration["output"]}/>}
          {page === "InsightDetail" && <InsightDetail configuration={insightConfiguration} />}
        </Container>
      </Sidebar>

    </div>
  );
}

export default App;
