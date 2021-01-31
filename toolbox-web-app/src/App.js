import React from 'react'
import './App.scss';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Container } from 'react-bootstrap';
import SideBar from './components/SideBar'
import Top from './components/Top'
import DebugClient from './DebugClient'

import Network from './views/Network'
import Insights from './views/Insights'
import InsightDetail from './views/InsightDetail'
import QuickStart from './views/QuickStart'
import About from './views/About'
import Reference from './views/Reference'
import Debug from './views/Debug'
import Flash from './views/Flash'
import Files from './views/Files'
import Trace from './views/Trace'
import Terminal from './views/Terminal'
import Settings from './views/Settings'
import Sidebar from "react-sidebar";

import { NetworkContext, networks } from './contexts/NetworkContext'

const mql = window.matchMedia(`(min-width: 800px)`);

function App() {

  const [server, setServer] = React.useState("http://localhost:3002");
  const [serverStatus, setServerStatus] = React.useState(false);
  const [page, setPageState] = React.useState("Network");
  const [pageName, setPageName] = React.useState("Network");
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

  function setInsightDetail(name, config){
    setInsightConfiguration(config)
    setPageState("InsightDetail")
    setPageName(`${name} ${config.type}`)

  }

  function setPage(value){
    if( value !== "InsightDetail" ){
      setPageState(value)
      setPageName(value)
    }
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
        page={pageName} 
        menuClicked={onMenuClicked} 
        isSidebarOpen={isSidebarOpen}
        serverStatus={serverStatus}
        server={server}
        />
        <NetworkContext.Provider value={networks.development}>
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
          {page === "About" && <About />}
          {page === "Quick Start" && <QuickStart page={page} setPage={setPage} />}
          {page === "Reference" && <Reference page={page} setPage={setPage} />}
          {page === "Debug" && <Debug configuration={configuration["output"]}/>}
          {page === "Flash" && <Flash setPage={setPage} />}
          {page === "Files" && <Files setPage={setPage} />}
          {page === "Trace" && <Trace setPage={setPage} />}
          {page === "Settings" && <Settings />}
          {page === "Terminal" && <Terminal configuration={configuration["output"]}/>}
          {page === "InsightDetail" && <InsightDetail configuration={insightConfiguration} />}
        </Container>
        </NetworkContext.Provider>
      </Sidebar>

    </div>
  );
}

export default App;
