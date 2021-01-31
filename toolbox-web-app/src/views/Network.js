import React from 'react'
import { Form, Button } from 'react-bootstrap'



const Network = props => {

  return (
    <div>
      <Form>
        <Form.Group controlId="formBasicEmail">
          <Form.Label>Server</Form.Label>
          <Form.Control type="input" placeholder="http://a.b.c.d:3002" defaultValue={props.server} onChange={(item) => {
            props.setServer(item.target.value)
          }} />
          <Form.Text className="text-muted">
            IP Address of Toolbox
          </Form.Text>
        </Form.Group>
        <Button variant="primary" onClick={() => {
          //ping the server to see if it is listening
        }}>
          Ping
            </Button>
      </Form>
    </div >
  )
}

export default Network
