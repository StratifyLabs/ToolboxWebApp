import React from 'react'

import { ButtonGroup, ToggleButton, Row, Button } from 'react-bootstrap'

import SettingsObject from '../components/settings/SettingsObject'
import AppContainer from '../components/AppContainer'


const Settings = props => {

  const [radioValue, setRadioValue] = React.useState('1');

  const radios = [
    { name: 'Debug', value: '1' },
    { name: 'Flash', value: '2' },
    { name: 'Trace', value: '3' }
    ];


  return (
    <AppContainer>
      <Row className="mb-3">
        <Button variant='outline-primary'>Test Settings</Button>
      </Row>
      <Row>
      <ButtonGroup toggle className="mb-3" >
        {radios.map((radio, idx) => (
          <ToggleButton
            key={idx}
            type="radio"
            variant="primary"
            name="radio"
            value={radio.value}
            checked={radioValue === radio.value}
            onChange={(e) => setRadioValue(e.currentTarget.value)}
          >
            {radio.name}
          </ToggleButton>
        ))}
      </ButtonGroup>
      </Row>
      { radioValue === '1' && <AppContainer>
      <SettingsObject type="debug" />
      </AppContainer> }
      { radioValue === '2' && <AppContainer>
      <SettingsObject type="flash" />
      </AppContainer> }
      { radioValue === '3' && <AppContainer>
      <SettingsObject type="trace" />
      </AppContainer> }
    </AppContainer>
  )
}

export default Settings
