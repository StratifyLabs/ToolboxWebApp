import React from 'react'
import { Container  } from 'react-bootstrap'
import {
  faSlidersH,
  faExternalLinkAlt,
} from '@fortawesome/free-solid-svg-icons'

import Section from '../components/docs/Section'
import InternalJump from '../components/docs/InternalJump'
import ExternalJump from '../components/docs/ExternalJump'
import GetRequest from '../components/docs/GetRequest'

const Reference = props => {

  const ipAddress = "192.168.1.35"

  const overview = `# Overview
  

## HTTP API

The Stratify Toolbox runs an HTTP server that listens for requests that allow you to access the flash, trace, and debug
interfaces either using this web application or from the command line using a program like \`curl\`.

The HTTP API consists of 4 parts:

- Flash
- Debug
- Trace
- Filesystem
`

  const delegate = `## Delegates

  A delegate is a program specifically designed for a specific *interface* and MCU *family*.
It runs on the Toolbox and allows you to perform a *function* such as flash, debug, or trace an MCU *family* with a given *interface*.

The Toolbox hardware supports interfaces such as:

- SWD
- JTAG
- UART
- SPI
- I2C
- Anything that can be bitbanged

The Toolbox can be programmed to support any MCU *family* that can be either flashed, debugged, or traced
using an *interface* above. Each *function* has an independent delegate.

The built-in delegates are found at \`/bin/io[function]_[interface]_[family]\`. Delegates that
are added to \`/home/bin/io[function]_[interface]_[family]\` are also recognized.
`

  const delegateExample = `
For example, the Toolbox comes with several built-in delegates:
- \`ioflash_swd_stm32\`: Flash any STM32 chip over SWD
- \`iotrace_swo_tbox\`: Trace any MCU over SWO using the \`tbox\` trace library
- \`iodebug_swd_stm32\`: Debug any STM32 chip over SWD
- \`iotrace_uart_tbox\`: Trace any MCU over UART using the \`tbox\` trace library
`

 const sdk = `

## SDK

The Toolbox's SDK allows you to build, install, and share applications that run on the toolbox. This includes three
basic kinds of applications

- Delegates that implement an *interface* for an MCU *family*
- System applications can be customized and replaced (don't worry you can always revert)
- User applications that provide brand-new functionality on the Toolbox


`

  const flash = `## HTTP Flash API`
  const flashGet = `### Flash GET Requests
\`GET /flash/delegates\`

Returns a JSON object with a list of the available flash delegates.

The flash API allows you to get and set the current flash settings as well as flash the target.

\`GET /flash/settings\`

Returns the current flash settings as JSON.

To see your current flash settings:

\`\`\`
curl http://${ipAddress}/flash/settings
\`\`\`


\`PUT /flash/settings\`

Updates the current flash settings by sending a JSON file that matches the format of
the file returned using \`GET /flash/settings\`.

\`\`\`
curl -X POST -d @path/to/settings.json http://${ipAddress}/flash/settings
\`\`\`


\`POST /flash/program/[elf|bin]\`

Receives a firmware image (in \`elf\` or \`bin\` format) and programs it on the target and starts running and tracing
the output.

\`\`\`
# ELF source file
curl -X POST -d @path/to/firmware.elf http://${ipAddress}/flash/program/elf
# Bin source file (settings need to specify start address)
curl -X POST -d @path/to/firmware.bin http://${ipAddress}/flash/program/bin
\`\`\`

The image is stored on the SD card at \`/home/flash/image/latest.[elf|bin]\`. Rather
than overwrite the previous firmware, the Toolbox renames the previous firmware file
using a timestamp notation. Only the 100 most recent images are kept. You can use
the filesystem API to see which files are available as well as save copies of
older versions.

\`POST /flash/program/fs/<path>\`

Programs the target with a firmware binary stored on the Toolbox.

\`\`\`
curl -X POST -d @path/to/path.json http://${ipAddress}/flash/program/fs/home/user/firmware.elf
\`\`\`
`

  const trace = `## HTTP Trace API

The trace API allows you to get and set the current trace settings as well as reset the target and trace the output.

`
  const traceGet = `\`GET /trace/delegates\`

Returns a JSON object with a list of the available trace delegates.

\`GET /trace/settings\`
  
Returns the current trace settings as JSON.
    
\`\`\`
curl http://${ipAddress}/trace/settings
\`\`\` 

\`GET /trace\`

Starts streaming the trace data. If the HTTP request header specifies server-side
events, the response will for formatted as server-side events and encapsulated as
JSON. The stream will stay open until it is closed by the client.

\`GET /trace/reset\`

Same as \`GET /trace\` but will reset the device before tracing starts.
  
`
  const tracePost = `\`PUT /trace/settings\`
  
Updates the current trace settings by sending a JSON file that matches the format of
the file returned using \`GET /trace/settings\`.
  
\`\`\`
curl -X PUT -d @path/to/settings.json http://${ipAddress}/trace/settings
\`\`\`

Starts streaming the trace data just like the \`GET\` request but allows you
to reset the device before starting the trace.
`

  const debug = `## HTTP Debug API

The debug API allows you to get and set the current debug settings as well as halt/run/step/resume and so on.

`
  const debugGet = `### Debug GET Requests
  
\`GET /debug/delegates\`

Returns a JSON object with a list of the available debug delegates.

\`GET /debug/settings\`
    
Returns the current trace settings as JSON.
      
\`\`\`
curl http://${ipAddress}/debug/settings
\`\`\` 

The following HTTP GET requests perform various debugging functions. The response is a core dump in
JSON format.

- \`GET /debug/start\`
- \`GET /debug/halt\`
- \`GET /debug/step\`
- \`GET /debug/reset\`

These just do what you think they do, but respond with a simple \`{ "result" : "[success|failed]" }\` rather
than the full core dump.

- \`GET /debug/resume\`
- \`GET /debug/run\`


\`GET /debug/read/<address>/<size>\`

Reads memory using the debug port. The \`<address>\` and \`<size>\`
can be specified in hexidecimal or decimal. Use the \`0x\` prefix to
specify a hex address.

\`\`\`
curl http://${ipAddress}/debug/read/0x08000000/1024
\`\`\` 

    
`
  const debugPost = `### Debug POST Requests
  
\`POST /debug/settings\`
    
Updates the current debug settings by sending a JSON file that matches the format of
the file returned using \`GET /debug/settings\`.
    
\`\`\`
curl -X POST -d @path/to/settings.json http://${ipAddress}/debug/settings
\`\`\`


\`POST /debug/write/<address>/\`

Writes data to the memory address space on the target device. The size
is determined by the content length of the request. The data is interpreted
as raw binary data.

\`\`\`
curl -X POST -d @path/to/register/values.bin http://${ipAddress}/debug/write/0x00000000
\`\`\`
  
`

  const fs = `## Filesystem Overview

The filesystem API allows you to access the filesystems on the Toolbox. The filesystems follow a
convention which dictates how the device operates.

### Filesystem Conventions

The Toolbox's filesystem looks like this:

- root
  - app: internal RAM used for executing applications
  - assets: read-only system assets (icons, fonts, the web app)
  - bin: read-only system applications
  - dev: device access
  - home: SD Card
    - flash: for flashing the target
    - debug: for debugging the target
    - trace: trace reports
    - user: user files
    - settings: user-modifiable system settings
    - tmp: temporary files

Copies of system files are kept in the read-only \`/assets\` and \`/bin\` folders.  Files in \`/assets\` and \`/bin\` 
can be replaced by putting files of the same name in \`/home/assets\` and \`/home/bin\` respectively. 
For example, the start screen is executed at \`/bin/Home\`. By creating an executable application and 
placing it at \`/home/bin/Home\`, the Toolbox will load the user version rather than the system version. If you
get into trouble, you can always remove the SD card and delete the files to restore standard operation.

By convention the delegates are stored on the Toolbox's filesystem at \`/bin\` (read-only) or \`/home/bin\` (read-write). 
The delegate naming convention is:

\`\`\`
io[function]_[interface]_[family]
\`\`\`

So the default STM32 SWD flash delegate is found at:

\`\`\`
/bin/ioflash_swd_stm32
\`\`\`

If you want to replace this delegate with a user version, you can place it at:

\`\`\`
/home/bin/ioflash_swd_stm32
\`\`\`

### HTTP Filesystem API


\`GET /fs/<path>\`

Gets the file or directory contents. If \`path\` is a directory, the response will include a JSON
object with the contents of the directory. If \`path\` is a file, the response will be the contents
of the file.

\`\`\`
curl http://${ipAddress}/fs/home/flash/image
\`\`\` 


\`POST /fs/<path>\`

Sends a file to the device to be saved at \`path\`.

\`\`\`
curl -X POST --data-binary @path/to/some.file http://${ipAddress}/file/home/tmp/some.file
\`\`\`

\`DELETE /fs/<path>\`

Deletes the file at \`path\`. Only files on the SD card (\`/home\`) can be deleted. You
cannot create or delete directories using the HTTP API.

\`\`\`
curl -X DELETE http://${ipAddress}/file/home/tmp/some.file
\`\`\`
`

  return (
    <Container className="mb-3">
      <Section markdown={overview} ></Section>
      <Section markdown={delegate} />
      <Section markdown={delegateExample}>
        
      <InternalJump page="Settings" setPage={props.setPage} message="Configure delegate in Settings" icon={faSlidersH} />
      <ExternalJump link="http://github.com/StratifyLabs/tbox" message="tbox library on Github" icon={faExternalLinkAlt} />
        

      </Section>
      <Section markdown={flash} ></Section>
      <Section markdown={flashGet} ><GetRequest placeholder='/flash'/></Section>
      <Section markdown={trace} ></Section>
      <Section markdown={traceGet} ><GetRequest placeholder='/trace'/></Section>
      <Section markdown={tracePost} >Execute POST Request</Section>
      <Section markdown={debug} ></Section>
      <Section markdown={debugGet} ><GetRequest placeholder='/debug'/></Section>
      <Section markdown={debugPost} >Execute POST Request</Section>
      <Section markdown={fs} ></Section>
    </Container>
  )
}

export default Reference
