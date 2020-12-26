import React from 'react'
import { Card, Button } from 'react-bootstrap'
import { Chart } from 'react-charts'
import { Line, Scatter } from 'react-chartjs-2'
import { VictoryChart, VictoryZoomContainer, VictoryLine, VictoryScatter } from "victory";


const LogicCapture = props => {

  const [count, setCount] = React.useState(0)

  const sckData =
    [
      { x: -1, y: 0 },
      { x: 2, y: 1 },
      { x: 3, y: 0 },
      { x: 4, y: 1 },
      { x: 5, y: 0 },
      { x: 6, y: 1 },
      { x: 7, y: 0 },
      { x: 8, y: 1 },
      { x: 9, y: 0 },
      { x: 11, y: 0 }
    ];

  const misoData =
    [
      { x: -1, y: 2 },
      { x: 1.5, y: 2 },
      { x: 6.5, y: 3 },
      { x: 7.5, y: 2 },
      { x: 8.5, y: 3 },
      { x: 11, y: 3 }
    ];

  const mosiData =
    [
      { x: -1, y: 4 },
      { x: 2, y: 5 },
      { x: 3, y: 4 },
      { x: 6.8, y: 5 },
      { x: 7, y: 4 },
      { x: 8, y: 5 },
      { x: 11, y: 5 }
    ];

  const csData =
    [
      { x: -1, y: 7 },
      { x: 2, y: 6 },
      { x: 8, y: 7 },
      { x: 11, y: 7 }
    ];

  return (
    <Card className="mb-2">
      <Card.Header className="flex">Logic Capture <Button className="float-right btn-sm">Reset</Button></Card.Header>
      <Card.Body>
        <VictoryChart domainPadding={{ y: 10 }}
          containerComponent={
            <VictoryZoomContainer
              zoomDimension={"x"}
            />
          }
        >
          <VictoryLine
            interpolation={'stepAfter'}
            data={sckData} 
            style={{
              data: {
                stroke: "tomato",
                strokeWidth: ({ active }) => active ? 4 : 2
              },
              labels: { fill: "tomato" }
            }}/>

          <VictoryLine
            interpolation={'stepAfter'}
            data={misoData} 
            style={{
              data: {
                stroke: "blue",
                strokeWidth: ({ active }) => active ? 4 : 2
              },
              labels: { fill: "blue" }
            }}/>

          <VictoryLine
            interpolation={'stepAfter'}
            data={mosiData} 
            style={{
              data: {
                stroke: "green",
                strokeWidth: ({ active }) => active ? 4 : 2
              },
              labels: { fill: "green" }
            }}/>

          <VictoryLine
            interpolation={'stepAfter'}
            data={csData} />
        </VictoryChart>
      </Card.Body>
    </Card>
  )
}

export default LogicCapture
