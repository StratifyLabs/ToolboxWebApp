import React from 'react'
import { Card } from 'react-bootstrap'
import { FontAwesomeIcon as FA } from '@fortawesome/react-fontawesome'
import {
  faSpinner
} from '@fortawesome/free-solid-svg-icons'

import { NetworkContext } from '../contexts/NetworkContext'

const ApiRequest = props => {

  const [response, setResponse] = React.useState(props.response !== null ? props.response : "<empty>");
  const [isBusy, setBusy] = React.useState(false);

  const network = React.useContext(NetworkContext);

  React.useEffect(() => {
    if (props.path !== "") {
      setBusy(true);
      console.log(`request ${props.path}`)
      fetch(`${network.host}${props.path}`)
        .then(response => response.text())
        .then(result => {
          setBusy(false);
          setResponse(result)
        })
    }
  }, [props.path, network.host])

  return (
    <Card className="mt-3 mb-3">
      <Card.Header>{props.path ? props.path : "<request>"}{isBusy && <span class="float-right"><FA icon={faSpinner} spin={true} /></span>}</Card.Header>
      <Card.Body>
        <pre>{response}</pre>
      </Card.Body>
    </Card>
  )
}

export default ApiRequest
