import React from 'react'
import { Container } from 'react-bootstrap'



const AppContainer = props => {

  return (
   <Container className="mt-3 mb-3">
      {props.children}
   </Container>
  )
}

export default AppContainer
