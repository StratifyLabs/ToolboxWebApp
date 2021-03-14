import React from 'react'
import { Button } from 'react-bootstrap'

const Delegate = props => {

  const [delegate, setDelegate] = React.useState(props.delegate);

  function updateDelegate(key){
    setDelegate(key);
    props.setDelegate(key);
  }

  function getVariant(key){
    return delegate === key ? 'secondary' : 'outline-secondary'
  }


  return (
    <div>
      <h5>Delegate (interface/family)</h5>
      { Object.keys(props.options).map((key, index) => {
        return <Button key={key} className="mr-2 mb-2" variant={getVariant(key)} onClick={() => updateDelegate(key) }
      >{key}</Button>
      })}
      <p className="text-muted">
        Select the delegate to use.
    </p>
    </div>
  )
}

export default Delegate
