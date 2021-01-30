import React from 'react'
import { Card, Form, Button } from 'react-bootstrap'

import Delegate from './Delegate'
import Bitrate from './Bitrate'
import Boolean from './Boolean'

const Trace = props => {


  return (
    <Form>
      <Delegate type="trace" />
      <Bitrate />
      <Boolean name="Verify">Verify the image was installed correctly</Boolean>
      <Boolean name="Force">Force install even if the image is already installed</Boolean>
    </Form>
  )
}

export default Trace
