import React from 'react'
import { Card, Form, Button } from 'react-bootstrap'



const Network = props => {

  const [input, setInput] = React.useState(props.server)

  return (
    <div>
      <h2>Network</h2>
      <small>demo.elf 20201223</small>
      <Card>
        <Card.Body>
          <Form>
            <Form.Group controlId="formBasicEmail">
              <Form.Label>Server</Form.Label>
              <Form.Control type="input" placeholder="http://a.b.c.d:3002" defaultValue={props.server} onChange={(item) => { 
                props.setServer(item.target.value)
                }}/>
              <Form.Text className="text-muted">
                IP Address of Trace Server
              </Form.Text>
            </Form.Group>
            <Button variant="primary" onClick={()=>{
              //ping the server to see if it is listening
            }}>
              Ping
            </Button>
            <Form.Group>
              <Form.File id="exampleFormControlFile1" label="Example file input" />
            </Form.Group>
          </Form>
        </Card.Body>
      </Card>
    </div >
  )
}

export default Network
