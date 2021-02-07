import React from 'react'

import Delegate from './Delegate'
import Bitrate from './Bitrate'
import TextInput from './TextInput'
import Boolean from './Boolean'


const FlashSettings = props => {

  console.log(`flash settings ${JSON.stringify(props.settings)}`)

  const [settings, setSettings] = React.useState(props.settings);


  function handleVerifyChanged() {
    let next_settings = settings;
    next_settings.verify = !settings.verify;
    setSettings(next_settings);
    props.setSettingsChanged(next_settings);
    }

  function handleForceChanged() {
    let next_settings = settings;
    next_settings.force = !settings.force;
    setSettings(next_settings);
    props.setSettingsChanged(next_settings);
  }

  function handleStartChanged(value) {
    let next_settings = settings;
    next_settings.start = value;
    setSettings(next_settings);
    props.setSettingsChanged(next_settings);
  }

  function handleBitrateChanged(value) {
    let next_settings = settings;
    next_settings.bitrate = value;
    setSettings(next_settings);
    props.setSettingsChanged(next_settings);
  }

  function handleDelegateChanged(value){
    let next_settings = settings;
    next_settings.delegate = value;
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
        onChange={(value) => handleBitrateChanged(value)} />
      <TextInput
        name="Start"
        placeholder="0x00000000"
        value={settings.start}
        onChange={(value) => handleStartChanged(value)}
        description="Start address for .bin files" />
      <Boolean
        name="Verify"
        toggleValue={() => handleVerifyChanged()}
        value={settings.verify}>Verify the image was installed correctly</Boolean>
      <Boolean
        name="Force"
        toggleValue={() => handleForceChanged()}
        value={settings.force}>Force install even if the image is already installed</Boolean>
    </div>
  )
}

export default FlashSettings
