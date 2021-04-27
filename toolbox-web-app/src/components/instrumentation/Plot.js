import React from 'react'
import { VictoryChart, VictoryLine } from "victory";
import Theme from './Theme'

const Plot = props => {

  let data = [];
  const source = props.directive.sources;

  for (let i in props.data) {
    if (props.data[i].name == source) {
      console.log(`source value is ${props.data[i].value}`)
      const values = props.data[i].value.split(",");
      data.push(values);
    }
  }
  console.log("values parsed");
  let series = data[0];
  series.pop();

  return (
    <VictoryChart domainPadding={{ y: 5 }}
    theme={Theme} 
    height={250}
    >
      { data.length && series.map((value, index) => {
        return <VictoryLine data={data} x={0} y={index+1} key={"series" + index} />
      })}
    </VictoryChart>
  )
}

export default Plot
