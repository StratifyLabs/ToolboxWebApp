import React from 'react'

import Delegate from './Delegate'
import Bitrate from './Bitrate'
import Boolean from './Boolean'

const DebugSettings = props => {

  function handleHardwareResetChanged() {
    let settings = props.settings;
    settings.hardwareReset = !props.settings.hardwareReset;
    props.updateSettings(settings);
  }

  function handleConnectUnderResetChanged() {
    let settings = props.settings;
    settings.connectUnderReset = !props.settings.connectUnderReset;
    props.updateSettings(settings);
  }

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

      <Boolean
        name="Hardware Reset"
        toggleValue={() => handleHardwareResetChanged()}
        value={props.settings.hardwareReset}>Use the hardware signal to reset the device (recommended if available)</Boolean>

      <Boolean
        name="Connect Under Reset"
        toggleValue={() => handleConnectUnderResetChanged()}
        value={props.settings.connectUnderReset}>Connect to debug port while unit us under reset (recommended)</Boolean>

    </div>
  )
}

export default DebugSettings
