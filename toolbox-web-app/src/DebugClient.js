import React from 'react'
import { Toast } from 'react-bootstrap'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faInfo } from '@fortawesome/free-solid-svg-icons'

const DebugClient = props => {

  const [newMessage, setNewMessage] = React.useState("");

  /*
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
  */

  /*
  React.useEffect(() => {
    console.log("create new event source");
 

    const source = new EventSource(`${props.server}/terminal`);

 
    source.onopen = function (event) {
      setNewMessage(`connected to ${props.server}`);
      setServerStatus("success");
    }

    source.addEventListener('error', function (e) {
      setNewMessage(`failed to connect to ${props.server}`);
      setServerStatus("danger");
    }, false);

    source.onmessage = function (event) {
      setIncoming(String(event.data));
    }
    


    return () => {
      setServerStatus("danger");
      setNewMessage(`closed connection to ${props.server}`);
      console.log("cleanup event source");
      source.close();
    }

  }, [])
  */

  /*
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
  */

  return (
    <div>
      <Toast
        style={{
          position: 'absolute',
          top: 75,
          right: 10,
        }}
        autohide={true}
        animation={true}
        show={newMessage !== ""}
        onClose={() => { setNewMessage("") }}
      >
        <Toast.Body><FontAwesomeIcon icon={faInfo} /> {newMessage}</Toast.Body>
      </Toast>
    </div>
  )
}

export default DebugClient
