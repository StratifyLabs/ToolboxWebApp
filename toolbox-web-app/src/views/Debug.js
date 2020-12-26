import React from 'react'
import { Container, Card } from 'react-bootstrap'

import Raw from '../components/debug/Raw'
import Csv from '../components/debug/Csv'
import LogicCapture from '../components/debug/LogicCapture'
import Histogram from '../components/debug/Histogram'
import ProgramCounterSamplePlot from '../components/debug/ProgramCounterSamplePlot'
import Log from '../components/debug/Log'


const Debug = props => {

  const [csv, setCsv] = React.useState({ plots: [] });

  function find(input, type, name) {
    for (var i = 0; i < input.length; i++) {
      if (input[i].type === type && input[i].name === name) {
        return input[i];
      }
    }
    return undefined;
  }

  function convert_to_float(b) {
    // Type conversion of string to float
    var floatValue = +(b);
    // Return float value
    return floatValue;
    }

    /*
  React.useEffect(() => {
    let eventSource = new EventSource("http://localhost:3002/terminal")
    eventSource.onmessage = e => {
      //console.log(`message ${e.data}`)
      const lines = String(e.data).split("\n");
      lines.forEach((item, index) => {
        if (item.length > 0) {
          const elements = item.split("|");
          if (elements.length > 3 && elements[0] === "tb") {

            if (elements[1] === "csv") {
              const name = elements[2];
              const values = elements[3].split(",");
              if (values.length > 1) {
                const t = values[0];
                //first value is time
                //next values are according to headers

                let csvNext = Object.assign({}, csv);
                let item = find(csvNext.plots, "csv", name);
                if (item === undefined) {
                  csvNext.plots.push({
                    name: name,
                    type: "csv",
                    data: [{ label: "unknown", data:[]}]
                  });
                  item = csvNext.plots[csvNext.plots.length - 1];
                }

                //for (var i = 1; i < values.length; i++) {
                //  console.log("appending item to trace");
                  item.data[1 - 1].data.push([convert_to_float(t), convert_to_float(values[1])]);
                //}
                console.log('update csv');
                console.log(`csv plot data ${JSON.stringify(csvNext.plots[0].data)}`)
                setCsv(csvNext);
              }
            }
          }}
        })


    }
  }, [])
  */



  //holds the state of all the children
  //pass the data to the children through props
  //get the data from the toolbox

  const logicData = React.useMemo(
    () => [
      {
        label: 'SCK',
        data: [
          [0.0, 0], [0.1, 1],
          [1.0, 1], [1.1, 0],
          [2.0, 0], [2.1, 1],
          [3.0, 1], [3.1, 0],
          [4.0, 0], [4.1, 1],
          [5.0, 1], [5.1, 0],
          [6.0, 0], [6.1, 1],
          [7.0, 1], [7.1, 0],
          [8.0, 0], [8.1, 1],
          [9.0, 1], [9.1, 0],
          [10.0, 0], [10.1, 1],
          [11.0, 1], [11.1, 0],
          [12.0, 0], [12.1, 1],
          [13.0, 1], [13.1, 0],
          [14.0, 0], [14.1, 1],
          [15.0, 1], [15.1, 0],
          [16.0, 0], [16.1, 1]
        ]
      },
      {
        label: 'MISO',
        data: [
          [0.0, 2], [0.1, 3],
          [5.0, 3], [5.1, 2],
          [6.0, 2], [6.1, 3],
          [7.0, 3], [7.1, 2],
          [8.0, 2], [8.1, 3],
          [15.0, 3], [15.1, 2],
          [16.0, 2], [16.1, 3]
        ]
      },
      {
        label: 'MOSI',
        data: [
          [0.0, 4], [0.1, 5],
          [5.0, 5], [5.1, 4],
          [6.0, 4], [6.1, 5],
          [11.0, 5], [11.1, 4],
          [13.0, 4], [13.1, 5],
          [15.0, 5], [15.1, 4],
          [16.0, 4], [16.1, 5]
        ]
      },
      {
        label: 'CS',
        data: [
          [0.0, 7], [0.1, 6],
          [16.0, 6], [16.1, 7]
        ]
      },
    ],
    []
  )

  const csvData = [
    ["Age", "Weight"],
    [8, 12],
    [4, 5.5],
    [11, 14],
    [4, 5],
    [3, 3.5],
    [6.5, 7]
  ];


  return (
    <div>
      <h2>Trace Output</h2>
      <small>demo.elf 20201223</small>
      <Raw />
      {csv.plots.map((object,index)=> { 
        console.log("render CSV");
        return <Csv key={`${object.name}_${index}`} data={object.data}/>
        })}
      <Log type="message" />
      <Csv data={csvData}/>
      <LogicCapture data={logicData} height='300px' />
      <Histogram name="Temperature" />
      <ProgramCounterSamplePlot />
    </div >
  )
}

export default Debug
