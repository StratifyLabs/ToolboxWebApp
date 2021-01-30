import React from 'react'
import { Card, Form, Button, Container } from 'react-bootstrap'


import Debug from '../components/settings/Debug'
import Flash from '../components/settings/Flash'
import Trace from '../components/settings/Trace'


const Settings = props => {

  return (
    <Container>
      <h2>Debug Delegate</h2>
      <Container><Debug /></Container>
      <hr />
      <h2>Flash Delegate</h2>
      <Container><Flash /></Container>
      <hr />
      <h2>Trace Delegate</h2>
      <Container><Trace /></Container>
    </Container>
  )
}

export default Settings
