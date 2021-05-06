import React from 'react'
import { VictoryChart, VictoryHistogram } from "victory";
import AppContainer from '../AppContainer';
import { Row, Col } from 'react-bootstrap'

import Theme from './Theme'


const Histogram = props => {

  let data = [];
  const source = props.directive.sources;

  for (let i in props.data) {
    if (props.data[i].name === source) {
      data.push({ x: parseFloat(props.data[i].value) });
    }
  }

  return (
    <AppContainer fluid className="mr-0 ml-0 pr-0 pl-0">
      <h3>{props.directive.name}</h3>
      <VictoryChart
        theme={Theme}
        height={250}
      >
        <VictoryHistogram
          data={data}
        />

      </VictoryChart>
      <Row>
        <Col md={12} className="text-center">
          <span >{props.directive.description}</span>
        </Col>
      </Row>
    </AppContainer>
  )
}

export default Histogram
