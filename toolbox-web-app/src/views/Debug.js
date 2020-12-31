import React from 'react'
import { Badge } from 'react-bootstrap'

import Terminal from '../components/debug/Terminal'
import Plot from '../components/debug/Plot'
import Logic from '../components/debug/Logic'
import Histogram from '../components/debug/Histogram'
import ProgramCounterSamplePlot from '../components/debug/ProgramCounterSamplePlot'
import Log from '../components/debug/Log'
import Table from '../components/debug/Table'


const Debug = props => {

  const [dataList, setDataList] = React.useState({});
  const [configuration, setConfiguration] = React.useState({});
  const [incoming, setIncoming] = React.useState("");

  const [serverStatus, setServerStatus] = React.useState("danger")

  function processData(dataName, value, configurationNext) {
    const dataItem = dataList[dataName];
    if (dataItem !== undefined && dataItem.configurations !== undefined) {
      //add the input to each output
      dataItem.configurations.forEach((configurationName, index) => {
        if (configurationNext[configurationName] !== undefined && configurationNext[configurationName].data[dataName] !== undefined) {
          configurationNext[configurationName].data[dataName].push(value);
        }
      })
    }
  }

  function processConfig(configurationName, item, configurationNext, dataListNext) {
    //make sure item is valid
    if (item.data !== undefined && item.type !== undefined) {
      //item type must be plot, hist, log, raw, etc
      if (configurationNext[configurationName] === undefined) {
        configurationNext[configurationName] = item;
      }

      //now associate the data with the configuration in the data list
      const dataKeys = Object.keys(item.data);
      dataKeys.forEach((dataName, index) => {
        if (dataListNext[dataName] === undefined) {
          dataListNext[dataName] = {
            configurations: [configurationName]
          }
        } else {
          let configurationList = dataListNext[dataName].configurations;
          if (configurationList.indexOf(configurationName) < 0) {
            configurationList.push(configurationName);
          }
        }
      });
    }
  }

  React.useEffect(() => {
    console.log("create new event source");
    const source = new EventSource(`${props.server}/terminal`);

    source.onopen = function(event){
      setServerStatus("success");
    }

    source.onmessage = function (event) {
      setIncoming(String(event.data));
    }

    source.onError = function (error) {
      setServerStatus("danger");
      source.close();
    }

    return () => {
      setServerStatus("danger");
      console.log("cleanup event source");
      source.close();
    }

  }, [])

  React.useEffect(() => {
    const lines = String(incoming).split("\n");

    let configurationNext = Object.assign({}, configuration);
    let dataListNext = Object.assign({}, dataList);

    function processItem(item) {
      const keys = Object.keys(item);

      keys.forEach((key) => {
        if (item[key].type !== undefined) {
          processConfig(key, item[key], configurationNext, dataListNext);
        } else {
          processData(key, item[key], configurationNext);
        }
      });

    }

    lines.forEach((item, index) => {
      if (item.length > 0) {
        try {
          const value = JSON.parse(item);
          if (Array.isArray(value)) {
            value.forEach((item, index) => {
              processItem(item);
            })
          } else {
            processItem(value);
          }
        } catch (e) {
          console.log(e);
        }

      }
    })

    setDataList(dataListNext);
    setConfiguration(configurationNext);

  }, [incoming])

  return (
    <div>
      <h2>Debug Output</h2>
      <Badge pill variant={serverStatus} className="mr-2">Server: {props.server === "" ? "NA" : props.server}</Badge>
      <hr />
      <small>demo.elf 20201223</small>
      {
        Object.keys(configuration).map((key, index) => {
          if (configuration[key].type === "plot") {
            return <Plot name={key} configuration={configuration[key]} key={"plot" + key} />
          }
          if (configuration[key].type === "terminal") {
            return <Terminal name={key} configuration={configuration[key]} key={"raw" + key} />
          }
          if (configuration[key].type === "logic") {
            return <Logic name={key} configuration={configuration[key]} key={"logic" + key} />
          }
        })
      }

      <Log type="message" />
      <Table />
    </div >
  )
}

export default Debug
