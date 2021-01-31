import React from 'react'
import { Form } from 'react-bootstrap'

import { NetworkContext } from '../../contexts/NetworkContext'

import FlashSettings from './FlashSettings'
import DebugSettings from './DebugSettings'
import TraceSettings from './TraceSettings'
import LoadingSpinner from '../LoadingSpinner'

const SettingsObject = props => {

  const network = React.useContext(NetworkContext);
  const [settings, setSettings] = React.useState();
  const [delegateOptions, setDelegateOptions] = React.useState();
  const [count, setCount] = React.useState();

  //request current settings from the device -- update the settings on the device
  //as they are changed here

  const isReady = (settings !== undefined && delegateOptions !== undefined)

  React.useEffect(() => {

    console.log("Try to fetch " + props.type);
    fetch(`${network.host}/${props.type}/settings`)
      .then(response => response.json())
      .then(result => {
        console.log(`fetched settings ${JSON.stringify(result)}`)
        setSettings(result)
        fetch(`${network.host}/${props.type}/delegates`)
        .then(response => response.json())
        .catch(err => {
          console.log(err);
          setCount(count+1)
        })
        .then(result => {
          console.log(`fetched delegates ${JSON.stringify(result)}`)
          setDelegateOptions(result)
        })
      })


    return () => {
      console.log("Need to put settings for " + props.type);
    }

  }, [count, network.host, props.type])


  return (
    <Form>
      { isReady === false && <LoadingSpinner /> }
      { isReady && props.type === "flash" && <FlashSettings settings={settings} updateSettings={setSettings} delegateOptions={delegateOptions} /> }
      { isReady && props.type === "debug" && <DebugSettings settings={settings} updateSettings={setSettings} delegateOptions={delegateOptions} /> }
      { isReady && props.type === "trace" && <TraceSettings settings={settings} updateSettings={setSettings} delegateOptions={delegateOptions} />}
      
    </Form>
  )
}

export default SettingsObject
