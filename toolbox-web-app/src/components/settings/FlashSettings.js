import React from 'react'

import Delegate from './Delegate'
import Bitrate from './Bitrate'
import TextInput from './TextInput'
import Boolean from './Boolean'


const FlashSettings = props => {

  console.log(`flash settings ${JSON.stringify(props.settings)}`)

  const [settings, setSettings] = React.useState(props.settings);

  function handleDelegateChanged(value){
    let next_settings = settings;
    next_settings.delegate = value;
    setSettings(next_settings);
    props.setSettingsChanged(next_settings);
  }

  function handleBoolChanged(name){
    let next_settings = settings;
    next_settings[name] = !settings[name];
    setSettings(next_settings);
    props.setSettingsChanged(next_settings);
  }

  function handleValueChanged(name, value){
    let next_settings = settings;
    next_settings[name] = value;
    setSettings(next_settings);
    props.setSettingsChanged(next_settings);
  }

  //request current settings from the device -- update the settings on the device
  //as they are changed here

  return (
    <div>
      <h3>Flash Settings</h3>
      <Delegate delegate={settings.delegate} options={props.delegateOptions} setDelegate={handleDelegateChanged} />
      <Bitrate
        value={settings.bitrate}
        placeholder="1000000"
        onChange={(value) => handleValueChanged("bitrate", value)} />
      <TextInput
        name="Start (0x)"
        placeholder="0x00000000"
        value={settings.start}
        onChange={(value) => handleValueChanged("start", value)}
        description="Start address (in hex) for .bin files" />
      <TextInput
        name="Size"
        placeholder="0"
        value={settings.size}
        onChange={(value) => handleValueChanged("size", value)}
        description="Read page size" />
      <TextInput
        name="Path"
        placeholder="/home/flash/latest.elf"
        value={settings.path}
        onChange={(value) => handleValueChanged("path", value)}
        description="Local path to .bin or .elf file" />
      <Boolean
        name="Verify"
        toggleValue={() => handleBoolChanged("verify")}
        value={settings.verify}>Verify the image was installed correctly</Boolean>
      <Boolean
        name="Force"
        toggleValue={() => handleBoolChanged("force")}
        value={settings.force}>Force install even if the image is already installed</Boolean>
      <TextInput
        name="Reset Pulse (ms)"
        placeholder="10"
        value={settings.resetPulse}
        onChange={(value) => handleValueChanged("resetPulse", value)}
        description="Hardware reset pulse duration in milliseconds" />
    </div>
  )
}

export default FlashSettings
