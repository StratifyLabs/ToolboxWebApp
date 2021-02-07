import React from 'react'

import Delegate from './Delegate'
import Bitrate from './Bitrate'

const TraceSettings = props => {

  const [settings, setSettings] = React.useState(props.settings);

  React.useEffect(() => {

    return () => {
      if (settings !== undefined) {
        props.putSettings(settings);
      }
    }
  }, []);

  function handleBitrateChanged(value) {
    let next_settings = props.settings;
    next_settings.bitrate = value;
    console.log('update bitrate');
    setSettings(settings);
  }

  function handleDelegateChanged(value){
    let next_settings = settings;
    next_settings.delegate = value;
    setSettings(next_settings);
  }

  return (
    <div>
      <h3>Trace Settings</h3>
      <Delegate delegate={settings.delegate} options={props.delegateOptions} setDelegate={handleDelegateChanged} />

      <Bitrate
        value={settings.bitrate}
        placeholder="1000000"
        onChange={(value) => handleBitrateChanged(value)} />
    </div>
  )
}

export default TraceSettings
