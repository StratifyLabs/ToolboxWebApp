import React from 'react'
import { Card, Button } from 'react-bootstrap'
import { Chart } from 'react-charts'
import { Line, Scatter } from 'react-chartjs-2'
import {
  VictoryChart,
  VictoryZoomContainer,
  VictoryLine,
  VictoryBrushContainer,
  VictoryAxis,
  VictoryTooltip,
  VictoryVoronoiContainer
} from "victory";
import Theme from '../Theme'


const Table = props => {


  const [zoomDomain, setZoomDomain] = React.useState({ zoomDomain: { x: [] } });

  function handleZoom(domain) {
    setZoomDomain(domain);
  }

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
      { x: -1, cs: 7 },
      { x: 2, cs: 6 },
      { x: 8, cs: 7 },
      { x: 11, cs: 7 }
    ];

  return (
    <Card className="mb-2">
      <Card.Header className="flex">Testing <Button className="float-right btn-sm">Reset</Button></Card.Header>
      <Card.Body>
        <VictoryChart domainPadding={{ x: 0, y: 5 }} height={200}
          theme={Theme}
          containerComponent={

            <VictoryZoomContainer
              allowZoom={false}
              zoomDimension={"x"}
              zoomDomain={zoomDomain}
              onZoomDomainChange={handleZoom}
            />
          }
        >
          <VictoryLine
            labels={({ datum }) => datum.x}
            labelComponent={<VictoryTooltip />}
            interpolation={'stepAfter'}
            data={sckData}
            style={{

            }} />

          <VictoryLine
            style={{ data: { stroke: Theme.colors[0] } }}
            interpolation={'stepAfter'}
            data={misoData}
            style={{
            }} />


          <VictoryLine
            interpolation={'stepAfter'}
            data={mosiData}
            style={{

            }} />

          <VictoryLine
            interpolation={'stepAfter'}
            data={csData}
            y={"cs"} />
        </VictoryChart>

        <VictoryChart domainPadding={{ y: 2 }} height={40}
          theme={Theme}
          padding={{ top: 5, bottom: 0, left: 25, right: 10 }}
          containerComponent={
            <VictoryBrushContainer
              brushDimension="x"
              brushDomain={zoomDomain}
              onBrushDomainChange={handleZoom}
            />
          }
        >
          <VictoryAxis />
          <VictoryLine
            interpolation={'stepAfter'}
            data={sckData}
          />

          <VictoryLine
            interpolation={'stepAfter'}
            data={misoData}
          />

          <VictoryLine
            interpolation={'stepAfter'}
            data={mosiData}
          />

          <VictoryLine
            interpolation={'stepAfter'}
            data={csData}
            y={"cs"} />
        </VictoryChart>
      </Card.Body>
    </Card>
  )
}

export default Table
