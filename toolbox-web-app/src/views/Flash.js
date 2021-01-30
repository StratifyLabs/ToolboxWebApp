import React from 'react'
import { Card, Form, Button } from 'react-bootstrap'



const Flash = props => {

  const messagesEndRef = React.createRef();
  const content = (props.configuration !== undefined && props.configuration.data !== undefined) ? String(props.configuration.data.text.join('')) : "";


  React.useEffect(() => {
    messagesEndRef.current.scrollIntoView({ behavior: 'smooth' })
  },[content])

  return (
    <pre>
     Flash Page
      <div ref={messagesEndRef} />
    </pre>
  )
}

export default Flash
