import React from 'react'
import { Card, Form, Button } from 'react-bootstrap'

import Delegate from './Delegate'
import Bitrate from './Bitrate'
import Boolean from './Boolean'

const TraceSettings = props => {


  function handleBitrateChanged(value) {
    let settings = props.settings;
    settings.bitrate = value;
    props.updateSettings(settings);
  }

  return (
    <div>
      <Delegate options={props.delegateOptions} />

      <Bitrate
        value={props.settings.bitrate}
        placeholder="1000000"
        onChange={(value) => handleBitrateChanged(value)} />
    </div>
  )
}

export default TraceSettings
