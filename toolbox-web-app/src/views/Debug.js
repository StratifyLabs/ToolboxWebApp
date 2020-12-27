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
  const [incoming, setIncoming] = React.useState({});

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

  function receiveInput(elements) {
    const name = elements[2];
    const values = elements[3].split(",");
    if (values.length < 2) {
      console.log("need x and y value");
      return;
    }

    const xValue = convertToFloat(values[0]);
    const yValue = convertToFloat(values[1]);
    const value = [xValue, yValue];

    let inputNext = Object.assign({}, input);
    if (inputNext[name] !== undefined && inputNext[name].outputs !== undefined) {
      //add the input to each output
      var outputNext = Object.assign({}, output);
      for(let index=0; index < inputNext[name].outputs.length; index++){
        const outputName = inputNext[name].outputs[index];
        if (outputNext[outputName] !== undefined && outputNext[outputName].inputs[name] !== undefined) {
          outputNext[outputName].inputs[name].push(value);
        }
      }
      console.log(`output: ${JSON.stringify(output)} -> ${JSON.stringify(outputNext)}`)
      setOutput(outputNext);
    }
  }

  function receiveOutput(elements) {
    const name = elements[2];
    const value = JSON.parse(elements[3]);

    let outputNext = Object.assign({}, output);
    let inputNext = Object.assign({}, input);

    outputNext[name] = value;
    //type: hist
    //inputs [t0,t1,t2]
    if (value.inputs !== undefined) {

      Object.keys(value.inputs).forEach((key, index) => {
        //create the input
        //add a data point to the output
        let inputObject = inputNext[key];
        if (inputObject === undefined || inputObject.outputs === undefined) {
          inputNext[key] = {
            outputs: [name]
          }
        } else if (inputObject.outputs.indexOf(name) === -1) {
          return inputObject.outputs.push[name];
        }
      });
    }
    console.log(`input: ${JSON.stringify(input)} -> ${JSON.stringify(inputNext)}`)
    setInput(inputNext);
    setOutput(outputNext);
  }

  React.useEffect(() => {
    console.log("create new event source");
    const source = new EventSource("http://localhost:3002/terminal");

    source.onmessage = function (event) {
      setIncoming(String(event.data));
    }

    source.onError = function (error) {
      source.close();
    }

    return () => {
      console.log("cleanup event source");
      source.close();
    }

  }, [])

  React.useEffect(() => {
    const lines = String(incoming).split("\n");
    lines.forEach((item, index) => {
      if (item.length > 0) {
        const elements = item.split("|");
        if (elements.length > 2 && elements[0] === "tb") {
          if (elements[1] === "o") {
            receiveOutput(elements);
          } else if (elements[1] === "i") {
            receiveInput(elements);
          }
        }
      }
    })
  }, [incoming])

  return (
    <div>
      <h2>Trace Output</h2>
      <small>demo.elf 20201223</small>
      {
        Object.keys(output).map((key,index) => {
          if( output[key].type === "plot" ){
            return <Plot data={output[key]} key={"plot" + key} />
          }
        })
      }

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
