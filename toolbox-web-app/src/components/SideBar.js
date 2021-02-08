import React from 'react'
import { ListGroup  } from 'react-bootstrap'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faBook,
  faNetworkWired,
  faChartArea,
  faFolderOpen,
  faInfoCircle,
  faBug,
  faBolt,
  faWaveSquare,
  faPlay,
  faSlidersH,
  faTerminal
} from '@fortawesome/free-solid-svg-icons'


const Item = props => {
  return (
    <ListGroup.Item action onClick={() => props.setPage(props.name)} active={props.page === props.name}>
      <FontAwesomeIcon icon={props.icon} /> {props.name}
    </ListGroup.Item>
  )
}

const SideBar = props => {

  return (
    <div>
      <h5 className="ml-2 mr-2">TARGET</h5>
      <ListGroup variant="flush" className="mb-2">
        <Item setPage={props.setPage} icon={faBug} name="Debug" page={props.page} />
        <Item setPage={props.setPage} icon={faBolt} name="Flash" page={props.page} />
        <Item setPage={props.setPage} icon={faWaveSquare} name="Trace" page={props.page} />
        <Item setPage={props.setPage} icon={faTerminal} name="Terminal" page={props.page} />
        <Item setPage={props.setPage} icon={faChartArea} name="Insights" page={props.page} />
      </ListGroup>
      <h5 className="ml-2 mr-2">TOOLBOX</h5>
      <ListGroup variant="flush" className="mb-2">
        <Item setPage={props.setPage} icon={faSlidersH} name="Settings" page={props.page} />
        <Item setPage={props.setPage} icon={faFolderOpen} name="Files" page={props.page} />
      </ListGroup>
      <h5 className="ml-2 mr-2">DOCS</h5>
      <ListGroup variant="flush" className="mb-2">
        <Item setPage={props.setPage} icon={faPlay} name="Quick Start" page={props.page} />
        <Item setPage={props.setPage} icon={faBook} name="Reference" page={props.page} />
        <Item setPage={props.setPage} icon={faInfoCircle} name="About" page={props.page} />
      </ListGroup>
    </div>
  )
}

export default SideBar
