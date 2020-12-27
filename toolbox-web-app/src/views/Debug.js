import React from 'react'
import { Container, Card } from 'react-bootstrap'

import Raw from '../components/debug/Raw'
import Plot from '../components/debug/Plot'
import LogicCapture from '../components/debug/LogicCapture'
import Histogram from '../components/debug/Histogram'
import ProgramCounterSamplePlot from '../components/debug/ProgramCounterSamplePlot'
import Log from '../components/debug/Log'
import Table from '../components/debug/Table'


const Debug = props => {

  const [csv, setCsv] = React.useState({ plots: [] });
  const [input, setInput] = React.useState({});
  const [output, setOutput] = React.useState({});

  function find(input, type, name) {
    for (var i = 0; i < input.length; i++) {
      if (input[i].type === type && input[i].name === name) {
        return input[i];
      }
    }
    return undefined;
  }

  function convertToFloat(b) {
    // Type conversion of string to float
    var floatValue = +(b);
    // Return float value
    return floatValue;
  }



  React.useEffect(() => {

    function updatePlot(elements){
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
            data: [{ label: "unknown", data: [] }]
          });
          item = csvNext.plots[csvNext.plots.length - 1];
        }
  
        //for (var i = 1; i < values.length; i++) {
        //  console.log("appending item to trace");
        item.data[1 - 1].data.push({x:convertToFloat(t), y:convertToFloat(values[1])});
        //}
        console.log('update csv');
        //console.log(`csv plot data ${JSON.stringify(csvNext.plots[0].data)}`)
        setCsv(csvNext);
      }
    }

    function updateInputs(elements){
      const name = elements[2];
      const value = JSON.stringify(elements[3]);

      let inputNext = Object.assign({}, input);
      if( inputNext[name] !== undefined && inputNext[name].outputs !== undefined ){
        //add the input to each output
        let outputNext = Object.assign({}, output);
        inputNext[name].outputs.forEach((outputName,index) => {
            outputNext[outputName].inputs[name].push[value];
        });
      }

    }

    function updateOutput(elements){
      const name = elements[2];
      const value = JSON.stringify(elements[3]);

      let outputNext = Object.assign({}, output);
      let inputNext = Object.assign({}, input);

      outputNext[name] = value;
      //type: hist
      //inputs [t0,t1,t2]
      value.inputs.forEach((input, index) => {
        //create the input
        //add a data point to the output
        const inputObject = inputNext[input];
        if( inputObject === undefined || inputObject.outputs === undefined ){
          inputNext[input] = {
            outputs: [name]
          }
        } else if( inputObject.outputs.indexOf(name) === -1 ){
          inputObject.outputs.push[name];
        }
      });
    }

    let eventSource = new EventSource("http://localhost:3002/terminal")
    eventSource.onmessage = e => {
      //console.log(`message ${e.data}`)
      const lines = String(e.data).split("\n");
      lines.forEach((item, index) => {
        if (item.length > 0) {
          const elements = item.split("|");
          if (elements.length > 3 && elements[0] === "tb") {
            if (elements[1] === "csv") {
              updatePlot(elements);
            }
          }
        }
      })
    }
  }, [])



  return (
    <div>
      <h2>Trace Output</h2>
      <small>demo.elf 20201223</small>
      <Raw />
      {csv.plots.map((object, index) => {
        return <Plot key={`${object.name}_${index}`} data={object.data} />
      })}
      <Log type="message" />
      <Histogram name="Temperature" />
      <ProgramCounterSamplePlot />
      <Table />
    </div >
  )
}

export default Debug
