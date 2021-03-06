import React from 'react'

import TextInput from './TextInput'

const Bitrate = props => {


  return (
    <TextInput 
    name={props.label !== undefined ? props.label : "Bitrate"}
    placeholder={props.placeholder !== undefined ? props.placeholder : "1000000"} 
    description={props.description !== undefined ? props.description : "Bitrate in bits/second" } 
    onChange={props.onChange}
    value={props.value} />
  )
}

export default Bitrate
