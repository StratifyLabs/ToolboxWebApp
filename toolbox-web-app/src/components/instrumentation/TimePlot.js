import React from 'react'
import { VictoryChart, VictoryLine } from "victory";
import Theme from './Theme'
import AppContainer from '../AppContainer';
import { Row, Col } from 'react-bootstrap'

const TimePlot = props => {

  let data = [];
  const source = props.directive.sources;

  for (let i in props.data) {
    if (props.data[i].name === source) {
      let values = [props.data[i].ts, ...props.data[i].value.split(",").map(Number)];
      data.push(values);
    }
  }
  const series = data[0];

  return (
    <AppContainer fluid className="mr-0 ml-0 pr-0 pl-0">
      <h3>{props.directive.name}</h3>
      <VictoryChart domainPadding={{ y: 5 }}
        theme={Theme}
        height={250}
      >
        {series.length && series.map((value, index) => {
          return index ? <VictoryLine data={data} x={0} y={index} key={"series" + index} /> : null;
        })}
      </VictoryChart>
      <Row>
        <Col md={12} className="text-center">
          <span >{props.directive.description}</span>
        </Col>
      </Row>
    </AppContainer>
  )
}

export default TimePlot
