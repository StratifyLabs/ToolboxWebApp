import React from 'react'
import { Card, Form, Button } from 'react-bootstrap'

import Delegate from './Delegate'
import Bitrate from './Bitrate'
import Boolean from './Boolean'

const Flash = props => {


  return (
    <Form>
      <Delegate type="debug" />
      <Bitrate />
      <Boolean name="Hardware Reset">Use the hardware signal to reset the device</Boolean>
      <Boolean name="Connect Under Reset">Connect to debug port while unit us under reset</Boolean>
    </Form>
  )
}

export default Flash
