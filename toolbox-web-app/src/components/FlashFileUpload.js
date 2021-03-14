import React from 'react'
import { Card, Button } from 'react-bootstrap'
import { useDropzone } from 'react-dropzone'

import { FontAwesomeIcon as FA } from '@fortawesome/react-fontawesome'
import {
  faBullseye,
  faFolderOpen,
  faSpinner,
  faBolt
} from '@fortawesome/free-solid-svg-icons'

import { NetworkContext } from '../contexts/NetworkContext'

const FlashFileUpload = props => {

  let count = 0;
  const [isUploadBusy, setUploadBusy] = React.useState(false);
  const network = React.useContext(NetworkContext);

  async function uploadFile(url, data) {
    let method = 'PUT';

    console.log(`attempt to upload to ${url} using ${method}`);
    const response = await fetch(url, {
      method: 'PUT', // *GET, POST, PUT, DELETE, etc.
      mode: 'cors', // no-cors, *cors, same-origin
      cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
      headers: {
        'Content-Type': 'application/blob'
      },
      referrerPolicy: 'no-referrer', // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
      body: data // body data type must match "Content-Type" header
    }).catch((e) => {
      console.log(`failed to upload ${e}`)
    });
    console.log("call file complete" + props.onProgramComplete);
    count = count - 1;
    const result = response !== undefined ? await response.json() : null;
    if (count === 0) {
      props.onProgramComplete !== undefined && props.onProgramComplete(JSON.stringify(result))
    }
    setUploadBusy(false);
    return result; // parses JSON response into native JavaScript objects
  }

  async function readAndUploadFile(file) {
    
    var suffix = file.name.substr(file.name.lastIndexOf('.') + 1);
    const type = suffix === 'elf' ? 'elf' : 'bin';

    console.log(file);
    console.log(`type is ${type}`);
    
    
    const reader = new FileReader()
    reader.onabort = () => console.log('file reading was aborted')
    reader.onerror = () => console.log('file reading has failed')
    reader.onload = () => {
      // Do whatever you want with the file contents
      uploadFile(`${network.host}/flash/program.json/${type}`, reader.result)
    }

    await reader.readAsArrayBuffer(file)
    
  }

  async function uploadFileList(list) {
    setUploadBusy(true);
    count = list.length;
    props.onStart !== undefined && props.onStart(list)
    await list.forEach((file) => {
      readAndUploadFile(file)
    })
  }


  const onDrop = React.useCallback(acceptedFiles => {
    // Do something with the files
    uploadFileList(acceptedFiles);

    //ensure length does not exceed PATH_MAX
    //uploadFile(`${network.host}/fs/home/user/${acceptedFiles[0].path}`)


  }, [])
  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop })

  return (
    <Card className="text-center mb-2" style={{ cursor: "pointer" }}>
      <Card.Body {...getRootProps()}>
        <input {...getInputProps()} />
        {isUploadBusy === false && <div><p>Drop file here to program target</p>
          {
            isDragActive ?
              <p><FA icon={faBullseye} size="2x" /></p> : <p><FA icon={faBolt} size="2x" /></p>
          }
          <p><Button variant="light"><FA icon={faFolderOpen} /> Select File</Button></p>
        </div>}
        {isUploadBusy === true && <div>
          <p><FA icon={faSpinner} spin size="2x" /></p>
          <p>Programming File...</p>
        </div>}
      </Card.Body>
    </Card>
  )
}

export default FlashFileUpload
