import React from 'react'
import ReactMarkdown from 'react-markdown'
import { Container, Col, Row, Button } from 'react-bootstrap'
import Section from '../components/docs/Section'


const Docs = props => {


  const overview = `# Overview
  
The Stratify Toolbox runs an HTTP server that listens for requests that allow you to access the flash, trace, and debug
interfaces either using this web application or from the command line using a program like \`curl\`.

The HTTP API consists of 4 parts:

- Flash
- Debug
- Trace
- Filesystem
  
  
`

  const flash = `## Flash

The flash API allows you to get and set the current flash settings as well as flash the target.

\`HTTP1.1 GET /flash/settings\`

Returns the current flash settings as JSON.

To see your current flash settings:

\`\`\`
curl http://<local ip address>/flash/settings
\`\`\`


\`HTTP1.1 POST /flash/settings\`

Updates the current flash settings by sending a JSON file that matches the format of
the file returned using \`HTTP1.1 GET /flash/settings\`.

\`\`\`
curl -X POST -d @path/to/settings.json http://<local ip address>/flash/settings
\`\`\`


\`HTTP1.1 POST /flash/program/[elf|bin]\`

Receives a firmware image (in \`elf\` or \`bin\` format) and programs it on the target and starts running and tracing
the output.

\`\`\`
# ELF source file
curl -X POST -d @path/to/firmware.elf http://<local ip address>/flash/program/elf
# Bin source file (settings need to specify start address)
curl -X POST -d @path/to/firmware.bin http://<local ip address>/flash/program/bin
\`\`\`

The image is stored on the SD card at \`/home/flash/image/latest.[elf|bin]\`. Rather
than overwrite the previous firmware, the Toolbox renames the previous firmware file
using a timestamp notation. Only the 100 most recent images are kept. You can use
the filesystem API to see which files are available as well as save copies of
older versions.

\`HTTP1.1 POST /flash/program\`

Programs the target with a firmware binary stored on the Toolbox. The 
path specified in the JSON post data. For example,

\`\`\`
{
  "path": "/home/flash/image/image-20210128-121212.elf"
}
\`\`\`

\`\`\`
curl -X POST -d @path/to/path.json http://<local ip address>/flash/program
\`\`\`

  
`

  const trace = `## Trace

The trace API allows you to get and set the current trace settings as well as reset the target and trace the output.

\`HTTP1.1 GET /trace/settings\`
  
Returns the current trace settings as JSON.
    
\`\`\`
curl http://<local ip address>/trace/settings
\`\`\` 
  
\`HTTP1.1 POST /trace/settings\`
  
Updates the current trace settings by sending a JSON file that matches the format of
the file returned using \`HTTP1.1 GET /trace/settings\`.
  
\`\`\`
curl -X POST -d @path/to/settings.json http://<local ip address>/trace/settings
\`\`\`

\`HTTP1.1 GET /trace\`

Starts streaming the trace data. If the HTTP request header specifies server-side
events, the response will for formatted as server-side events and encapsulated as
JSON. The stream will stay open until it is closed by the client.

\`HTTP1.1 POST /trace\`

Starts streaming the trace data just like the \`GET\` request but allows you
to reset the device before starting the trace.



`

  const debug = `## Debug

The debug API allows you to get and set the current debug settings as well as halt/run/step/resume and so on.

\`HTTP1.1 GET /debug/settings\`
    
Returns the current trace settings as JSON.
      
\`\`\`
curl http://<local ip address>/debug/settings
\`\`\` 
    
\`HTTP1.1 POST /debug/settings\`
    
Updates the current debug settings by sending a JSON file that matches the format of
the file returned using \`HTTP1.1 GET /debug/settings\`.
    
\`\`\`
curl -X POST -d @path/to/settings.json http://<local ip address>/debug/settings
\`\`\`

### Core Dumps

The following HTTP GET requests perform various debugging functions. The response is a core dump.

\`HTTP1.1 GET /debug/start\`
\`HTTP1.1 GET /debug/halt\`
\`HTTP1.1 GET /debug/step\`
\`HTTP1.1 GET /debug/reset\`


These just do what you think they do, but respond with a simple \`{ "result" : "success" }\` rather
than the full core dump.

\`HTTP1.1 GET /debug/resume\`
\`HTTP1.1 GET /debug/run\`


## Memory Access

You can also read/write the address space of the target.

\`HTTP1.1 POST /debug\`

TO DO
  
`

  const fs = `## Filesystem

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

### Filesystem API


\`HTTP1.1 GET /fs/<path>\`

Gets the file or directory contents. If \`path\` is a directory, the response will include a JSON
object with the contents of the directory. If \`path\` is a file, the response will be the contents
of the file.

\`\`\`
curl http://<local ip address>/fs/home/flash/image
\`\`\` 


\`HTTP1.1 POST /file/<path>\`

Sends a file to the device to be saved at \`path\`.

\`\`\`
curl -X POST --data-binary @path/to/some.file http://<local ip address>/file/home/tmp/some.file
\`\`\`

\`HTTP1.1 DELETE /file/<path>\`

Deletes the file at \`path\`. Only files on the SD card (\`/home\`) can be deleted.

\`\`\`
curl -X DELETE http://<local ip address>/file/home/tmp/some.file
\`\`\`

  
`

  return (
    <Container>
      <Section markdown={overview} >More Info</Section>
      <Section markdown={flash} >More Info</Section>
      <Section markdown={trace} >More Info</Section>
      <Section markdown={debug} >More Info</Section>
      <Section markdown={fs} >More Info</Section>
    </Container>
  )
}

export default Docs
