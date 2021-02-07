import React from 'react'
import { Button } from 'react-bootstrap'

const Delegate = props => {

  const [delegate, setDelegate] = React.useState(props.delegate);

  function updateDelegate(key){
    setDelegate(props.options[key]);
    props.setDelegate(props.options[key]);
  }

  function getVariant(key){
    return getDelegateString(delegate) === getDelegateString(props.options[key]) ? 'secondary' : 'outline-secondary'
  }

  function getDelegateString(delegate){
    return `${delegate["interface"]}/${delegate.family}`
  }

  return (
    <div>
      <h5>Delegate (interface/family)</h5>
      { Object.keys(props.options).map((key, index) => {
        return <Button key={key} className="mr-2" variant={getVariant(key)} onClick={() => updateDelegate(key) }
      >{getDelegateString(props.options[key])}</Button>
      })}
      <p className="text-muted">
        Select the delegate to use.
    </p>
    </div>
  )
}

export default Delegate
