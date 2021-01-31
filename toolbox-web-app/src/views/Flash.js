import React from 'react'
import { ButtonGroup, ToggleButton, Col, Row } from 'react-bootstrap'

import { FontAwesomeIcon as FA } from '@fortawesome/react-fontawesome'
import {
  faFolderOpen,
  faHistory
} from '@fortawesome/free-solid-svg-icons'

import AppContainer from '../components/AppContainer'
import UserFileUpload from '../components/UserFileUpload'


const Flash = props => {

  const [radioValue, setRadioValue] = React.useState('1');

  const radios = [
    { name: 'Flash History', value: '1' },
    { name: 'User Files', value: '2' }
  ];

  return (
    <AppContainer>
      <Row className="mb-3">
        <Col md={8}>
          <UserFileUpload />
        </Col>
      </Row>
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
      { radioValue === "1" && <div><h4><FA icon={faHistory} /> Flash History</h4>
        <Row>
          <Col md={4}>
            <p>Firmware</p>
          </Col>
          <Col md={5}>
            <p>Details</p>
          </Col>
        </Row></div>}
      { radioValue === "2" && <div><h4><FA icon={faFolderOpen} /> User Files</h4>
        <Row>
          <Col md={4}>
            <p>Files</p>
          </Col>
          <Col md={5}>
            <p>Details</p>
          </Col>
        </Row></div>}

    </AppContainer>
  )
}

export default Flash
