import React from 'react'

import Delegate from './Delegate'
import Bitrate from './Bitrate'
import Boolean from './Boolean'

const DebugSettings = props => {

  const [settings, setSettings] = React.useState(props.settings);



  function handleHardwareResetChanged() {
    let next_settings = settings;
    next_settings.hardwareReset = !settings.hardwareReset;
    setSettings(next_settings);
    props.setSettingsChanged();
  }

  function handleConnectUnderResetChanged() {
    let next_settings = settings;
    next_settings.connectUnderReset = !settings.connectUnderReset;
    setSettings(next_settings);
    props.setSettingsChanged();
  }

  function handleBitrateChanged(value) {
    let next_settings = props.settings;
    next_settings.bitrate = value;
    setSettings(next_settings);
    props.setSettingsChanged();
  }


  function handleDelegateChanged(value){
    let next_settings = settings;
    next_settings.delegate = value;
    setSettings(next_settings);
    props.setSettingsChanged();
  }

  return (
    <div>
      <h3>Debug Settings</h3>
      <Delegate delegate={props.settings.delegate} options={props.delegateOptions} setDelegate={handleDelegateChanged} />
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
