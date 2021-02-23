import React from 'react'
import { Alert, Row, Col, Form, Button, Container, InputGroup, FormControl, Card } from 'react-bootstrap'
import { FontAwesomeIcon as FA } from '@fortawesome/react-fontawesome'
import {
  faCheck,
  faTimes
} from '@fortawesome/free-solid-svg-icons'

import { NetworkContext } from '../contexts/NetworkContext'

const ApiRequest = props => {

  const [response, setResponse] = React.useState(props.response !== null ? props.response : {});
  const [responseStatus, setResponseStatus] = React.useState(false);

  const network = React.useContext(NetworkContext);

  //use state to save the result
  function getRequest() {
    if (props.path !== "") {
      console.log(`request ${props.path}`)
      fetch(`${network.host}${props.path}`)
        .then(response => response.json())
        .then(result => {
          setResponseStatus(true)
          setResponse(result)
        })
    }
  }


  React.useEffect(() => {
    getRequest();
  }, [props.path])

  function abortRequest() {

  }

  return (
    <Card className="mt-3 mb-3">
      <Card.Header>{props.path}</Card.Header>
      <Card.Body>
        <pre>{JSON.stringify(response, null, 2)}</pre>
      </Card.Body>
    </Card>
  )
}

export default ApiRequest
