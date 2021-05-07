import React from 'react'
import { VictoryChart, VictoryContainer, VictoryHistogram } from "victory";
import AppContainer from '../AppContainer';
import { Row, Col } from 'react-bootstrap'

import Theme from './Theme'


const Histogram = props => {

  let data = [];
  const source = props.directive.sources;
  const id = props.directive.name.split(" ").join("-");

  for (let i in props.data) {
    if (props.data[i].name === source) {
      data.push({ x: parseFloat(props.data[i].value) });
    }
  }

  return (
    <AppContainer fluid className="mr-0 ml-0 pr-0 pl-0">
      <VictoryChart
          containerComponent={
            <VictoryContainer
            className={id}
            />
          }
        theme={Theme}
        height={250}
      >
        <VictoryHistogram
          data={data}
        />
      </VictoryChart>
    </AppContainer>
  )
}

export default Histogram
