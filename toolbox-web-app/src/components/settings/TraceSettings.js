import React from 'react'

import Delegate from './Delegate'
import Bitrate from './Bitrate'
import TextInput from './TextInput'

const TraceSettings = props => {

  const [settings, setSettings] = React.useState(props.settings);

  function handleDelegateChanged(value) {
    let next_settings = settings;
    next_settings.delegate = value;
    setSettings(next_settings);
    props.setSettingsChanged(next_settings);
  }

  function handleValueChanged(name, value){
    let next_settings = settings;
    next_settings[name] = value;
    setSettings(next_settings);
    props.setSettingsChanged(next_settings);
  }

  return (
    <div>
      <h3>Trace Settings</h3>
      <Delegate delegate={settings.delegate} options={props.delegateOptions} setDelegate={handleDelegateChanged} />

      <Bitrate
        label="Data Bitrate"
        value={settings.dataBitrate}
        placeholder="2000"
        onChange={(value) => handleValueChanged("dataBitrate", value)} />

      <Bitrate
        label="Control Bitrate"
        value={settings.controlBitrate}
        placeholder="1000"
        description="Bitrate in Kbits/second (not used with all delegates)"
        onChange={(value) => handleValueChanged("controlBitrate", value)} />

      <TextInput
        name="Reset Pulse (ms)"
        placeholder="10"
        value={settings.resetPulse}
        onChange={(value) => handleValueChanged("resetPulse", value)}
        description="Hardware reset pulse duration in milliseconds" />

      <TextInput
        name="Reset Pin"
        placeholder="10"
        value={settings.resetPin}
        onChange={(value) => handleValueChanged("resetPin", value)}
        description="Pin number used to reset target device" />

      <TextInput
        name="Trace Device Path"
        placeholder="10"
        value={settings.device}
        onChange={(value) => handleValueChanged("device", value)}
        description="Serial device used for reading the tracing data" />
    </div>
  )
}

export default TraceSettings
