import React from 'react'
import { Row, Form, Button, Container, InputGroup, FormControl } from 'react-bootstrap'
import { FontAwesomeIcon as FA } from '@fortawesome/react-fontawesome'
import {
  faCheck,
  faTimes
} from '@fortawesome/free-solid-svg-icons'

const GetRequest = props => {

  //use state to save the result
  function sendRequest(){
  }

  function abortRequest(){

  }

  return (
    <Container>
    <Row>
      <Form>
      <h5>GET Request</h5>
      <InputGroup>
      <FormControl
        type="text"
        placeholder={props.placeholder}
        aria-label="Input group example"
        aria-describedby="btnGroupAddon"
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
      <pre>{'{}'}</pre>
    </Row>
    </Container>
  )
}

export default GetRequest
