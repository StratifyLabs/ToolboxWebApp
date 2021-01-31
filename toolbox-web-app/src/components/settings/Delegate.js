import React from 'react'
import { Form } from 'react-bootstrap'

const Delegate = props => {

  console.log(`delegate options ${JSON.stringify(props.options)}`)

  return (
    <Form.Group controlId="formBasicCheckbox">
      <Form.Label>Delegate (interface/family)</Form.Label>
      { Object.keys(props.options).map((key, index) => {
        return <Form.Check
        type="radio"
        label={`${props.options[key].interface}/${props.options[key].family}`}
        key={key}
      />
      })}

      <Form.Text className="text-muted">
        Select the delegate to use.
    </Form.Text>
    </Form.Group>
  )
}

export default Delegate
