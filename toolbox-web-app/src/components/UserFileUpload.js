import React from 'react'
import { Form, Card, Button } from 'react-bootstrap'
import { useDropzone } from 'react-dropzone'

import { FontAwesomeIcon as FA } from '@fortawesome/react-fontawesome'
import {
  faBoxOpen,
  faBullseye,
  faFolderOpen,
  faSpinner
} from '@fortawesome/free-solid-svg-icons'

import AppContainer from './AppContainer'
import { NetworkContext } from '../contexts/NetworkContext'

const UserFileUpload = props => {

  let count = 0;
  const [isOverwrite, setOverwrite] = React.useState(false);
  const [isUploadBusy, setUploadBusy] = React.useState(false);
  const network = React.useContext(NetworkContext);

  async function uploadFile(url, data) {
    let method = isOverwrite ? 'PUT' : 'POST';

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
    console.log("call file complete" + props.onFileComplete);
    count = count - 1;
    if (count === 0) {
      props.onFileComplete !== undefined && props.onFileComplete(url)
    }
    setUploadBusy(false);
    return response !== undefined ? response.json() : null; // parses JSON response into native JavaScript objects
  }

  async function readAndUploadFile(file) {
    const reader = new FileReader()
    reader.onabort = () => console.log('file reading was aborted')
    reader.onerror = () => console.log('file reading has failed')
    reader.onload = () => {
      // Do whatever you want with the file contents
      uploadFile(`${network.host}/fs.json/home/user/${file.path}`, reader.result)
    }

    await reader.readAsArrayBuffer(file)
  }


  const onDrop = React.useCallback(acceptedFiles => {
    async function uploadFileList(list) {
      setUploadBusy(true);
      count = list.length;
      props.onStart !== undefined && props.onStart(list)
      await list.forEach((file) => {
        readAndUploadFile(file)
      })
    }

    uploadFileList(acceptedFiles);


  }, [])
  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop })


  function toggleOverwrite() {
    setOverwrite(!isOverwrite);
    console.log(`is overwrite ${!isOverwrite}`)
  }

  return (
    <AppContainer>
      <Form>
        <Form.Group controlId="formBasicCheckbox">
          <Form.Check type="checkbox" label="Overwrite Existing Files" defaultChecked={isOverwrite} onChange={toggleOverwrite} />
        </Form.Group>
      </Form>
      <Card className="text-center" style={{ cursor: "pointer" }}>
        <Card.Body {...getRootProps()}>
          <input {...getInputProps()} />
          {isUploadBusy === false && <div><p>Drop file here</p>
            {
              isDragActive ?
                <p><FA icon={faBullseye} size="2x" /></p> : <p><FA icon={faBoxOpen} size="2x" /></p>
            }
            <p><Button variant="light"><FA icon={faFolderOpen} /> Select File</Button></p>
          </div>}
          {isUploadBusy === true && <div>
            <p><FA icon={faSpinner} spin size="2x" /></p>
            <p>Uploading Files...</p>
          </div>}
        </Card.Body>
      </Card>
    </AppContainer>
  )
}

export default UserFileUpload
