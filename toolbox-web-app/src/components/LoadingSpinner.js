import React from 'react'
import { Container } from 'react-bootstrap'
import { FontAwesomeIcon as FA } from '@fortawesome/react-fontawesome'
import { faSpinner } from '@fortawesome/free-solid-svg-icons'



const LoadingSpinner = props => {

  return (
    <FA icon={faSpinner} spin size={props.size !== undefined ? props.size : "2x"} />
  )
}

export default LoadingSpinner
