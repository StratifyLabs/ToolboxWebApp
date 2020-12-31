import React from 'react'
import { Card, Button } from 'react-bootstrap'
import { Chart } from 'react-charts'
import { Line, Scatter } from 'react-chartjs-2'
import {
  createContainer,
  VictoryChart,
  VictoryZoomContainer,
  VictoryCursorContainer,
  VictoryLine,
  VictoryBrushContainer,
  VictoryAxis,
  VictoryLegend
} from "victory";

import Theme from '../Theme'


const Logic = props => {

  const [zoomDomain, setZoomDomain] = React.useState({ zoomDomain: { x: [] } });

  function handleZoom(domain) {
    setZoomDomain(domain);
  }

  const VictoryZoomCursorContainer = createContainer("zoom", "voronoi");

  return (
    <div>
      <VictoryChart domainPadding={{ y: 0 }} width={400} height={40}
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
        <VictoryAxis style={{ axis: { strokeWidth: 0 } }} />
        {
          Object.keys(props.configuration.data).map((key, index) => {
            return <VictoryLine
              style={{ data: { stroke: Theme.colors[index] } }}
              data={props.configuration.data[key]}
              x={0}
              y={1}
              key={"seriesBrush" + key}
              interpolation={'stepAfter'}
            />
          })
        }

      </VictoryChart>

      <VictoryChart
        theme={Theme}
        domainPadding={{ y: 10 }} width={400} height={200}
        padding={{ top: 40, bottom: 30, left: 25, right: 10 }}
        containerComponent={
          <VictoryZoomCursorContainer
            allowZoom={false}
            allowPan={true}
            zoomDimension={"x"}
            zoomDomain={zoomDomain}
            onZoomDomainChange={handleZoom}
            cursorDimension={"x"}
            labels={({ datum }) => `${datum[0]}`}
          />
        }
      >
        <VictoryLegend x={100} y={175}
          centerTitle
          orientation="horizontal"
          gutter={20}
          style={{ background: "black", border: { stroke: "black" }, title: { fontSize: 12 } }}
          data={Object.keys(props.configuration.data).map((key, index) => {
            return { name: key, symbol: { fill: Theme.colors[index], type: "circle" } }
          })}
        />
        <VictoryAxis
          orientation={"top"}
          offsetY={30}

        />
        {Object.keys(props.configuration.data).map((key, index) => {
          return <VictoryLine
            style={{ data: { stroke: Theme.colors[index] } }}
            data={props.configuration.data[key]}
            x={0}
            y={1}
            key={"series" + key}
            interpolation={'stepAfter'}
            name={key}
          />
        })}

      </VictoryChart>
    </div>
  )
}

export default Logic
