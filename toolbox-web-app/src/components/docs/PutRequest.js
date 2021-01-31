import React from 'react'
import { Alert, Card, Row, Col, Form, Button, Container, InputGroup, FormControl } from 'react-bootstrap'
import { FontAwesomeIcon as FA } from '@fortawesome/react-fontawesome'
import {
  faCheck,
  faTimes
} from '@fortawesome/free-solid-svg-icons'

import { NetworkContext } from '../../contexts/NetworkContext'

const PutRequest = props => {

  const [path, setPath] = React.useState("");
  const [response, setResponse] = React.useState({});
  const [responseStatus, setResponseStatus] = React.useState(false);

  const network = React.useContext(NetworkContext);

  console.log(JSON.stringify(network));

  //use state to save the result
  function sendRequest() {
    console.log(`request ${path}`)
    fetch(`${network.host}${path}`)
      .then(response => response.json())
      .then(result => {
        setResponseStatus(true)
        setResponse(result)
      })
  }

  function abortRequest() {

  }

  return (
    <Container className="mt-3 mb-3">
      <Row>
        <Form>
          <h5>PUT Request</h5>
          <InputGroup>
            <FormControl
              type="text"
              placeholder={props.placeholder}
              aria-label="Input group example"
              aria-describedby="btnGroupAddon"
              defaultValue={props.server}
              onChange={(e) => setPath(e.currentTarget.value)}
            />
            <InputGroup.Append>
              <Button variant="success" onClick={sendRequest}><FA icon={faCheck} /></Button>
            </InputGroup.Append>
            <InputGroup.Append>
              <Button variant="danger" onClick={abortRequest}><FA icon={faTimes} /></Button>
            </InputGroup.Append>
          </InputGroup>
        </Form>
      </Row >
      <Row className="mt-3">
        <Col>
        <Alert variant={responseStatus ? "success" : "danger"}>
            <pre>{JSON.stringify(response, null, 2)}</pre>
        </Alert>
        </Col>
      </Row>
    </Container>
  )
}

export default PutRequest
