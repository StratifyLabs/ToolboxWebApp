import React from 'react'
import { Card, Form, Button } from 'react-bootstrap'

import SettingsObject from './SettingsObject'
import Delegate from './Delegate'
import Bitrate from './Bitrate'
import TextInput from './TextInput'
import Boolean from './Boolean'

import LoadingSpinner from '../LoadingSpinner'


const FlashSettings = props => {


  function handleVerifyChanged() {
    let settings = props.settings;
    settings.verify = !props.settings.verify;
    props.updateSettings(settings);
  }

  function handleForceChanged() {
    let settings = props.settings;
    settings.force = !props.settings.force;
    props.updateSettings(settings);
  }

  function handleStartChanged(value) {
    let settings = props.settings;
    settings.start = value;
    props.updateSettings(settings);
  }

  function handleBitrateChanged(value) {
    let settings = props.settings;
    settings.bitrate = value;
    props.updateSettings(settings);
  }

  //request current settings from the device -- update the settings on the device
  //as they are changed here

  return (
    <div>
      <Delegate options={props.delegateOptions} />
      <Bitrate
        value={props.settings.bitrate}
        placeholder="1000000"
        onChange={(value) => handleBitrateChanged(value)} />
      <TextInput
        name="Start"
        placeholder="0x00000000"
        value={props.settings.start}
        onChange={(value) => handleStartChanged(value)}
        description="Start address for .bin files" />
      <Boolean
        name="Verify"
        toggleValue={() => handleVerifyChanged()}
        value={props.settings.verify}>Verify the image was installed correctly</Boolean>
      <Boolean
        name="Force"
        toggleValue={() => handleForceChanged()}
        value={props.settings.force}>Force install even if the image is already installed</Boolean>
    </div>
  )
}

export default FlashSettings
