import React from 'react'
import { Card, Button } from 'react-bootstrap'
import { Chart } from 'react-charts'
import { VictoryChart, VictoryZoomContainer, VictoryBar, VictoryLabel } from "victory";

const ProgramCounterSamplePlot = props => {
  const data = React.useMemo(
    () => [

      { x: 'main', y: 50 },
      { x: 'set_led', y: 2 },
      { x: 'plotx', y: 30 },
      { x: 'ploty', y: 12 },
      { x: 'calc', y: 20 },
      { x: 'get', y: 64 },
      { x: 'set', y: 22 },
      { x: 'run', y: 12 },
      { x: 'run1', y: 12 },
      { x: 'run2', y: 20 },
      { x: 'run3', y: 105 },
      { x: 'run4', y: 12 },
      { x: 'run5', y: 40 },
      { x: 'run6', y: 13 },
      { x: 'run7', y: 12 },
      { x: 'run8', y: 12 },
      { x: 'run9', y: 12 },
      { x: 'run10', y: 20 },
      { x: 'run11', y: 99 },
      { x: 'run12', y: 12 },
      { x: 'run13', y: 40 },
      { x: 'run14', y: 13 },
      { x: 'run15', y: 12 }
    ],
    []
  )


  return (
    <Card className="mb-2">
      <Card.Header className="flex">Program Counter Samples <Button className="float-right btn-sm">Reset</Button></Card.Header>
      <Card.Body>
        <VictoryChart domainPadding={{ y: 10 }}
          containerComponent={
            <VictoryZoomContainer
              zoomDimension={"x"}
            />
          }
        >
          <VictoryBar
            labels={({ datum }) => datum.x}
            labelComponent={<VictoryLabel dx={2} dy={5} angle={-90} textAnchor="start" />}
            barRatio={0.95}
            data={data} />
        </VictoryChart>
      </Card.Body>
    </Card>
  )
}

export default ProgramCounterSamplePlot
