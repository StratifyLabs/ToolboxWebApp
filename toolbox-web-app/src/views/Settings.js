import React from 'react'

import { ButtonGroup, ToggleButton, Row, Button } from 'react-bootstrap'
import { FontAwesomeIcon as FA } from '@fortawesome/react-fontawesome'
import {
  faCheck,
  faQuestion
} from '@fortawesome/free-solid-svg-icons'

import AppContainer from '../components/AppContainer'

import { NetworkContext } from '../contexts/NetworkContext'

import FlashSettings from '../components/settings/FlashSettings'
import DebugSettings from '../components/settings/DebugSettings'
import TraceSettings from '../components/settings/TraceSettings'
import LoadingSpinner from '../components/LoadingSpinner'

const Settings = props => {

  const network = React.useContext(NetworkContext);
  const [settings, setSettings] = React.useState();
  const [latestSettings, setLatestSettings] = React.useState();
  const [delegateOptions, setDelegateOptions] = React.useState();
  const [count, setCount] = React.useState();
  const [radioValue, setRadioValue] = React.useState('debug');
  const [isSettingsChanged, setSettingsChanged] = React.useState(false);

  const radios = [
    { type: 'debug', name: 'Debug' },
    { type: 'flash', name: 'Flash' },
    { type: 'trace', name: 'Trace' }
  ];

  const type = radioValue;


  //request current settings from the device -- update the settings on the device
  //as they are changed here

  const isReady = (settings !== undefined && delegateOptions !== undefined)


  console.log(`settings are ${JSON.stringify(settings)}`)

  async function putSettings() {
    console.log(`put body ${JSON.stringify(latestSettings)}`)
    const response = await fetch(`${network.host}/${type}/settings`, {
      method: 'PUT',
      body: JSON.stringify(settings)
    });

    const responseJson = await response.json();

    console.log(`setting put complete ${JSON.stringify(responseJson)}`)
    setSettingsChanged(false);

  }

  function handleSaveSettingClicked() {
    putSettings();
  }

  function handleSettingsChanged(value) {
    //setSettings(value);
    setLatestSettings(value);
    setSettingsChanged(true);
  }

  React.useEffect(() => {

    console.log("Try to fetch " + type);

    async function fetchSettings() {
      const settingsResponse = await fetch(`${network.host}/${type}/settings`);
      if (settingsResponse.ok) {

      }
      const settingsResponseJson = await settingsResponse.json();

      const delegatesResponse = await fetch(`${network.host}/${type}/delegates`);
      if (delegatesResponse.ok) {

      }
      const delegatesResponseJson = await delegatesResponse.json();

      setDelegateOptions(delegatesResponseJson);
      setSettings(settingsResponseJson);
      setSettingsChanged(false);
    }

    fetchSettings();



  }, [count, network.host, type])

  function handleRadioValueChanged(value) {
    setSettings(undefined);
    setRadioValue(value);
  }


  return (
    <AppContainer>
      <Row>
        <ButtonGroup toggle className="mb-3" >
          {radios.map((radio, idx) => (
            <ToggleButton
              key={idx}
              type="radio"
              variant="primary"
              name="radio"
              value={radio.type}
              checked={radioValue === radio.type}
              onChange={(e) => handleRadioValueChanged(e.currentTarget.value)}
            >
              {radio.name}
            </ToggleButton>
          ))}
        </ButtonGroup>
      </Row>
      <Row>
        {isReady === false && <LoadingSpinner />}
        {isReady && radioValue === 'debug' && <DebugSettings settings={settings} setSettingsChanged={handleSettingsChanged} delegateOptions={delegateOptions} />}
        {isReady && radioValue === 'flash' && <FlashSettings settings={settings} setSettingsChanged={handleSettingsChanged} delegateOptions={delegateOptions} />}
        {isReady && radioValue === 'trace' && <TraceSettings settings={settings} setSettingsChanged={handleSettingsChanged} delegateOptions={delegateOptions} />}
      </Row>
      <Row className="mb-3">
        <Button
          disabled={!isSettingsChanged}
          variant={isSettingsChanged ? `warning` : `success`}
          onClick={handleSaveSettingClicked}
        >{isSettingsChanged ? `Save Settings` : `Settings Saved`} <FA icon={isSettingsChanged ? faQuestion : faCheck} /></Button>
      </Row>
    </AppContainer>
  )
}

export default Settings
