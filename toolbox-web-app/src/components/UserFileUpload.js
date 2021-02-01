import React from 'react'
import { Form, Card, Button } from 'react-bootstrap'
import { useDropzone } from 'react-dropzone'

import { FontAwesomeIcon as FA } from '@fortawesome/react-fontawesome'
import {
  faBoxOpen,
  faBullseye,
  faFolderOpen
} from '@fortawesome/free-solid-svg-icons'

import AppContainer from './AppContainer'
import { NetworkContext } from '../contexts/NetworkContext'

const UserFileUpload = props => {

  let count = 0;
  const [isOverwrite, setOverwrite] = React.useState(false);
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
    if( count === 0 ){
      props.onFileComplete !== undefined && props.onFileComplete(url)
    }
    return response !== undefined ? response.json() : null; // parses JSON response into native JavaScript objects
  }

  async function readAndUploadFile(file){
    const reader = new FileReader()
    reader.onabort = () => console.log('file reading was aborted')
    reader.onerror = () => console.log('file reading has failed')
    reader.onload = () => {
      // Do whatever you want with the file contents
      uploadFile(`${network.host}/fs/home/user/${file.path}`, reader.result)
    }

    await reader.readAsArrayBuffer(file)
  }

  async function uploadFileList(list){
    count = list.length;
    props.onStart !== undefined && props.onStart(list)
    await list.forEach((file) => {
      readAndUploadFile(file)
    })
  }


  const onDrop = React.useCallback( acceptedFiles => {
    // Do something with the files
    uploadFileList(acceptedFiles);

    //ensure length does not exceed PATH_MAX
    //uploadFile(`${network.host}/fs/home/user/${acceptedFiles[0].path}`)


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
          <p>Drop file here</p>
          {
            isDragActive ?
              <p><FA icon={faBullseye} size="2x" /></p> : <p><FA icon={faBoxOpen} size="2x" /></p>
          }
          <p><Button variant="light"><FA icon={faFolderOpen} /> Select File</Button></p>
        </Card.Body>
      </Card>
    </AppContainer>
  )
}

export default UserFileUpload
