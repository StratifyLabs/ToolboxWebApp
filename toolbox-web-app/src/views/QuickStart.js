import React from 'react'
import ReactMarkdown from 'react-markdown'


const QuickStart = props => {


  const intro = `## Getting Started

Congratulations! If you are reading this, you have successfully connected your Stratify Toolbox to the Wifi and loaded the web app.
Now you can:

- Flash
- Trace
- Debug

`
const flash = `## Flashing Devices

To flash a device, you need to first choose your flash delegate in the settings.

Once you sort out the settings, you can flash the target with posting the \`elf\` file to the Toolbox.

\`\`\`
curl -X POST --data-binary @path/to/firmware.elf http://192.168.1.35/flash/elf
\`\`\`

Each time you flash the device, the Toolbox will automatically keep a copy of the elf file on the SD
card in case you ever want to revert back to that image.
`

const trace = `## Tracing


`

const debug = `## Debugging



`

  return (
    <div>
    <ReactMarkdown>{intro}</ReactMarkdown>
    <ReactMarkdown>{flash}</ReactMarkdown>
    <ReactMarkdown>{trace}</ReactMarkdown>
    <ReactMarkdown>{debug}</ReactMarkdown>
    </div>
  )
}

export default QuickStart
