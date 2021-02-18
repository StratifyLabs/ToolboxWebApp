import React from 'react'

import TextInput from './TextInput'

const Bitrate = props => {


  return (
    <TextInput 
    name="Bitrate" 
    placeholder={props.placeholder !== undefined ? props.placeholder : "1000000"} 
    description="Bitrate in Kbits/second" 
    onChange={props.onChange}
    value={props.value} />
  )
}

export default Bitrate
